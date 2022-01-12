import { ColorPairEnum } from "../../../theme/types";

export interface DefaultProps {
  visual: boolean;
  color: keyof typeof ColorPairEnum;
}

export interface Props extends Required<DefaultProps> {
  stream: MediaStream;
  onSpeak?: (speaking: boolean) => void;
}

export interface State {
  barData: Uint8Array;
  jsNode?: ScriptProcessorNode;
  speaking: boolean;
  noContext: boolean;
}
