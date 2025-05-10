import { useNavigate } from "react-router-dom";
import usePlay from "../hooks/stats";
import { pusher } from "../utils/pusher";
import { useStore } from "../utils/zustand";

export default function Play({roomId}) {
  const { stats, handleInputChange, PARA } = usePlay();
  const channel = pusher.subscribe(roomId);
  const navigate = useNavigate();
  const { timer } = useStore();

  channel.bind("timer-expired", () => {
    navigate(`/result?correct=${stats.correct}&error=${stats.error}`);
  });

  const getStyledText = () => {
    return PARA.split("").map((char, index) => {
      const currentIndex = stats.value.length;

      if (index >= currentIndex) {
        return (
          <span 
            key={index} 
            className="text-[#666666] whitespace-pre-wrap transition-colors duration-150"
          >
            {char}
          </span>
        );
      }

      const typedChar = stats.value[index];
      const isCorrect = typedChar === char;

      return (
        <span key={index} className={`${isCorrect ? "text-yellow-400" : "text-red-400"} whitespace-pre-wrap`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0f0f0f] text-[#f5f5f5] font-mono">
      <div className="h-full flex">
        {/* Left side - Stats and Timer */}
        <div className="w-1/3 bg-[#1a1a1a] p-8 flex flex-col justify-between border-r border-yellow-400/20">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">ChimpType</h1>
              <p className="text-[#bbbbbb]">Test your typing speed</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#2a2a2a] p-6 rounded-xl border border-yellow-400/20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">Timer</h2>
                <div className="text-4xl font-bold text-center">{timer}</div>
              </div>

              <div className="bg-[#2a2a2a] p-6 rounded-xl border border-yellow-400/20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#bbbbbb]">WPM</span>
                    <span className="text-yellow-400 text-xl font-bold">{stats.wpm}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#bbbbbb]">Correct</span>
                    <span className="text-green-400 text-xl font-bold">{stats.correct}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#bbbbbb]">Errors</span>
                    <span className="text-red-400 text-xl font-bold">{stats.error}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[#bbbbbb] text-sm">
            Click inside the box and start typing
          </div>
        </div>

        {/* Right side - Typing Area */}
        <div className="w-2/3 p-8 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative bg-[#1a1a1a] rounded-2xl p-8 shadow-xl border border-yellow-400/20">
              <div className="font-mono text-xl leading-[1.8] whitespace-pre-wrap">
                {getStyledText()}
              </div>
              <textarea
                value={stats.value}
                onChange={handleInputChange}
                onKeyDown={handleInputChange}
                className="absolute top-0 left-0 w-full h-full p-8 bg-transparent text-transparent caret-yellow-400 resize-none focus:outline-none font-mono text-xl z-10 whitespace-pre-wrap leading-[1.8]"
                autoFocus
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
