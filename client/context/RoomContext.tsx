import React, { createContext } from "react";
import socket from "../socket";

interface State {
  connected: boolean;
}

const defaultState: State = {
  connected: false,
};

const { Provider, Consumer } = createContext(defaultState);

class RoomContextProvider extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      ...defaultState,
    };
  }

  componentDidMount = (): void => {
    socket.emit("PING");
    socket.on("PONG", this.receiveConnected);
    socket.on("reconnecting", this.receiveReconnecting);
    socket.on("reconnect", this.receiveReconnect);
  };

  render = (): JSX.Element => {
    const { children } = this.props;
    return <Provider value={{ ...this.state }}>{children}</Provider>;
  };

  private receiveConnected = () => {
    this.setState({ connected: true });
  };

  private receiveReconnecting = () => {
    this.setState({ connected: false });
  };

  private receiveReconnect = () => {
    this.setState({ connected: true });
  };
}

export { Consumer, RoomContextProvider as Provider };
