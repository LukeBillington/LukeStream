import { ColorPairEnum } from "../../theme/types";

export interface ColorSelectorProps {
  color: keyof typeof ColorPairEnum;
}

export interface VideoPreviewProps {
  speaking: boolean;
}
