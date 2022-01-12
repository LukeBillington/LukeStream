/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "../client/types";

export enum SocketEventEnum {
  "INCOMING_HELLO",
  "OUTGOING_HELLO",
  "USER_JOINS",
  "USER_LEAVES",
  "OUTGOING_CALL",
  "INCOMING_CALL",
  "OUTGOING_ANSWER",
  "INCOMING_ANSWER",
  "OUTGOING_STREAM_TOGGLE",
  "INCOMING_STREAM_TOGGLE",
}

export interface PAYLOAD_INCOMING_HELLO {
  socketId: string;
}

export interface PAYLOAD_OUTGOING_HELLO {
  user: User;
  audio: boolean;
  video: boolean;
}

export interface PAYLOAD_USER_JOINS {
  socketId: string;
  user: User;
  audio: boolean;
  video: boolean;
}

export interface PAYLOAD_USER_LEAVES {
  socketId: string;
}

export interface PAYLOAD_OUTGOING_CALL {
  socketId: string;
  user: User;
  signal: any;
  audio: boolean;
  video: boolean;
}

export interface PAYLOAD_INCOMING_CALL {
  socketId: string;
  user: User;
  signal: any;
  audio: boolean;
  video: boolean;
}

export interface PAYLOAD_OUTGOING_ANSWER {
  socketId: string;
  signal: any;
}

export interface PAYLOAD_INCOMING_ANSWER {
  socketId: string;
  signal: any;
}

export interface PAYLOAD_OUTGOING_STREAM_TOGGLE {
  audio: boolean;
  video: boolean;
}

export interface PAYLOAD_INCOMING_STREAM_TOGGLE {
  socketId: string;
  audio: boolean;
  video: boolean;
}

export interface PAYLOAD_OUTGOING_VIDEO {
  time: number;
}

export interface PAYLOAD_INCOMING_VIDEO {
  socketId: string;
  time: number;
}
