
import usePlay from "../hooks/stats";
import { pusher } from "../utils/pusher";
import { useStore } from "../utils/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Play({roomId}) {


  const { stats, handleInputChange, PARA } = usePlay();
  console.log(roomId)
  const channel = pusher.subscribe(roomId)



  channel.bind("timer-expired", () => {
    window.location.reload()
  })

  const getStyledText = () => {
    return PARA.split("").map((char, index) => {

      const currentIndex = stats.value.length;


      if (index >= currentIndex) {
        return <span key={index} className="text-gray-500">{char}</span>;
      }


      const typedChar = stats.value[index];
      const isCorrect = typedChar === char;

      return (
        <span key={index} className={isCorrect ? "text-yellow-500" : "text-red-500"}>
          {char}
        </span>
      );
    });
  };

  const { timer } = useStore();



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-500">{timer}</h1>
          <h1 className="text-2xl font-bold text-yellow-500">ChimpType</h1>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Correct</p>
              <p className="text-xl font-bold text-yellow-500">{stats.correct}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Error</p>
              <p className="text-xl font-bold text-red-500">{stats.error}</p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="font-mono text-lg">
            {getStyledText()}
          </div>
          <textarea
            value={stats.value}
            onChange={handleInputChange}
            className="absolute top-0 left-0 w-full h-full p-8 bg-transparent text-transparent caret-yellow-500 resize-none focus:outline-none font-mono text-lg z-10"
            autoFocus
          />
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Click inside the box and start typing
        </div>
      </div>
    </div>
  );
}
