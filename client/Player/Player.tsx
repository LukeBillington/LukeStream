import React from "react";
import { VideoWrapper, VideoPlayer } from "./styles";
import { Props } from "./types";
import socket from "../socket";
import { PAYLOAD_INCOMING_VIDEO } from "../../socket/types";
import { PlayerContext } from "../context";

class Player extends React.Component<Props, unknown> {
  videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount = (): void => {
    socket.on("VIDEO_PLAY", (payload: PAYLOAD_INCOMING_VIDEO) => {
      const { socketSetPlaying, indicatorSetPlaying } = this.props;
      const videoRef = this.videoRef.current;
      if (videoRef) {
        videoRef.currentTime = payload.time;
        videoRef.play();
        socketSetPlaying(true);
        indicatorSetPlaying(true);
      }
    });

    socket.on("VIDEO_PAUSE", (payload: PAYLOAD_INCOMING_VIDEO) => {
      const { socketSetPlaying, indicatorSetPlaying } = this.props;
      const videoRef = this.videoRef.current;
      if (videoRef) {
        videoRef.currentTime = payload.time;
        videoRef.pause();
        socketSetPlaying(false);
        indicatorSetPlaying(false);
      }
    });

    socket.on("VIDEO_BUFFER", () => {
      const { socketSetBuffering } = this.props;
      const videoRef = this.videoRef.current;
      if (videoRef) {
        videoRef.pause();
        socketSetBuffering(true);
      }
    });

    socket.on("VIDEO_RESUME", () => {
      const { socketSetBuffering } = this.props;
      const videoRef = this.videoRef.current;
      if (videoRef) {
        videoRef.play();
        socketSetBuffering(false);
      }
    });

    socket.on("VIDEO_LOADED", () => {
      const { socketSetBuffering } = this.props;
      socketSetBuffering(false);
    });

    socket.on("VIDEO_TIME", (payload: PAYLOAD_INCOMING_VIDEO) => {
      const { socketSetTime, indicatorSetTime } = this.props;
      const videoRef = this.videoRef.current;
      if (videoRef) {
        videoRef.currentTime = payload.time;
        videoRef.play();
        socketSetTime();
        indicatorSetTime(payload.time);
      }
    });
  };

  componentDidUpdate = (prevProps: Props): void => {
    const { playerVolume } = this.props;
    const videoRef = this.videoRef.current;
    if (prevProps.playerVolume !== playerVolume) {
      if (videoRef) {
        videoRef.volume = playerVolume / 100;
      }
    }
  };

  render = (): JSX.Element => {
    return (
      <PlayerContext.Consumer>
        {({
          movie,
          playerSetPlaying,
          playerSetBuffering,
          playerSetTime,
          playerSetDuration,
          playerSetVolume,
          captions,
          muted,
        }) => {
          if (movie) {
            return (
              <VideoWrapper>
                <VideoPlayer
                  ref={this.videoRef}
                  preload="auto"
                  onPlay={() => {
                    playerSetPlaying(true);
                  }}
                  onPause={() => {
                    playerSetPlaying(false);
                  }}
                  onWaiting={() => {
                    playerSetBuffering(true);
                  }}
                  onCanPlayThrough={() => {
                    playerSetBuffering(false);
                  }}
                  onTimeUpdate={(evt) => {
                    playerSetTime(evt.currentTarget.currentTime);
                  }}
                  onLoadedMetadata={(evt) => {
                    playerSetDuration(evt.currentTarget.duration);
                  }}
                  onVolumeChange={(evt) => {
                    playerSetVolume(evt.currentTarget.volume * 100);
                  }}
                  muted={muted}
                >
                  <source
                    src={`/stream-proxy/${movie.movie}`}
                    type="video/mp4"
                  />
                  {!!captions && !!movie.subtitles && (
                    <track
                      label="English"
                      kind="subtitles"
                      srcLang="en"
                      src={`/static-proxy/${movie.subtitles}`}
                      default
                    />
                  )}
                </VideoPlayer>
              </VideoWrapper>
            );
          }
          return <></>;
        }}
      </PlayerContext.Consumer>
    );
  };
}

export default Player;
