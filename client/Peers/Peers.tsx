import React, { ReactNode } from "react";
import { Layout } from "react-grid-layout";
import { PeersContext } from "../context";
import { Chat, UserSquare } from "./styles";
import GridSquare from "../components/GridSquare";
import { PeerData } from "../context/PeersContext";
import { SelfBox, PeerBox } from "../components/Box";
import { between } from "../util";

interface State {
  boxSize: number;
}

const defaultState: State = {
  boxSize: 200,
};

class Peers extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount = (): void => {
    window.addEventListener("keydown", this.handleKeyDown);
  };

  componentWillUnmount = (): void => {
    window.removeEventListener("keydown", this.handleKeyDown);
  };

  render = (): JSX.Element => {
    const { boxSize } = this.state;
    return (
      <PeersContext.Consumer>
        {({ peers, stream }) => {
          return (
            <Chat>
              <GridSquare
                minWidth={boxSize}
                gutterSize={16}
                layout={this.renderLayout(peers, !!stream)}
              >
                {this.renderChat(peers, stream)}
              </GridSquare>
            </Chat>
          );
        }}
      </PeersContext.Consumer>
    );
  };

  renderLayout = (
    peers: Record<string, PeerData>,
    stream: boolean
  ): Layout[] => {
    const items: Layout[] = [];
    if (stream) {
      items.push({ i: "self", x: 0, y: 0, w: 1, h: 1, isDraggable: true });
    }
    Object.keys(peers).forEach((key, idx) => {
      items.push({
        i: key,
        x: (idx + 1) % 12,
        y: Math.floor((idx + 1) / 12),
        w: 1,
        h: 1,
        isDraggable: true,
      });
    });
    return items;
  };

  renderChat = (
    peers: Record<string, PeerData>,
    stream?: MediaStream
  ): React.ReactNode[] => {
    const { boxSize } = this.state;
    const items: ReactNode[] = [];
    if (stream) {
      items.push(
        <UserSquare key="self">
          <SelfBox stream={stream} size={boxSize} />
        </UserSquare>
      );
    }
    Object.keys(peers).forEach((key) => {
      const peer = peers[key];
      items.push(
        <UserSquare key={key}>
          <PeerBox
            user={peer.user}
            connection={peer.connection}
            audio={peer.audio}
            video={peer.video}
            size={boxSize}
          />
        </UserSquare>
      );
    });
    return items;
  };

  handleBoxSize = (boxSize: number): void => {
    this.setState({
      boxSize: between(boxSize, 140, 300),
    });
  };

  handleKeyDown = (evt: KeyboardEvent): void => {
    const { boxSize } = this.state;
    if (evt.keyCode === 189) {
      this.handleBoxSize(boxSize - 20);
    }
    if (evt.keyCode === 187) {
      this.handleBoxSize(boxSize + 20);
    }
  };
}

export default Peers;
