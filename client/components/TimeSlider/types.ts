export interface DefaultProps {
  min: number;
  max: number;
  value: number;
}

export interface Props extends Required<DefaultProps> {
  onChange?: (value: number) => void;
  thumbs?: string;
}

export interface State {
  seconds: number;
  secondsPreview: number;
  mouseOver: boolean;
  scrubbing: "none" | "mouseover" | "drag";
}

export interface PlayheadWrapperProps {
  visible: boolean;
}
