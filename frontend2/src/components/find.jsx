import { useState, useRef } from "react";
import { pusher } from "../utils/pusher";
import { api } from "../utils/axios";

export default function FindMatch() {
  const [playerId, setPlayerId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [opponentId, setOpponentId] = useState(null);

  const channelRef = useRef(null);

  async function findMatch() {
    const newPlayerId = 'player-' + Math.floor(Math.random() * 10000);
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

      pusher.unsubscribe(tempRoom);
      subscribeToRoom(newRoomId, tempPlayerId, newOpponentId);
    });
  }

  function subscribeToRoom(room, player, opponent) {
    const channel = pusher.subscribe(room);
    channelRef.current = channel;

    channel.bind("match-start", () => {
      console.log("Match started in room", room);
      console.log("You:", player, "Opponent:", opponent);
    });

    // Add more bindings here (score updates, typing events, etc.)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-[#f5f5f5] font-mono gap-6 px-4">
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
