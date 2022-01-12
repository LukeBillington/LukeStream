import Color from "color";

export interface ColorPair {
  i: Color;
  f: Color;
}

export enum ColorPairEnum {
  "orange-pink",
  "yellow-orange",
  "green-blue",
  "blue-indigo",
  "violet-blue",
}

declare module "styled-components" {
  export interface DefaultTheme {
    colorPairs: Record<keyof typeof ColorPairEnum, ColorPair>;
  }
}
