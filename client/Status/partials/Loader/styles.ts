import styled, { css } from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(0.5rem);
  background: linear-gradient(
    to bottom,
    rgba(38, 50, 56, 0.75) 0%,
    rgba(38, 50, 56, 0.5) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: opacity 0.5s;
  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
    `;
  }}
`;
