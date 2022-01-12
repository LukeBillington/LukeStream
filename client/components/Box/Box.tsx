import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserAvatar from "../UserAvatar";
import AudioVisual from "../AudioVisual";
import Slider from "../Slider";
import {
  Video,
  Overlay,
  Content,
  Avatar,
  Audio,
  Toolbar,
  Button,
} from "./styles";
import { Props, State } from "./types";

class Box extends React.Component<Props, State> {
  videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      volume: 100,
      speaking: false,
    };
  }

  componentDidUpdate = (prevProps: Props): void => {
    const { audio } = this.props;
    if (prevProps.audio === true && audio === false) {
      this.handleSpeaking(false);
    }
  };

  componentDidMount = (): void => {
    const { stream } = this.props;
    const videoRef = this.videoRef.current;
    if (videoRef) {
      videoRef.srcObject = stream;
    }
  };

  render = (): JSX.Element => {
    const { stream, user, audio, video, self, mouseOver, size } = this.props;
    const { volume, speaking } = this.state;
    return (
      <>
        <Video
          autoPlay
          ref={this.videoRef}
          muted={self}
          visible={video}
          onVolumeChange={this.handleVolumeChangeEvent}
          speaking={speaking}
        />
        <Overlay visible={!!video && !!mouseOver} />
        <Content
          visible={!video || mouseOver}
          speaking={speaking && !video}
          size={size}
        >
          <Avatar>
            <UserAvatar
              avatar={user.avatar}
              color={user.color}
              name={user.name}
              size="small"
            />
          </Avatar>
          {size >= 180 && (
            <Audio>
              {audio && (
                <AudioVisual
                  stream={stream}
                  color={user.color}
                  onSpeak={(s) => {
                    this.setState({ speaking: s });
                  }}
                />
              )}
              {!audio && <>Muted</>}
            </Audio>
          )}
          <Toolbar
            visible={mouseOver}
            onMouseDown={(evt) => {
              evt.stopPropagation();
            }}
          >
            {self && (
              <>
                <Button
                  onClick={this.handleAudio}
                  title={audio ? "Disable Audio (A)" : "Enable Audio (A)"}
                >
                  <FontAwesomeIcon
                    icon={audio ? "microphone" : "microphone-slash"}
                    fixedWidth
                  />
                </Button>
                <Button
                  onClick={this.handleVideo}
                  title={video ? "Disable Video (V)" : "Enable Video (V)"}
                >
                  <FontAwesomeIcon
                    icon={video ? "video" : "video-slash"}
                    fixedWidth
                  />
                </Button>
              </>
            )}
            {!self && (
              <Slider
                type="range"
                min={0}
                max={100}
                value={volume}
                color={user.color}
                onChange={this.handleVolumeChangeControl}
              />
            )}
          </Toolbar>
        </Content>
      </>
    );
  };

  handleVolumeChangeControl = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const videoRef = this.videoRef.current;
    if (videoRef) {
      videoRef.volume = parseFloat(evt.currentTarget.value) / 100;
    }
  };

  handleVolumeChangeEvent = (
    evt: React.SyntheticEvent<HTMLVideoElement, Event>
  ): void => {
    this.setState({ volume: evt.currentTarget.volume * 100 });
  };

  handleAudio = (): void => {
    const { onAudio, audio } = this.props;
    if (onAudio) {
      onAudio(!audio);
    }
  };

  handleVideo = (): void => {
    const { onVideo, video } = this.props;
    if (onVideo) {
      onVideo(!video);
    }
  };

  handleSpeaking = (speaking: boolean): void => {
    this.setState({ speaking });
  };
}

export default Box;
