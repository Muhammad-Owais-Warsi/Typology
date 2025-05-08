import { useState, useRef, useEffect } from "react";
import { pusher } from "../utils/pusher";
import { api } from "../utils/axios";
import Play from "./play";
import { useCodeStore, useStore } from "../utils/zustand";
import { getUniqueId } from "../utils/uniqueId";


export default function FindMatch() {
  const [playerId, setPlayerId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [countdown, setCountdown] = useState(5);

  const { setTimer } = useStore();
  const { setCode } = useCodeStore();

  const channelRef = useRef(null);

  async function findMatch() {
    const newPlayerId = 'player-' + getUniqueId();
    setPlayerId(newPlayerId);

    try {
      const response = await api.post("/find-match", {
        playerId: newPlayerId,
      });

      if (response.data.matched) {
        const newRoomId = response.data.roomId;
        const newOpponentId = response.data.opponentId;

        setRoomId(newRoomId);
        setOpponentId(newOpponentId);

        subscribeToRoom(newRoomId, newPlayerId, newOpponentId);
      } else {
        waitForMatch(newPlayerId);
      }
    } catch (error) {
      console.error("Matchmaking failed", error);
    }
  }

  function waitForMatch(tempPlayerId) {
    const tempRoom = `player-${tempPlayerId}`;
    const tempChannel = pusher.subscribe(tempRoom);

    tempChannel.bind("match-start", (data) => {
      const newRoomId = data.roomId;
      const newOpponentId = data.players.find((id) => id !== tempPlayerId);

      setRoomId(newRoomId);
      setOpponentId(newOpponentId);

      setCode(data.randomBlock.code)

      pusher.unsubscribe(tempRoom);
      subscribeToRoom(newRoomId, tempPlayerId, newOpponentId);
    });
  }


  function subscribeToRoom(room, player, opponent) {
    console.log(room)
    const channel = pusher.subscribe(room);
    channelRef.current = channel;


    channel.bind("match-start", (data) => {
      console.log("Match started in room", data.room);
      console.log("You:", player, "Opponent:", opponent);

      console.log(data);
    });



    channel.bind("timer-update", (data) => {
      console.log(`Sending timer update to ${room}: ${data.timeLeft}s`);
      setTimer(data.timeLeft)
    })


    channel.bind("code-block", (data) => {
      console.log(data.randomBlock.code)
      setCode(data?.randomBlock.code)

    })


    console.log("Subscribing to room:", room);

  }

  useEffect(() => {
    if (playerId && opponentId && roomId) {
      setShowCountdown(true);


      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setShowCountdown(false);
            setGameStarted(true); 
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playerId, opponentId, roomId]);


  if (gameStarted) {
    return <Play playerId={playerId} opponentId={opponentId} roomId={roomId} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-[#f5f5f5] font-mono gap-6 px-4">
      <h1 className="text-3xl">Welcome to <span className="bg-yellow-300 text-black  whitespace-nowrap pr-1">ChimpType</span>.</h1>

      <button
        disabled={playerId}
        onClick={findMatch}
        className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
      >
        Find Match
      </button>

      {playerId && !opponentId && (
        <div className="text-yellow-300 text-xl animate-pulse">
          <h1>WAITING...</h1>
          <p className="text-sm mt-2">Your ID: {playerId}</p>
        </div>
      )}

      {showCountdown && (
        <div className="text-green-400 text-2xl font-bold animate-pulse text-center">
          Your game will start in {countdown} seconds...
        </div>
      )}




      {roomId && (
        <div className="bg-[#1a1a1a] border border-yellow-500 rounded-lg p-4 mt-4 shadow-lg w-full max-w-sm text-sm space-y-2">
          <p><span className="text-yellow-400">Room ID:</span> {roomId}</p>
          <p><span className="text-yellow-400">Your ID:</span> {playerId}</p>
          <p><span className="text-yellow-400">Opponent ID:</span> {opponentId}</p>
        </div>
      )}
    </div>
  );
}
