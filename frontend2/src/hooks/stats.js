import { useState, useRef, useCallback } from "react";
import { useCodeStore } from "../utils/zustand";

let PARA =
  "The golden hues of the setting sun painted the sky in a breathtaking masterpiece, casting long shadows across the quiet meadow. A gentle breeze whispered through the tall grass, carrying with it the faint scent of wildflowers. Somewhere in the distance, the soft chirping of crickets began to fill the air, signaling the arrival of twilight. In that serene moment, time seemed to pause, and the world felt beautifully still.";


// const [stats, setStats] = useState({
//   correct: 0,
//   error: 0,
//   value: "",
//   index: [{value: 0, typed: false}]
// });
// const prevIndex = useRef(0);

// const handleInputChange = useCallback((e) => {
//   const typedValue = e.target.value;
//   const typedIndex = typedValue.length;
  
//   setStats((prev) => {

//     let newIndexArray = [...prev.index];
//     let newCorrect = prev.correct;
//     let newError = prev.error;
    

//     if (typedIndex < prevIndex.current) {
//       prevIndex.current = typedIndex;
//       return {
//         ...prev,
//         value: typedValue,
//         index: newIndexArray.slice(0, typedIndex + 1)
//       };
//     }
    
    

    
//     const lastChar = typedValue[typedIndex - 1];
//     const expectedChar = PARA[typedIndex - 1];
//     const isTyped = newIndexArray[typedIndex - 1]?.typed || false
    

//     if (lastChar === expectedChar) {
//       !isTyped ? newCorrect++ : newCorrect;
//       newIndexArray[typedIndex - 1] = { typed: true };
//     } else {
//       newError++;
//       newIndexArray[typedIndex - 1] = { typed: false };
//     }
    
//     prevIndex.current = typedIndex;
//     return {
//       correct: newCorrect,
//       error: newError,
//       value: typedValue,
//       index: newIndexArray
//     };
//   });
// }, []);



export default function usePlay() {
  const { code } = useCodeStore();
  PARA = code
  
  const [stats, setStats] = useState({
    correct: 0,
    error: 0,
    value: "",
    index: [{value: 0, typed: false}]
  });
  
  
  
  const prevIndex = useRef(0);
  const handleInputChange = useCallback((e) => {
    const typedValue = e.target.value;
    const typedIndex = typedValue.length;
    
    setStats((prev) => {
  
      let newIndexArray = [...prev.index];
      let newCorrect = prev.correct;
      let newError = prev.error;
      
  
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