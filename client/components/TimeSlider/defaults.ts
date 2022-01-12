import { DefaultProps, State } from "./types";

export const defaultProps: Required<DefaultProps> = {
  min: 0,
  max: 0,
  value: 0,
};

export const defaultState: State = {
  seconds: 0,
  secondsPreview: 0,
  mouseOver: false,
  scrubbing: "none",
};
