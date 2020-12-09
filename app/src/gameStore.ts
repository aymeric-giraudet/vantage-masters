import { writable } from "svelte/store";
import { navigate } from "svelte-routing";

export const started = writable(false);
export const roomId = writable("");

let socket: WebSocket;

export function startGame({ roomId = null, isProtected = false }) {
  socket = new WebSocket("ws://localhost:9001");
  socket.onopen = function () {
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
  };
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
