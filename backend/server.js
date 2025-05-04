const express = require("express");
const Pusher = require("pusher");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

let waitingPlayer = null;

const startTimer = (roomId, duration = 60) => {
  let timeLeft = duration;

  const interval = setInterval(() => {
    timeLeft--;

    pusher.trigger(`room-${roomId}`, "timer-update", {
      timeLeft,
    });

    if (timeLeft <= 0) {
      clearInterval(interval);
      pusher.trigger(`room-${roomId}`, "timer-expired", {});
    }
  }, 1000);
};

app.post("/find-match", (req, res) => {
  const { playerId } = req.body;

  if (waitingPlayer && waitingPlayer.id !== playerId) {
    const roomId = `room-${Date.now()}`;
    const players = [waitingPlayer.id, playerId];

    pusher.trigger(`${roomId}`, "match-start", {
      roomId,
      players,
    });

    pusher.trigger(`player-${waitingPlayer.id}`, "match-start", {
      roomId,
      players,
    });

    startTimer(roomId, 60);
    const opponentId = waitingPlayer.id;
    waitingPlayer = null;

    res.json({ matched: true, roomId, opponentId });
  } else {
    waitingPlayer = { id: playerId };
    res.json({ matched: false });
  }
});

app.post("/update-score", (req, res) => {
  const { roomId, playerId, score } = req.body;
  pusher.trigger(`room-${roomId}`, "score-update", { playerId, score });
  res.send({ success: true });
});

app.listen(4000, () => console.log("Server running on port 4000"));
