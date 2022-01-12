import Color from "color";
import { DefaultTheme } from "styled-components";
import { ColorPairEnum, ColorPair } from "./types";

const colorPairs: Record<keyof typeof ColorPairEnum, ColorPair> = {
  "orange-pink": {
    i: Color("#FF512F"),
    f: Color("#DD2476"),
  },
  "yellow-orange": {
    i: Color("#F7B733"),
    f: Color("#FC4A1A"),
  },
  "green-blue": {
    i: Color("#43CEA2"),
    f: Color("#185A9D"),
  },
  "blue-indigo": {
    i: Color("#00C6FF"),
    f: Color("#0072FF"),
  },
  "violet-blue": {
    i: Color("#8E2DE2"),
    f: Color("#4A00E0"),
  },
};

const theme: DefaultTheme = {
  colorPairs,
};

export default theme;
