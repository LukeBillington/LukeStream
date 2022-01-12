import { DefaultProps, State } from "./types";

export const defaultProps: Required<DefaultProps> = {
  visual: true,
  color: "orange-pink",
};

export const defaultState: State = {
  barData: new Uint8Array(),
  speaking: false,
  noContext: false,
};
