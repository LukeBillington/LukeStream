import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Divider,
  ButtonContainer,
  Button,
  VideoPreview,
} from "./styles";
import AudioVisual from "../components/AudioVisual";

interface Props {
  onContinue: (stream: MediaStream) => void;
}

interface State {
  init: boolean;
  error: boolean;
  stream?: MediaStream;
  speaking: boolean;
}

const defaultState: State = {
  init: false,
  error: false,
  stream: undefined,
  speaking: false,
};

class Av extends React.Component<Props, State> {
  videoPlayer: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);
    this.videoPlayer = React.createRef();
    this.state = defaultState;
  }

  componentDidMount = (): void => {
    this.handleAv();
  };

  render = (): JSX.Element => {
    const { init, error, stream, speaking } = this.state;
    return (
      <>
        <Table>
          <tbody>
            {!error && !init && (
              <tr>
                <td>
                  <FontAwesomeIcon
                    icon={["fad", "shield-alt"]}
                    fixedWidth
                    size="4x"
                  />
                </td>
                <td>
                  <strong>Permissions</strong>
                  <small>
                    Right now, there is probably a pop-up asking for permission
                    to use your camera and microphone. Please click allow.
                    Others won&apos;t see or hear you yet.
                  </small>
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td>
                  <FontAwesomeIcon
                    icon={["fad", "exclamation-triangle"]}
                    fixedWidth
                    size="4x"
                  />
                </td>
                <td>
                  <strong>Oops!</strong>
                  <small>
                    It appears that the camera and microphone do not have
                    permissions. Try pressing retry and granting permission. You
                    may need to refresh the page or configure browser settings
                    if pressing retry does not work.
                  </small>
                </td>
              </tr>
            )}
            {init && (
              <tr>
                <td>
                  <FontAwesomeIcon
                    icon={["fad", "check-circle"]}
                    fixedWidth
                    size="4x"
                  />
                </td>
                <td>
                  <strong>Yay!</strong>
                  <small>
                    It seems like your camera and microphone are working. You
                    can double check them here. The camera and microphone use
                    your system settings. Feel free to make changes and press
                    retry to test any updated changes. Otherwise let&apos;s
                    start watching!
                  </small>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {!!stream && (
          <>
            <Divider />
            <VideoPreview
              autoPlay
              muted
              ref={this.videoPlayer}
              speaking={speaking}
            />
            <AudioVisual
              stream={stream}
              onSpeak={(s) => this.setState({ speaking: s })}
            />
          </>
        )}
        {(error || init) && (
          <>
            <Divider />
            <ButtonContainer>
              <Button
                onClick={() => {
                  this.handleAv();
                }}
              >
                <span>
                  Retry <FontAwesomeIcon icon="redo" fixedWidth />
                </span>
              </Button>
              {init && (
                <Button disabled={!stream} onClick={this.handleContinue}>
                  <span>
                    Start Watching{" "}
                    <FontAwesomeIcon icon="arrow-circle-right" fixedWidth />
                  </span>
                </Button>
              )}
            </ButtonContainer>
          </>
        )}
      </>
    );
  };

  handleAv = (): void => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        this.setState({ stream, init: true, error: false }, () => {
          const videoPlayer = this.videoPlayer.current;
          if (videoPlayer) {
            videoPlayer.srcObject = stream;
          }
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  handleContinue = (): void => {
    const { onContinue } = this.props;
    const { stream } = this.state;
    if (stream) {
      stream.getAudioTracks()[0].enabled = false;
      stream.getVideoTracks()[0].enabled = false;
      onContinue(stream);
    }
  };
}

export default Av;
