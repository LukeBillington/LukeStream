import { Server } from "https";
import socketio from "socket.io";
import {
  PAYLOAD_INCOMING_HELLO,
  PAYLOAD_OUTGOING_HELLO,
  PAYLOAD_USER_JOINS,
  PAYLOAD_USER_LEAVES,
  PAYLOAD_OUTGOING_CALL,
  PAYLOAD_INCOMING_CALL,
  PAYLOAD_OUTGOING_ANSWER,
  PAYLOAD_INCOMING_ANSWER,
  PAYLOAD_OUTGOING_STREAM_TOGGLE,
  PAYLOAD_INCOMING_STREAM_TOGGLE,
  PAYLOAD_INCOMING_VIDEO,
  PAYLOAD_OUTGOING_VIDEO,
} from "../socket/types";

export default (server: Server): void => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    socket.on("PING", () => {
      socket.emit("PONG");
    });

    socket.on("OUTGOING_HELLO", (payload: PAYLOAD_OUTGOING_HELLO) => {
      const userJoinsPayload: PAYLOAD_USER_JOINS = {
        socketId: socket.id,
        user: payload.user,
        audio: payload.audio,
        video: payload.video,
      };
      socket.broadcast.emit("USER_JOINS", userJoinsPayload);
      const incomingHelloPayload: PAYLOAD_INCOMING_HELLO = {
        socketId: socket.id,
      };
      socket.emit("INCOMING_HELLO", incomingHelloPayload);
    });

    socket.on("disconnect", () => {
      const userLeavesPayload: PAYLOAD_USER_LEAVES = {
        socketId: socket.id,
      };
      socket.broadcast.emit("USER_LEAVES", userLeavesPayload);
    });

    socket.on("OUTGOING_CALL", (payload: PAYLOAD_OUTGOING_CALL) => {
      const incomingCallPayload: PAYLOAD_INCOMING_CALL = {
        socketId: socket.id,
        user: payload.user,
        signal: payload.signal,
        audio: payload.audio,
        video: payload.video,
      };
      socket.to(payload.socketId).emit("INCOMING_CALL", incomingCallPayload);
    });

    socket.on("OUTGOING_ANSWER", (payload: PAYLOAD_OUTGOING_ANSWER) => {
      const incomingAnswerPayload: PAYLOAD_INCOMING_ANSWER = {
        socketId: socket.id,
        signal: payload.signal,
      };
      socket
        .to(payload.socketId)
        .emit("INCOMING_ANSWER", incomingAnswerPayload);
    });

    socket.on(
      "OUTGOING_STREAM_TOGGLE",
      (payload: PAYLOAD_OUTGOING_STREAM_TOGGLE) => {
        const incomingStreamTogglePayload: PAYLOAD_INCOMING_STREAM_TOGGLE = {
          socketId: socket.id,
          audio: payload.audio,
          video: payload.video,
        };
        socket.broadcast.emit(
          "INCOMING_STREAM_TOGGLE",
          incomingStreamTogglePayload
        );
      }
    );

    socket.on("VIDEO_PLAY", (payload: PAYLOAD_OUTGOING_VIDEO) => {
      const output: PAYLOAD_INCOMING_VIDEO = {
        ...payload,
        socketId: socket.id,
      };
      io.emit("VIDEO_PLAY", output);
    });

    socket.on("VIDEO_PAUSE", (payload: PAYLOAD_OUTGOING_VIDEO) => {
      const output: PAYLOAD_INCOMING_VIDEO = {
        ...payload,
        socketId: socket.id,
      };
      io.emit("VIDEO_PAUSE", output);
    });

    socket.on("VIDEO_TIME", (payload: PAYLOAD_OUTGOING_VIDEO) => {
      const output: PAYLOAD_INCOMING_VIDEO = {
        ...payload,
        socketId: socket.id,
      };
      io.emit("VIDEO_TIME", output);
    });

    socket.on("VIDEO_BUFFER", (payload: PAYLOAD_OUTGOING_VIDEO) => {
      const output: PAYLOAD_INCOMING_VIDEO = {
        ...payload,
        socketId: socket.id,
      };
      io.emit("VIDEO_BUFFER", output);
    });

    socket.on("VIDEO_RESUME", (payload: PAYLOAD_OUTGOING_VIDEO) => {
      const output: PAYLOAD_INCOMING_VIDEO = {
        ...payload,
        socketId: socket.id,
      };
      io.emit("VIDEO_RESUME", output);
    });

    socket.on("VIDEO_LOADED", (payload: PAYLOAD_OUTGOING_VIDEO) => {
      const output: PAYLOAD_INCOMING_VIDEO = {
        ...payload,
        socketId: socket.id,
      };
      io.emit("VIDEO_LOADED", output);
    });
  });
};
