import { useState, useRef, useCallback, useEffect } from "react";
import { useCodeStore } from "../utils/zustand";

let PARA = "";

export default function usePlay() {
  const { code } = useCodeStore();
  PARA = code
  
  const [stats, setStats] = useState({
    correct: 0,
    error: 0,
    wpm: 0,
    value: "",
    index: [{value: 0, typed: false}]
  });
  
  const prevIndex = useRef(0);
  const startTime = useRef(null);
  const lastTypedLength = useRef(0);
  
  
  useEffect(() => {
    if (!startTime.current) return;
    
    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime.current) / 1000;
      if (elapsedSeconds < 1) return;
        
      lastTypedLength.current = stats.value.length
      const wpm = (lastTypedLength.current * 60) / (5 * elapsedSeconds);
      setStats(prev => ({ ...prev, wpm: Math.round(wpm) }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [stats.value]);
  
  const handleInputChange = useCallback((e) => {
    const typedValue = e.target.value;
    const typedIndex = typedValue.length;
    
    setStats((prev) => {
      if (!startTime.current) {
        startTime.current = Date.now();
        lastTypedLength.current = 0;
      }
  
      let newIndexArray = [...prev.index];
      let newCorrect = prev.correct;
      let newError = prev.error;

      
      // Handle backspace
      if (typedIndex < prevIndex.current) {
        prevIndex.current = typedIndex;
        return {
          ...prev,
          value: typedValue,
          index: newIndexArray.slice(0, typedIndex + 1)
        };
      }
      
      const lastChar = typedValue[typedIndex - 1];
      const expectedChar = PARA[typedIndex - 1];
      const isTyped = newIndexArray[typedIndex - 1]?.typed || false
      
      // Handle tab key
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const newValue = typedValue.slice(0, start) + '    ' + typedValue.slice(start);
        return {
          ...prev,
          value: newValue,
          index: newIndexArray
        };
      }
    
      if (lastChar === expectedChar) {
        !isTyped ? newCorrect++ : newCorrect;
        newIndexArray[typedIndex - 1] = { typed: true };
      } else {
        newError++;
        newIndexArray[typedIndex - 1] = { typed: false };
      }
      
      prevIndex.current = typedIndex;
      return {
        correct: newCorrect,
        error: newError,
        wpm: prev.wpm,
        value: typedValue,
        index: newIndexArray
      };
    });
  }, []);
  
  return {
    stats,
    handleInputChange,
    PARA,
  };
}