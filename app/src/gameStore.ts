import { writable } from "svelte/store";
import { navigate } from "svelte-routing";

export const started = writable(false);
export const roomId = writable("");

let socket: WebSocket;
let interval: number;

export function startGame({ roomId = null, isProtected = false }) {
  socket = new WebSocket(globalThis.wsUrl);
  socket.onopen = function () {
    interval = setInterval(() => {
      socket.send(JSON.stringify(["keepAlive"]));
    }, 10000);
    socket.send(
      JSON.stringify([
        "matchmaking",
        { userName: "EL MATADOR", isProtected, roomId },
      ])
    );
    socket.onmessage = function ({ data }) {
      console.log(data);
      const [event, payload] = JSON.parse(data);
      eventHandlers[event](payload);
    };
    socket.onclose = function () {
      clearInterval(interval);
    };
  };
}

export function closeSocket() {
  clearInterval(interval);
  socket.close();
}

const eventHandlers = {
  roomJoined: function roomJoined($roomId) {
    navigate(`/room/${$roomId}`, { state: { fromHome: true } });
    roomId.set($roomId);
  },
  gameStarted: function gameStarted(payload) {
    started.set(true);
  },
  gameEnded: () => {
    socket.close();
  },
  doesNotExist: () => {
    socket.close();
    navigate("/notFound");
  },
};
