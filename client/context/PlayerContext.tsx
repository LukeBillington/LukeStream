import React, { createContext } from "react";
import axios from "axios";
import { Config } from "../types";
import { PAYLOAD_OUTGOING_VIDEO } from "../../socket/types";
import socket from "../socket";
import { between } from "../util";

interface Props {
  connected: boolean;
}

interface State {
  movie?: Config["movie"];
  controls: boolean;
  controlsTimeout?: number;
  setControls: (controlsValue: boolean) => void;
  playing: boolean;
  indicatorPlaying?: boolean;
  manualPlay: boolean;
  setPlaying: (playingValue: boolean) => void;
  socketSetPlaying: (playingValue: boolean) => void;
  playerSetPlaying: (playingValue: boolean) => void;
  indicatorSetPlaying: (playingValue: boolean) => void;
  buffering: boolean;
  waiting: boolean;
  socketSetBuffering: (bufferingValue: boolean) => void;
  playerSetBuffering: (bufferingValue: boolean) => void;
  time: number;
  indicatorTime?: "back" | "forward";
  setTime: (timeValue: number) => void;
  socketSetTime: () => void;
  playerSetTime: (timeValue: number) => void;
  indicatorSetTime: (timeValue: number) => void;
  duration: number;
  playerSetDuration: (durationValue: number) => void;
  captions: boolean;
  setCaptions: (captionsValue: boolean) => void;
  volume: number;
  playerVolume: number;
  setVolume: (volumeValue: number) => void;
  playerSetVolume: (volumeValue: number) => void;
  muted: boolean;
  setMuted: (mutedValue: boolean) => void;
}

const defaultState: State = {
  controls: false,
  setControls: () => undefined,
  playing: false,
  manualPlay: false,
  setPlaying: () => undefined,
  socketSetPlaying: () => undefined,
  playerSetPlaying: () => undefined,
  indicatorSetPlaying: () => undefined,
  buffering: false,
  waiting: false,
  socketSetBuffering: () => undefined,
  playerSetBuffering: () => undefined,
  time: 0,
  setTime: () => undefined,
  socketSetTime: () => undefined,
  playerSetTime: () => undefined,
  indicatorSetTime: () => undefined,
  duration: 0,
  playerSetDuration: () => undefined,
  captions: false,
  setCaptions: () => undefined,
  volume: 100,
  playerVolume: 100,
  setVolume: () => undefined,
  playerSetVolume: () => undefined,
  muted: false,
  setMuted: () => undefined,
};

const { Provider, Consumer } = createContext(defaultState);

class PlayerContextProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultState,
      setControls: this.handleSetControls,
      setPlaying: this.handleSetPlaying,
      socketSetPlaying: this.handleSocketSetPlaying,
      playerSetPlaying: this.handlePlayerSetPlaying,
      indicatorSetPlaying: this.handleIndicatorSetPlaying,
      socketSetBuffering: this.handleSocketSetBuffering,
      playerSetBuffering: this.handlePlayerSetBuffering,
      setTime: this.handleSetTime,
      socketSetTime: this.handleSocketSetTime,
      playerSetTime: this.handlePlayerSetTime,
      indicatorSetTime: this.handleIndicatorSetTime,
      playerSetDuration: this.handlePlayerSetDuration,
      setCaptions: this.handleSetCaptions,
      setVolume: this.handleSetVolume,
      playerSetVolume: this.handlePlayerSetVolume,
    };
  }

  componentDidMount = (): void => {
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
    this.fetchMovie();
  };

  componentDidUpdate = (prevProps: Props): void => {
    const { connected } = this.props;
    if (prevProps.connected && !connected) {
      this.handleSetPlaying(false);
    }
  };

  componentWillUnmount = (): void => {
    const { controlsTimeout } = this.state;
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
    clearTimeout(controlsTimeout);
  };

  render = (): JSX.Element => {
    const { children } = this.props;
    return <Provider value={{ ...this.state }}>{children}</Provider>;
  };

  handleSetControls = (controlsValue: boolean): void => {
    const { controlsTimeout } = this.state;
    clearTimeout(controlsTimeout);
    if (controlsValue) {
      this.setState({
        controls: true,
        controlsTimeout: setTimeout(() => {
          this.setState({ controls: false });
        }, 1500),
      });
    } else {
      clearTimeout(controlsTimeout);
      this.setState({ controls: false });
    }
  };

  handleSetPlaying = (playingValue: boolean): void => {
    const { time } = this.state;
    const payload: PAYLOAD_OUTGOING_VIDEO = {
      time,
    };
    if (playingValue) {
      socket.emit("VIDEO_PLAY", payload);
    } else {
      socket.emit("VIDEO_PAUSE", payload);
    }
  };

  handleSocketSetPlaying = (playingValue: boolean): void => {
    this.setState({ manualPlay: playingValue });
  };

  handlePlayerSetPlaying = (playingValue: boolean): void => {
    this.setState({ playing: playingValue }, () => {
      this.handleSetControls(!playingValue);
    });
  };

  handleIndicatorSetPlaying = (playingValue: boolean): void => {
    this.setState({ indicatorPlaying: playingValue }, () => {
      this.setState({ indicatorPlaying: undefined });
    });
  };

  handleSocketSetBuffering = (bufferingValue: boolean): void => {
    this.setState({ waiting: bufferingValue });
  };

  handlePlayerSetBuffering = (bufferingValue: boolean): void => {
    const { buffering, time, manualPlay } = this.state;
    const payload: PAYLOAD_OUTGOING_VIDEO = {
      time,
    };
    this.setState({ buffering: bufferingValue }, () => {
      if (bufferingValue && !buffering) {
        socket.emit("VIDEO_BUFFER", payload);
      } else if (!bufferingValue && buffering) {
        socket.emit(manualPlay ? "VIDEO_RESUME" : "VIDEO_LOADED", payload);
      }
    });
  };

  handleSetTime = (timeValue: number): void => {
    const { duration } = this.state;
    const payload: PAYLOAD_OUTGOING_VIDEO = {
      time: between(timeValue, 0, duration),
    };
    socket.emit("VIDEO_TIME", payload);
  };

  handleSocketSetTime = (): void => {
    this.setState({
      manualPlay: true,
    });
  };

  handleIndicatorSetTime = (timeValue: number): void => {
    const { time } = this.state;
    if (timeValue !== time) {
      this.setState({ indicatorTime: timeValue < time ? "back" : "forward" });
    }
  };

  handlePlayerSetTime = (timeValue: number): void => {
    const { duration } = this.state;
    this.setState({ time: between(timeValue, 0, duration) });
  };

  handlePlayerSetDuration = (durationValue: number): void => {
    this.setState({ duration: durationValue });
  };

  handleSetCaptions = (captionsValue: boolean): void => {
    this.setState({ captions: captionsValue });
  };

  handleSetVolume = (volumeValue: number): void => {
    this.setState({ playerVolume: between(volumeValue, 0, 100) });
  };

  handlePlayerSetVolume = (volumeValue: number): void => {
    this.setState({ volume: between(volumeValue, 0, 100) });
  };

  handleSetMuted = (mutedValue: boolean): void => {
    this.setState({ muted: mutedValue });
  };

  private handleKeyUp = (evt: KeyboardEvent): void => {
    const { movie, playing, captions, muted } = this.state;
    if (evt.keyCode === 32 || evt.keyCode === 75) {
      evt.view?.event?.preventDefault();
      this.handleSetPlaying(!playing);
    }
    if (evt.keyCode === 67 && !!movie && !!movie.subtitles) {
      this.handleSetCaptions(!captions);
    }
    if (evt.keyCode === 77) {
      this.handleSetMuted(!muted);
    }
  };

  private handleKeyDown = (evt: KeyboardEvent): void => {
    const { time, volume } = this.state;
    if (evt.keyCode === 37) {
      evt.view?.event?.preventDefault();
      this.handleSetControls(true);
      this.handleSetTime(time - 5);
    }
    if (evt.keyCode === 74) {
      this.handleSetControls(true);
      this.handleSetTime(time - 15);
    }
    if (evt.keyCode === 39) {
      evt.view?.event?.preventDefault();
      this.handleSetControls(true);
      this.handleSetTime(time + 5);
    }
    if (evt.keyCode === 76) {
      this.handleSetControls(true);
      this.handleSetTime(time + 15);
    }
    if (evt.keyCode === 40) {
      evt.view?.event?.preventDefault();
      this.handleSetVolume(volume - 5);
    }
    if (evt.keyCode === 38) {
      evt.view?.event?.preventDefault();
      this.handleSetVolume(volume + 5);
    }
  };

  private fetchMovie = async (): Promise<void> => {
    const response = await axios.get("/movie-conf");
    const movie = response.data as Config["movie"];
    this.setState({ movie });
  };
}

export { Consumer, PlayerContextProvider as Provider };
