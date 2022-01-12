import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Divider,
  ButtonContainer,
  Button,
  Name,
  Label,
  AvatarSelector,
  LeftCell,
  RightCell,
  AvatarCell,
  ColorCell,
  ColorSelector,
} from "./styles";
import { ColorPairEnum } from "../../theme/types";
import { UserContext } from "../context";
import UserAvatar from "../components/UserAvatar";
import { enumStrings } from "../util";
import { AvatarEnum } from "../components/UserAvatar/types";

const colorKeys = enumStrings(
  Object.keys(ColorPairEnum)
) as (keyof typeof ColorPairEnum)[];

const avatarKeys = enumStrings(
  Object.keys(AvatarEnum)
) as (keyof typeof AvatarEnum)[];

interface Props {
  onContinue: () => void;
}

class Nametag extends React.Component<Props, unknown> {
  render = (): JSX.Element => {
    const { onContinue } = this.props;
    return (
      <UserContext.Consumer>
        {({ name, setName, color, setColor, avatar, setAvatar }) => {
          const handleSetName = (evt: ChangeEvent<HTMLInputElement>) => {
            setName(evt.currentTarget.value);
          };

          const handleSetPreviousAvatar = () => {
            const avatarValue = avatarKeys.indexOf(avatar);
            if (avatarValue - 1 < 0) {
              setAvatar(avatarKeys[avatarKeys.length - 1]);
            } else {
              setAvatar(avatarKeys[avatarValue - 1]);
            }
          };

          const handleSetNextAvatar = () => {
            const avatarValue = avatarKeys.indexOf(avatar);
            if (avatarValue + 1 >= avatarKeys.length) {
              setAvatar(avatarKeys[0]);
            } else {
              setAvatar(avatarKeys[avatarValue + 1]);
            }
          };

          return (
            <>
              <Label>
                <span>My name is:</span>
                <Name
                  type="text"
                  autoFocus
                  maxLength={16}
                  value={name}
                  onChange={handleSetName}
                />
              </Label>
              <Divider />
              <AvatarSelector>
                <LeftCell>
                  <Button onClick={handleSetPreviousAvatar}>
                    <span>
                      <FontAwesomeIcon icon="arrow-circle-left" fixedWidth />
                    </span>
                  </Button>
                </LeftCell>
                <AvatarCell>
                  <UserAvatar
                    avatar={avatar}
                    color={color}
                    name={name}
                    size="normal"
                  />
                </AvatarCell>
                <RightCell>
                  <Button onClick={handleSetNextAvatar}>
                    <span>
                      <FontAwesomeIcon icon="arrow-circle-right" fixedWidth />
                    </span>
                  </Button>
                </RightCell>
                <ColorCell>
                  {colorKeys.map((key) => {
                    return (
                      <ColorSelector
                        key={key}
                        color={key}
                        onClick={() => setColor(key)}
                      />
                    );
                  })}
                </ColorCell>
              </AvatarSelector>
              <Divider />
              <ButtonContainer>
                <Button
                  disabled={name.length === 0}
                  onClick={() => {
                    onContinue();
                  }}
                >
                  <span>
                    Set Up Camera & Mic{" "}
                    <FontAwesomeIcon icon="arrow-circle-right" fixedWidth />
                  </span>
                </Button>
              </ButtonContainer>
            </>
          );
        }}
      </UserContext.Consumer>
    );
  };
}

export default Nametag;
