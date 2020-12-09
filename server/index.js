const uws = require("uWebSockets.js");
var cuid = require("cuid");

class Room {
  player1;
  player2;

  constructor(playerId) {
    this.player1 = playerId;
  }

  get isFull() {
    return Boolean(this.player1 && this.player2);
  }
}

class Rooms {
  static currentId;
  static rooms = new Map();

  static createProtectedRoom(player) {
    const roomId = cuid();
    this.rooms.set(roomId, new Room(player));
    return roomId;
  }

  static joinProtectedRoom(player, roomId) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return false;
    }
    room.player2 = player;
    return true;
  }

  static matchmaking(player) {
    if (
      !this.currentId ||
      !this.rooms.has(this.currentId) ||
      this.rooms.get(this.currentId).isFull
    ) {
      this.currentId = cuid();
      this.rooms.set(this.currentId, new Room(player));
    } else {
      this.rooms.get(this.currentId).player2 = player;
    }
    return this.currentId;
  }

  static destroy(roomId) {
    this.rooms.delete(roomId);
    app.publish(`${roomId}`, JSON.stringify(["gameEnded"]));
  }

  static getRoom(id) {
    return this.rooms.get(id);
  }
}

function matchmaking(ws, { userName, isProtected, roomId }) {
  ws.userId = cuid();
  const player = {
    userId: ws.userId,
    userName: userName || "anonymous",
  };
  if (isProtected) {
    ws.roomId = Rooms.createProtectedRoom(player);
  } else if (roomId) {
    const joined = Rooms.joinProtectedRoom(player, roomId);
    if (!joined) {
      ws.send(JSON.stringify(["doesNotExist"]));
      return;
    }
    ws.roomId = roomId;
  } else {
    ws.roomId = Rooms.matchmaking(player);
  }

  ws.subscribe(`${ws.roomId}`);
  ws.subscribe(`${ws.roomId}/${ws.userId}`);

  ws.publish(
    `${ws.roomId}/${ws.userId}`,
    JSON.stringify(["roomJoined", ws.roomId])
  );

  if (Rooms.getRoom(ws.roomId).isFull) {
    ws.publish(
      `${ws.roomId}`,
      JSON.stringify(["gameStarted", Rooms.getRoom(ws.roomId)])
    );
  }
}

const eventHandlers = {
  matchmaking: matchmaking,
};

const app = uws.App();

app
  .ws("/*", {
    compression: uws.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 0,
    maxBackpressure: 1024,
    open: (ws) => {},
    message: (ws, message, isBinary) => {
      const [event, payload] = JSON.parse(
        new TextDecoder("utf-8").decode(message)
      );
      eventHandlers[event](ws, payload);
    },
    drain: (ws) => {},
    close: (ws, code, message) => {
      const room = Rooms.getRoom(ws.roomId);
      if (ws.userId && room) {
        const room = Rooms.getRoom(ws.roomId);

        const winner =
          room.player1.userId === ws.userId
            ? room.player1.userName
            : room.player2.userName;

        Rooms.destroy(ws.roomId);
        app.publish(`${ws.roomId}`, JSON.stringify(["gameEnded", { winner }]));
      }
    },
  })
  .any("/*", (res, req) => {
    res.end("Nothing to see here!");
  })
  .listen(process.env.PORT || 9001, () => {
    console.log("listenin on " + process.env.PORT);
  });
