import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Props, State } from "./types";
import { Container } from "./styles";
import Spinner from "../../../components/Spinner";
import { defaultState } from "./defaults";
import { volumeFormat } from "../../../util";

class Indicator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultState;
  }

  componentDidUpdate = (prevProps: Props): void => {
    const { playing, time, captions, volume, muted, audio, video } = this.props;
    if (prevProps.playing !== playing) {
      this.handlePlaying();
    }
    if (prevProps.time !== time) {
      this.handleTime();
    }
    if (prevProps.captions !== captions) {
      this.handleCaptions();
    }
    if (prevProps.volume !== volume || prevProps.muted !== muted) {
      this.handleVolume();
    }
    if (prevProps.audio !== audio) {
      this.handleAudio();
    }
    if (prevProps.video !== video) {
      this.handleVideo();
    }
  };

  render = (): JSX.Element => {
    const { visible, onShow } = this.props;
    const { icon, flip } = this.state;
    if (visible) {
      return (
        <Container>
          <Spinner
            text={
              <FontAwesomeIcon icon={icon} size="3x" fixedWidth flip={flip} />
            }
            spinning={false}
            pulse="single"
            onPulseEnd={() => {
              onShow(false);
            }}
          />
        </Container>
      );
    }
    return <></>;
  };

  handlePlaying = (): void => {
    const { onShow, playing } = this.props;
    if (playing !== undefined) {
      onShow(false);
      this.setState(
        { icon: playing ? "play" : "pause", flip: undefined },
        () => {
          onShow(true);
        }
      );
    }
  };

  handleTime = (): void => {
    const { onShow, time } = this.props;
    if (time !== undefined) {
      onShow(false);
      this.setState(
        { icon: "redo", flip: time === "back" ? "horizontal" : undefined },
        () => {
          onShow(true);
        }
      );
    }
  };

  handleCaptions = (): void => {
    const { onShow, captions } = this.props;
    onShow(false);
    this.setState(
      {
        icon: captions ? "comment" : "comment-slash",
        flip: undefined,
      },
      () => {
        onShow(true);
      }
    );
  };

  handleVolume = (): void => {
    const { onShow, volume, muted } = this.props;
    onShow(false);
    this.setState(
      {
        icon: volumeFormat(volume, muted),
        flip: undefined,
      },
      () => {
        onShow(true);
      }
    );
  };

  handleAudio = (): void => {
    const { onShow, audio } = this.props;
    onShow(false);
    this.setState(
      {
        icon: audio ? "microphone" : "microphone-slash",
        flip: undefined,
      },
      () => {
        onShow(true);
      }
    );
  };

  handleVideo = (): void => {
    const { onShow, video } = this.props;
    onShow(false);
    this.setState(
      {
        icon: video ? "video" : "video-slash",
        flip: undefined,
      },
      () => {
        onShow(true);
      }
    );
  };
}

export default Indicator;
