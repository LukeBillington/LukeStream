import React from "react";
import { Loader, Indicator } from "./partials";
import { State } from "./types";
import { PeersContext, PlayerContext } from "../context";
import { defaultState } from "./defaults";

class Status extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = defaultState;
  }

  render = (): JSX.Element => {
    const { indicator } = this.state;
    return (
      <PeersContext.Consumer>
        {({ audio, video }) => {
          return (
            <PlayerContext.Consumer>
              {({
                indicatorPlaying,
                indicatorTime,
                captions,
                volume,
                muted,
              }) => {
                return (
                  <>
                    <Loader indicator={indicator} />
                    <Indicator
                      visible={indicator}
                      onShow={this.handleShowIndicator}
                      playing={indicatorPlaying}
                      time={indicatorTime}
                      captions={captions}
                      volume={volume}
                      muted={muted}
                      audio={audio}
                      video={video}
                    />
                  </>
                );
              }}
            </PlayerContext.Consumer>
          );
        }}
      </PeersContext.Consumer>
    );
  };

  handleShowIndicator = (visible: boolean): void => {
    this.setState({ indicator: visible });
  };
}

export default Status;
