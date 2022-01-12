import React from "react";
import { average } from "../../util";
import { Props, State } from "./types";
import { defaultProps, defaultState } from "./defaults";
import { Bars, barTemplate } from "./styles";

class AudioVisual extends React.Component<Props, State> {
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = defaultState;
  }

  componentDidUpdate = (prevProps: Props, prevState: State): void => {
    const { onSpeak } = this.props;
    const { speaking } = this.state;
    if (onSpeak && prevState.speaking !== speaking) {
      onSpeak(speaking);
    }
  };

  componentDidMount = (): void => {
    const { stream } = this.props;

    try {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);

      const barAnalyser = context.createAnalyser();
      barAnalyser.smoothingTimeConstant = 0.5;
      barAnalyser.fftSize = 32;

      const speakingAnalyser = context.createAnalyser();
      speakingAnalyser.smoothingTimeConstant = 0.9;
      speakingAnalyser.fftSize = 32;

      const jsNode = context.createScriptProcessor(2048, 1, 1);
      jsNode.onaudioprocess = () => {
        const barData = new Uint8Array(barAnalyser.frequencyBinCount);
        barAnalyser.getByteFrequencyData(barData);

        const speakingData = new Uint8Array(speakingAnalyser.frequencyBinCount);
        speakingAnalyser.getByteFrequencyData(speakingData);

        const speaking =
          Math.floor((average(Array.from(speakingData)) / 256) * 100) >= 27;

        this.setState({ barData, speaking });
      };

      source.connect(barAnalyser);
      source.connect(speakingAnalyser);
      barAnalyser.connect(jsNode);
      speakingAnalyser.connect(jsNode);
      jsNode.connect(context.destination);

      this.setState({ jsNode });
    } catch (err) {
      this.setState({ noContext: true });
    }
  };

  componentWillUnmount = (): void => {
    const { jsNode } = this.state;
    if (jsNode) {
      jsNode.onaudioprocess = null;
      jsNode.disconnect();
    }
  };

  render = (): JSX.Element => {
    const { color, visual } = this.props;
    const { barData, noContext } = this.state;
    if (visual && !noContext) {
      const bars = Array.from(barData);
      const revBars = [...bars];
      revBars.reverse();
      return (
        <>
          <Bars>
            {[...revBars, ...bars].map((bar, idx) => {
              const Bar = barTemplate(bar / 256, color);
              // eslint-disable-next-line react/no-array-index-key
              return <Bar key={idx} />;
            })}
          </Bars>
        </>
      );
    }
    return <>Voice Connected</>;
  };
}

export default AudioVisual;
