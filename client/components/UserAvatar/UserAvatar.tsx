import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "./styles";
import { Props } from "./types";
import { defaultProps } from "./defaults";

class UserAvatar extends React.Component<Props, unknown> {
  static defaultProps = defaultProps;

  render = (): JSX.Element => {
    const { name, avatar, color, size } = this.props;
    return (
      <Avatar color={color} size={size}>
        <FontAwesomeIcon
          icon={["fad", avatar]}
          fixedWidth
          size={size === "small" ? "3x" : "5x"}
        />
        <div>
          <span>{name}</span>
        </div>
      </Avatar>
    );
  };
}

export default UserAvatar;
