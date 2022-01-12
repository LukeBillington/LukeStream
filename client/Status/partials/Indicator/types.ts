import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export interface Props {
  visible: boolean;
  onShow: (visible: boolean) => void;
  playing?: boolean;
  time?: "back" | "forward";
  captions: boolean;
  volume: number;
  muted: boolean;
  audio: boolean;
  video: boolean;
}

export interface State {
  icon: FontAwesomeIconProps["icon"];
  flip: FontAwesomeIconProps["flip"];
}
