import styled, { css } from "styled-components";
import { InteractiveProps } from "./types";

export const Interactive = styled.div<InteractiveProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => {
    return css`
      cursor: ${props.showCursor ? "default" : "none"};
    `;
  }}
`;
