import React from "react";
import { Props } from "./types";
import { VideoWrapper, VideoPlayer } from "./styles";
import { defaultProps } from "./defaults";

class Video extends React.Component<Props, unknown> {
  static defaultProps = defaultProps;

  videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount = (): void => {
    const { stream } = this.props;
    if (this.videoRef.current) {
      this.videoRef.current.srcObject = stream;
    }
  };

  render = (): JSX.Element => {
    const { muted } = this.props;
    return (
      <VideoWrapper>
        <VideoPlayer ref={this.videoRef} autoPlay muted={muted} />
      </VideoWrapper>
    );
  };
}

export default Video;
