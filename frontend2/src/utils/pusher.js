import Pusher from "pusher-js";
export const pusher = new Pusher("ab038fe7b3ab08bcd581", {
  cluster: "ap2",
});
pusher.logToConsole = true;