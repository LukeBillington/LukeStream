import { ReactNode } from "react";
import { ColorPairEnum } from "../../../theme/types";

export interface DefaultProps {
  text: ReactNode;
  color: keyof typeof ColorPairEnum;
  pulse: "none" | "single" | "continuous";
  spinning: boolean;
}

export interface Props extends Required<DefaultProps> {
  onPulseEnd?: () => void;
}

export interface SpinnerPlaceholderProps {
  pulse: "none" | "single" | "continuous";
  color: keyof typeof ColorPairEnum;
}

export interface SpinnerProps {
  color: keyof typeof ColorPairEnum;
}
