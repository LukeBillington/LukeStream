import styled, { css, StyledComponent, DefaultTheme } from "styled-components";
import { PlayheadWrapperProps } from "./types";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const PlayheadWrapper = styled.div<PlayheadWrapperProps>`
  position: relative;
  margin: 0 0.5rem;
  transition: opacity 0.5s;
  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
    `;
  }}
`;

export const playhead = (
  position: number
): StyledComponent<
  "div",
  DefaultTheme,
  {
    style: {
      left: string;
    };
  },
  "style"
> => styled.div.attrs(() => ({
  style: {
    left: `calc(${position}% - 4rem)`,
  },
}))`
  width: 8rem;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: calc(100% + 1.5rem);
  flex-direction: column;
  backdrop-filter: blur(0.5rem);
  background: linear-gradient(
    to bottom,
    rgba(38, 50, 56, 1) 0%,
    rgba(38, 50, 56, 0.75) 100%
  );
  border-radius: 0.5rem;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  transition: opacity 0.5s;
`;

export const Timecode = styled.span`
  text-align: center;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 200;
  position: relative;
`;

export const thumbnail = (
  url: string
): StyledComponent<
  "div",
  DefaultTheme,
  {
    style: {
      backgroundImage: string;
    };
  },
  "style"
> => styled.div.attrs(() => ({
  style: {
    backgroundImage: `url('${url}')`,
  },
}))`
  background-color: black;
  width: 8rem;
  height: 4.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background-size: cover;
`;
