import React from "react";
import { Props } from "./types";
import { defaultProps } from "./defaults";
import { SpinnerPlaceholder, SpinnerA, SpinnerB } from "./styles";

class Spinner extends React.Component<Props, unknown> {
  static defaultProps = defaultProps;

  render = (): JSX.Element => {
    const { text, color, pulse, spinning } = this.props;
    return (
      <SpinnerPlaceholder
        color={color}
        pulse={pulse}
        onAnimationEnd={this.handlePulseEnd}
      >
        <span>{text}</span>
        {spinning && (
          <>
            <SpinnerA color={color} />
            <SpinnerB color={color} />
          </>
        )}
      </SpinnerPlaceholder>
    );
  };

  handlePulseEnd = (): void => {
    const { onPulseEnd } = this.props;
    if (onPulseEnd) {
      onPulseEnd();
    }
  };
}

export default Spinner;
