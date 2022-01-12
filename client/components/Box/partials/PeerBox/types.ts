import { Instance } from "simple-peer";
import { User } from "../../../../types";

export interface Props {
  user: User;
  connection: Instance;
  audio: boolean;
  video: boolean;
  size: number;
}

export interface State {
  mouseOver: boolean;
  stream?: MediaStream;
}
