import React, { createContext } from "react";
import Peer, { Instance } from "simple-peer";
import { User } from "../types";
import {
  PAYLOAD_OUTGOING_HELLO,
  PAYLOAD_USER_JOINS,
  PAYLOAD_OUTGOING_CALL,
  PAYLOAD_USER_LEAVES,
  PAYLOAD_OUTGOING_ANSWER,
  PAYLOAD_INCOMING_CALL,
  PAYLOAD_INCOMING_ANSWER,
  PAYLOAD_INCOMING_STREAM_TOGGLE,
  PAYLOAD_OUTGOING_STREAM_TOGGLE,
} from "../../socket/types";
import socket from "../socket";

export interface PeerData {
  connection: Instance;
  user: User;
  audio: boolean;
  video: boolean;
}

interface Props {
  user: User;
  stream: MediaStream;
}

interface State {
  stream?: MediaStream;
  audio: boolean;
  setAudio: (audio: boolean) => void;
  video: boolean;
  setVideo: (video: boolean) => void;
  peers: Record<string, PeerData>;
}

const defaultState: State = {
  audio: false,
  setAudio: () => undefined,
  video: false,
  setVideo: () => undefined,
  peers: {},
};

const { Provider, Consumer } = createContext(defaultState);

class PeersContextProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultState,
      stream: props.stream,
      setAudio: this.handleSetAudio,
      setVideo: this.handleSetVideo,
    };
  }

  componentDidMount = (): void => {
    window.addEventListener("keyup", this.handleKeyUp);
    this.sendOutgoingHello();
    socket.on("USER_JOINS", this.receiveUserJoins);
    socket.on("USER_LEAVES", this.receiveUserLeaves);
    socket.on("INCOMING_CALL", this.receiveIncomingCall);
    socket.on("INCOMING_ANSWER", this.receiveIncomingAnswer);
    socket.on("INCOMING_STREAM_TOGGLE", this.receiveIncomingStreamToggle);
  };

  componentWillUnmount = (): void => {
    const { peers } = this.state;
    window.removeEventListener("keyup", this.handleKeyUp);
    Object.keys(peers).forEach(this.removePeer);
  };

  render = (): JSX.Element => {
    const { children } = this.props;
    return <Provider value={{ ...this.state }}>{children}</Provider>;
  };

  handleSetAudio = (audioValue: boolean): void => {
    const { stream, video } = this.state;
    if (stream) {
      stream.getAudioTracks()[0].enabled = audioValue;
      const payload: PAYLOAD_OUTGOING_STREAM_TOGGLE = {
        audio: audioValue,
        video,
      };
      socket.emit("OUTGOING_STREAM_TOGGLE", payload);
      this.setState({ audio: audioValue });
    } else {
      this.setState({ audio: false, video: false });
    }
  };

  handleSetVideo = (videoValue: boolean): void => {
    const { stream, audio } = this.state;
    if (stream) {
      stream.getVideoTracks()[0].enabled = videoValue;
      const payload: PAYLOAD_OUTGOING_STREAM_TOGGLE = {
        audio,
        video: videoValue,
      };
      socket.emit("OUTGOING_STREAM_TOGGLE", payload);
      this.setState({ video: videoValue });
    } else {
      this.setState({ audio: false, video: false });
    }
  };

  private handleKeyUp = (evt: KeyboardEvent): void => {
    const { audio, video } = this.state;
    if (evt.keyCode === 65) {
      this.handleSetAudio(!audio);
    }
    if (evt.keyCode === 86) {
      this.handleSetVideo(!video);
    }
  };

  private addPeer = (
    socketId: string,
    connection: Instance,
    user: User,
    audio: boolean,
    video: boolean
  ) => {
    const { peers } = this.state;
    peers[socketId] = { connection, user, audio, video };
    this.setState({ peers });
  };

  private removePeer = (socketId: string) => {
    const { peers } = this.state;
    const peer = peers[socketId];
    if (peer) {
      peer.connection.destroy();
      delete peers[socketId];
      this.setState({ peers });
    }
  };

  private sendOutgoingHello = () => {
    const { user } = this.props;
    const { audio, video } = this.state;
    const payload: PAYLOAD_OUTGOING_HELLO = {
      user,
      audio,
      video,
    };
    socket.emit("OUTGOING_HELLO", payload);
  };

  private receiveUserJoins = (data: PAYLOAD_USER_JOINS) => {
    const { user } = this.props;
    const { stream, audio, video } = this.state;
    const connection = new Peer({ initiator: true, trickle: false, stream });
    connection.on("error", () => undefined);
    connection.on("signal", (signal) => {
      const payload: PAYLOAD_OUTGOING_CALL = {
        socketId: data.socketId,
        user,
        signal,
        audio,
        video,
      };
      socket.emit("OUTGOING_CALL", payload);
    });
    this.addPeer(data.socketId, connection, data.user, data.audio, data.video);
  };

  private receiveUserLeaves = (data: PAYLOAD_USER_LEAVES) => {
    this.removePeer(data.socketId);
  };

  private receiveIncomingCall = (data: PAYLOAD_INCOMING_CALL) => {
    const { stream } = this.state;
    const connection = new Peer({ initiator: false, trickle: false, stream });
    connection.on("error", () => undefined);
    connection.on("signal", (signal) => {
      const payload: PAYLOAD_OUTGOING_ANSWER = {
        socketId: data.socketId,
        signal,
      };
      socket.emit("OUTGOING_ANSWER", payload);
    });
    connection.signal(data.signal);
    this.addPeer(data.socketId, connection, data.user, data.audio, data.video);
  };

  private receiveIncomingAnswer = (data: PAYLOAD_INCOMING_ANSWER) => {
    const { peers } = this.state;
    const peer = peers[data.socketId];
    if (peer) {
      peer.connection.signal(data.signal);
    }
  };

  private receiveIncomingStreamToggle = (
    data: PAYLOAD_INCOMING_STREAM_TOGGLE
  ) => {
    const { peers } = this.state;
    const peer = peers[data.socketId];
    if (peer) {
      peer.audio = data.audio;
      peer.video = data.video;
      peers[data.socketId] = peer;
      this.setState({ peers });
    }
  };
}

export { Consumer, PeersContextProvider as Provider };
