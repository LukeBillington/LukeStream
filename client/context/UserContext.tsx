import React, { createContext } from "react";
import { ColorPairEnum } from "../../theme/types";
import { enumStrings, randomArrayItem } from "../util";

enum AvatarEnum {
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

interface State {
  name: string;
  setName: (nameValue: string) => void;
  color: keyof typeof ColorPairEnum;
  setColor: (colorValue: keyof typeof ColorPairEnum) => void;
  avatar: keyof typeof AvatarEnum;
  setAvatar: (avatarValue: keyof typeof AvatarEnum) => void;
}

const colorKeys = enumStrings(
  Object.keys(ColorPairEnum)
) as (keyof typeof ColorPairEnum)[];
const avatarKeys = enumStrings(
  Object.keys(AvatarEnum)
) as (keyof typeof AvatarEnum)[];

const defaultState: State = {
  name: "",
  setName: () => undefined,
  color: randomArrayItem(colorKeys),
  setColor: () => undefined,
  avatar: randomArrayItem(avatarKeys),
  setAvatar: () => undefined,
};

const { Provider, Consumer } = createContext(defaultState);

class UserContextProvider extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      ...defaultState,
      setName: this.handleSetName,
      setColor: this.handleSetColor,
      setAvatar: this.handleSetAvatar,
    };
  }

  componentDidMount = (): void => {
    this.setState({
      name: this.fetchName(),
      color: this.fetchColor(),
      avatar: this.fetchAvatar(),
    });
  };

  render = (): JSX.Element => {
    const { children } = this.props;
    return <Provider value={{ ...this.state }}>{children}</Provider>;
  };

  handleSetName = (nameValue: string): void => {
    localStorage.setItem("user.name", nameValue);
    this.setState({ name: nameValue });
  };

  handleSetColor = (colorValue: keyof typeof ColorPairEnum): void => {
    localStorage.setItem("user.color", colorValue);
    this.setState({ color: colorValue });
  };

  handleSetAvatar = (avatarValue: keyof typeof AvatarEnum): void => {
    localStorage.setItem("user.avatar", avatarValue);
    this.setState({ avatar: avatarValue });
  };

  private fetchName = (): string => {
    return localStorage.getItem("user.name") || "";
  };

  private fetchColor = (): keyof typeof ColorPairEnum => {
    const colorValue = localStorage.getItem("user.color");
    if (colorValue) {
      return colorKeys.find((key) => key === colorValue) || defaultState.color;
    }
    return defaultState.color;
  };

  private fetchAvatar = (): keyof typeof AvatarEnum => {
    const avatarValue = localStorage.getItem("user.avatar");
    if (avatarValue) {
      return (
        avatarKeys.find((key) => key === avatarValue) || defaultState.avatar
      );
    }
    return defaultState.avatar;
  };
}

export { Consumer, UserContextProvider as Provider };
