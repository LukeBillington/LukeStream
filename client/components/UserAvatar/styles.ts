import styled, { css } from "styled-components";
import { AvatarProps } from "./types";

/* stylelint-disable property-no-vendor-prefix */
export const Avatar = styled.div<AvatarProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
  ${(props) => {
    return css`
      width: ${props.size === "small" ? 4 : 7}rem;
      height: ${props.size === "small" ? 4 : 7}rem;
      border-radius: ${props.size === "small" ? 4 : 7}rem;
      border: ${props.size === "small" ? 0.15 : 0.25}rem solid #ffffff;
      background: linear-gradient(
        135deg,
        ${props.theme.colorPairs[props.color].i.string()} 0%,
        ${props.theme.colorPairs[props.color].f.string()} 100%
      );
    `;
  }}

  & > div {
    color: black;
    background-color: white;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-style: normal;
    ${(props) => {
      return css`
        top: ${props.size === "small" ? 3.25 : 5.5}rem;
        min-width: ${props.size === "small" ? 4 : 7}rem;
        padding: ${props.size === "small" ? 0.1 : 0.3}rem;
        border-radius: ${props.size === "small" ? 1 : 1}rem;
        font-size: ${props.size === "small" ? 0.5 : 1}rem;
      `;
    }}

    & > span {
      ${(props) => {
        return css`
          background: linear-gradient(
            135deg,
            ${props.theme.colorPairs[props.color].i.string()} 0%,
            ${props.theme.colorPairs[props.color].f.string()} 100%
          );
        `;
      }} -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
/* stylelint-enable property-no-vendor-prefix */
