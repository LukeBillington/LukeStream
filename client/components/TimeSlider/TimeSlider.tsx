import React from "react";
import Slider from "../Slider";
import { timeFormat, thumbFormat, between } from "../../util";
import {
  thumbnail,
  playhead,
  PlayheadWrapper,
  Container,
  Timecode,
} from "./styles";
import { State, Props } from "./types";
import { defaultProps, defaultState } from "./defaults";

class TimeSlider extends React.Component<Props, State> {
  sliderRef: React.RefObject<HTMLInputElement>;

  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = defaultState;

    this.sliderRef = React.createRef();
  }

  componentDidUpdate = (prevProps: Props): void => {
    const { value } = this.props;
    const { scrubbing } = this.state;
    if (prevProps.value !== value && scrubbing === "none") {
      this.handleSeconds(value);
    }
  };

  get percent(): number {
    const { min, max } = this.props;
    const { secondsPreview } = this.state;
    return ((secondsPreview - min) * 100) / (max - min);
  }

  get thumbnail(): string {
    const { secondsPreview } = this.state;
    let frame = Math.floor(secondsPreview / 20) + 1;
    if (frame > this.lastFrame) {
      frame -= 1;
    }
    if (frame === 0) {
      frame = 1;
    }
    return thumbFormat(frame);
  }

  get lastFrame(): number {
    const { max } = this.props;
    return Math.floor(max / 20);
  }

  render = (): JSX.Element => {
    const { min, max, thumbs } = this.props;
    const { seconds, secondsPreview, mouseOver } = this.state;
    const Playhead = playhead(this.percent);
    const Thumbnail = thumbnail(`/static-proxy/${thumbs}/${this.thumbnail}`);
    return (
      <Container>
        <PlayheadWrapper visible={mouseOver}>
          <Playhead>
            {thumbs && <Thumbnail />}
            <Timecode>{timeFormat(secondsPreview)}</Timecode>
          </Playhead>
        </PlayheadWrapper>
        <Slider
          ref={this.sliderRef}
          type="range"
          min={min}
          max={max}
          value={seconds}
          onMouseMove={this.handleMouseOver(true)}
          onMouseOut={this.handleMouseOver(false)}
          onMouseUp={this.handleScrubEnd}
          onChange={this.handleScrub}
        />
      </Container>
    );
  };

  handleSeconds = (seconds: number): void => {
    this.setState({ seconds });
  };

  handleScrub = (): void => {
    const slider = this.sliderRef.current;
    if (slider) {
      const value = parseFloat(slider.value);
      this.setState({
        scrubbing: "drag",
        seconds: value,
        secondsPreview: value,
      });
    }
  };

  handleScrubEnd = (): void => {
    this.setState({ scrubbing: "none" }, () => {
      const { onChange } = this.props;
      const slider = this.sliderRef.current;
      if (slider && onChange) {
        onChange(parseFloat(slider.value));
      }
    });
  };

  handleMouseOver = (mouseOver: boolean) => (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    this.setState({ mouseOver });
    const slider = this.sliderRef.current;
    const { scrubbing } = this.state;
    if (slider && mouseOver && scrubbing !== "drag") {
      const { min, max } = this.props;
      const boxDimensions = slider.getBoundingClientRect();
      const mousePosition = evt.clientX - boxDimensions.left;
      const percent = mousePosition / boxDimensions.width;
      const seconds = between((max - min) * percent + min, min, max);
      this.setState({ scrubbing: "mouseover", secondsPreview: seconds });
    }

    if (!mouseOver && scrubbing !== "drag") {
      this.setState({ scrubbing: "none" });
    }
  };
}

export default TimeSlider;
