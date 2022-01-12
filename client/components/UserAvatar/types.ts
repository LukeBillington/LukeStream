import { ColorPairEnum } from "../../../theme/types";

export enum AvatarEnum {
  "user-visor",
  "user-tie",
  "user-secret",
  "user-robot",
  "user-ninja",
  "user-headset",
  "user-crown",
  "user-cowboy",
  "user-astronaut",
  "user-alien",
  "user-md",
  "squirrel",
  "narwhal",
  "monkey",
  "dog",
  "cat-space",
  "pegasus",
  "kiwi-bird",
  "dragon",
}

export interface DefaultProps {
  size: "small" | "normal";
}

export interface Props extends Required<DefaultProps> {
  name: string;
  avatar: keyof typeof AvatarEnum;
  color: keyof typeof ColorPairEnum;
}

export interface AvatarProps {
  size: "small" | "normal";
  color: keyof typeof ColorPairEnum;
}
