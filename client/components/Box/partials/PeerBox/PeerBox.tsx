import React from "react";
import Box from "../../Box";
import { Container } from "../../styles";
import Spinner from "../../../Spinner";
import { Props, State } from "./types";
import { defaultState } from "./defaults";

class PeerBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount = (): void => {
    const { connection } = this.props;
    connection.on("stream", (stream: MediaStream) => {
      this.setState({ stream });
    });
  };

  render = (): JSX.Element => {
    const { user, audio, video, size } = this.props;
    const { stream, mouseOver } = this.state;
    return (
      <Container
        onClick={(evt) => {
          evt.stopPropagation();
        }}
        onMouseMove={() => {
          this.setState({ mouseOver: true });
        }}
        onMouseLeave={() => {
          this.setState({ mouseOver: false });
        }}
      >
        {!!stream && (
          <Box
            user={user}
            stream={stream}
            audio={audio}
            video={video}
            self={false}
            mouseOver={mouseOver}
            size={size}
          />
        )}
        {!stream && (
          <Spinner text="Connecting" color={user.color} pulse="continuous" />
        )}
      </Container>
    );
  };
}

export default PeerBox;
