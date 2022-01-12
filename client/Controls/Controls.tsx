import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultProps, defaultState } from "./defaults";
import {
  Container,
  Brand,
  ElapsedTime,
  RemainingTime,
  TimeContainer,
  ToolbarLeft,
  ToolbarRight,
  Button,
  Title,
  Year,
  VolumeWrapper,
  VolumeContainer,
} from "./styles";
import { Props, State } from "./types";
import { timeFormat, between, volumeFormat } from "../util";
import Slider from "../components/Slider";
import TimeSlider from "../components/TimeSlider";
import { PeersContext, PlayerContext } from "../context";

class Controls extends React.Component<Props, State> {
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = defaultState;
  }

  render = (): JSX.Element => {
    const { fullScreen, onFullScreen } = this.props;
    const { showVolume } = this.state;
    return (
      <PeersContext.Consumer>
        {({ audio, setAudio, video, setVideo }) => {
          return (
            <PlayerContext.Consumer>
              {({
                movie,
                controls,
                playing,
                setPlaying,
                time,
                setTime,
                duration,
                captions,
                setCaptions,
                volume,
                setVolume,
                muted,
                setMuted,
              }) => {
                if (movie) {
                  return (
                    <Container
                      visible={controls}
                      onClick={(evt) => {
                        evt.stopPropagation();
                      }}
                    >
                      <Brand>Lukeflix</Brand>
                      <ElapsedTime>
                        {timeFormat(between(time, 0, duration))}
                      </ElapsedTime>
                      <RemainingTime>
                        {timeFormat(between(duration - time, 0, duration))}
                      </RemainingTime>
                      <TimeContainer>
                        <TimeSlider
                          min={0}
                          max={duration}
                          value={time}
                          onChange={setTime}
                          thumbs={movie.thumbs}
                        />
                      </TimeContainer>
                      <ToolbarLeft>
                        <Button
                          onClick={() => {
                            setPlaying(!playing);
                          }}
                          title={playing ? "Pause (Space)" : "Play (Space)"}
                        >
                          <FontAwesomeIcon
                            icon={playing ? "pause" : "play"}
                            fixedWidth
                          />
                        </Button>
                        <Title>{movie.title}</Title>
                        {!!movie.year && <Year>{movie.year}</Year>}
                      </ToolbarLeft>
                      <ToolbarRight>
                        <Button
                          onClick={() => setAudio(!audio)}
                          title={
                            audio ? "Disable Audio (A)" : "Enable Audio (A)"
                          }
                        >
                          <FontAwesomeIcon
                            icon={audio ? "microphone" : "microphone-slash"}
                            fixedWidth
                          />
                        </Button>
                        <Button
                          onClick={() => setVideo(!video)}
                          title={
                            video ? "Disable Video (V)" : "Enable Video (V)"
                          }
                        >
                          <FontAwesomeIcon
                            icon={video ? "video" : "video-slash"}
                            fixedWidth
                          />
                        </Button>
                        {!!movie.subtitles && (
                          <Button
                            onClick={() => {
                              setCaptions(!captions);
                            }}
                            title={
                              captions
                                ? "Hide Captions (C)"
                                : "Show Captions (C)"
                            }
                          >
                            <FontAwesomeIcon
                              icon={captions ? "comment" : "comment-slash"}
                              fixedWidth
                            />
                          </Button>
                        )}
                        <VolumeWrapper
                          onMouseMove={() => {
                            this.setState({ showVolume: true });
                          }}
                          onMouseLeave={() => {
                            this.setState({ showVolume: false });
                          }}
                        >
                          <VolumeContainer visible={showVolume}>
                            <Slider
                              type="range"
                              min={0}
                              max={100}
                              value={volume}
                              onChange={(evt) => {
                                setVolume(parseFloat(evt.currentTarget.value));
                              }}
                            />
                          </VolumeContainer>
                          <Button
                            onClick={() => {
                              setMuted(!muted);
                            }}
                            title={muted ? "Unmute (M)" : "Mute (M)"}
                          >
                            <FontAwesomeIcon
                              icon={volumeFormat(volume, muted)}
                              fixedWidth
                            />
                          </Button>
                        </VolumeWrapper>
                        <Button
                          onClick={() => {
                            onFullScreen(!fullScreen);
                          }}
                          title={
                            fullScreen
                              ? "Exit Full Screen (F)"
                              : "Full Screen (F)"
                          }
                        >
                          <FontAwesomeIcon
                            icon={fullScreen ? "compress-alt" : "expand-alt"}
                            fixedWidth
                          />
                        </Button>
                      </ToolbarRight>
                    </Container>
                  );
                }
                return <></>;
              }}
            </PlayerContext.Consumer>
          );
        }}
      </PeersContext.Consumer>
    );
  };
}

export default Controls;
