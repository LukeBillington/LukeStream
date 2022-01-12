import React from "react";
import { RoomContext, PlayerContext } from "../../../context";
import { Container } from "./styles";
import { Props } from "./types";
import Spinner from "../../../components/Spinner";

class Loader extends React.Component<Props, unknown> {
  render = (): JSX.Element => {
    const { indicator } = this.props;
    return (
      <RoomContext.Consumer>
        {({ connected }) => {
          return (
            <PlayerContext.Consumer>
              {({ buffering, waiting }) => {
                let text: string | undefined;
                if (waiting) {
                  text = "Waiting";
                } else if (buffering) {
                  text = undefined;
                } else if (!connected) {
                  text = "Connecting";
                }
                return (
                  <Container
                    visible={(buffering || !connected || waiting) && !indicator}
                  >
                    <Spinner
                      text={text}
                      pulse={!connected ? "continuous" : "none"}
                    />
                  </Container>
                );
              }}
            </PlayerContext.Consumer>
          );
        }}
      </RoomContext.Consumer>
    );
  };
}

export default Loader;
