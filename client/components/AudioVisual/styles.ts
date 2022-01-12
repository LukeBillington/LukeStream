import styled, { StyledComponent, DefaultTheme, css } from "styled-components";
import { ColorPairEnum } from "../../../theme/types";

export const Bars = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
`;

export const barTemplate = (
  height: number,
  color: keyof typeof ColorPairEnum
): StyledComponent<
  "div",
  DefaultTheme,
  {
    style: {
      height: string;
      opacity: number;
    };
  },
  "style"
> => styled.div.attrs(() => ({
  style: {
    height: `${height}rem`,
    opacity: height,
  },
}))`
  width: 0.5rem;
  border-radius: 1rem;
  height: 1rem;
  transition: opacity 0.1s, height 0.1s;
  ${(props) => {
    return css`
      background: linear-gradient(
        135deg,
        ${props.theme.colorPairs[color].i.string()} 0%,
        ${props.theme.colorPairs[color].f.string()} 100%
      );
    `;
  }};
`;
