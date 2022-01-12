import { User } from "../../types";

export interface Props {
  user: User;
  stream: MediaStream;
  audio: boolean;
  onAudio?: (audio: boolean) => void;
  video: boolean;
  onVideo?: (video: boolean) => void;
  self: boolean;
  mouseOver: boolean;
  size: number;
}

export interface State {
  volume: number;
  speaking: boolean;
}
