import React from "react";
import { Header, Content, Heading, Tagline, Divider } from "./styles";
import Intro from "./Intro";
import Nametag from "./Nametag";
import Room from "../Room";
import Av from "./Av";
import { UserContext } from "../context";

interface State {
  intro: boolean;
  nametag: boolean;
  av: boolean;
  player: boolean;
  stream?: MediaStream;
}

const defaultState: State = {
  intro: true,
  nametag: false,
  av: false,
  player: false,
};

class Setup extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = defaultState;
  }

  render = (): JSX.Element => {
    const { intro, nametag, av, player, stream } = this.state;
    return (
      <UserContext.Provider>
        {(intro || nametag || av) && (
          <>
            <Header>Lukeflix</Header>
            <Content>
              <Heading>Watch With Friends</Heading>
              <Tagline>
                Watch movies and video chat real-time with your friends.
              </Tagline>
              <Divider />
              {intro && (
                <Intro
                  onContinue={() => {
                    this.setState({ intro: false, nametag: true });
                  }}
                />
              )}
              {nametag && (
                <Nametag
                  onContinue={() => {
                    this.setState({ nametag: false, av: true });
                  }}
                />
              )}
              {av && (
                <Av
                  onContinue={(s) => {
                    this.setState({ av: false, player: true, stream: s });
                  }}
                />
              )}
            </Content>
          </>
        )}
        {player && stream && <Room stream={stream} />}
      </UserContext.Provider>
    );
  };
}

export default Setup;
