import React from "react";
import Box from "../../Box";
import { Container } from "../../styles";
import { Props, State } from "./types";
import { defaultState } from "./defaults";
import { UserContext, PeersContext } from "../../../../context";

class SelfBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultState;
  }

  render = (): JSX.Element => {
    const { stream, size } = this.props;
    const { mouseOver } = this.state;
    return (
      <UserContext.Consumer>
        {({ name, color, avatar }) => {
          return (
            <PeersContext.Consumer>
              {({ audio, setAudio, video, setVideo }) => {
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
                    <Box
                      user={{ name, color, avatar }}
                      stream={stream}
                      audio={audio}
                      onAudio={setAudio}
                      video={video}
                      onVideo={setVideo}
                      self
                      mouseOver={mouseOver}
                      size={size}
                    />
                  </Container>
                );
              }}
            </PeersContext.Consumer>
          );
        }}
      </UserContext.Consumer>
    );
  };
}

export default SelfBox;
