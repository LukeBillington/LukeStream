import React, { createRef } from "react";
import Player from "../Player";
import { Props, DefaultProps, State } from "./types";
import { Interactive } from "./styles";
import {
  RoomContext,
  PeersContext,
  PlayerContext,
  UserContext,
} from "../context";
import Peers from "../Peers";
import Controls from "../Controls";
import Status from "../Status";

class Room extends React.Component<Props, State> {
  static defaultProps: Required<DefaultProps> = {
    host: false,
  };

  interactive: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      fullScreen: false,
    };

    this.interactive = createRef<HTMLDivElement>();
  }

  componentDidMount = (): void => {
    window.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener(
      "fullscreenchange",
      this.handleFullScreenChangeEvent
    );
  };

  componentWillUnmount = (): void => {
    window.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullScreenChangeEvent
    );
  };

  render = (): JSX.Element => {
    const { stream } = this.props;
    const { fullScreen } = this.state;
    return (
      <UserContext.Consumer>
        {({ name, color, avatar }) => {
          return (
            <RoomContext.Provider>
              <PeersContext.Provider
                user={{ name, color, avatar }}
                stream={stream}
              >
                <RoomContext.Consumer>
                  {({ connected }) => {
                    return (
                      <PlayerContext.Provider connected={connected}>
                        <PlayerContext.Consumer>
                          {({
                            controls,
                            setControls,
                            socketSetPlaying,
                            indicatorSetPlaying,
                            socketSetBuffering,
                            socketSetTime,
                            indicatorSetTime,
                            playerVolume,
                            playing,
                            setPlaying,
                          }) => {
                            return (
                              <Interactive
                                showCursor={controls}
                                ref={this.interactive}
                                onMouseMove={() => {
                                  setControls(true);
                                }}
                                onClick={() => {
                                  setPlaying(!playing);
                                }}
                              >
                                <Player
                                  socketSetPlaying={socketSetPlaying}
                                  indicatorSetPlaying={indicatorSetPlaying}
                                  socketSetBuffering={socketSetBuffering}
                                  socketSetTime={socketSetTime}
                                  indicatorSetTime={indicatorSetTime}
                                  playerVolume={playerVolume}
                                  onFullScreen={
                                    this.handleInteractiveFullscreen
                                  }
                                />
                                <Status />
                                <Peers />
                                <Controls
                                  fullScreen={fullScreen}
                                  onFullScreen={
                                    this.handleInteractiveFullscreen
                                  }
                                />
                              </Interactive>
                            );
                          }}
                        </PlayerContext.Consumer>
                      </PlayerContext.Provider>
                    );
                  }}
                </RoomContext.Consumer>
              </PeersContext.Provider>
            </RoomContext.Provider>
          );
        }}
      </UserContext.Consumer>
    );
  };

  handleFullScreenChangeEvent = (): void => {
    if (document.fullscreenElement) {
      this.setState({ fullScreen: true });
    } else {
      this.setState({ fullScreen: false });
    }
  };

  handleInteractiveFullscreen = (fs: boolean): void => {
    const { fullScreen } = this.state;
    if (fs && !fullScreen && this.interactive.current) {
      this.interactive.current?.requestFullscreen();
    }
    if (!fs && fullScreen) {
      document.exitFullscreen();
    }
  };

  handleKeyUp = (evt: KeyboardEvent): void => {
    const { fullScreen } = this.state;
    if (evt.keyCode === 70) {
      this.handleInteractiveFullscreen(!fullScreen);
    }
  };
}

export default Room;
