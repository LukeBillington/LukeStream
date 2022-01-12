import Color from "color";
import styled, { keyframes, css, Keyframes } from "styled-components";
import { SpinnerPlaceholderProps, SpinnerProps } from "./types";

export const beacon = (color: Color): Keyframes => keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color.fade(0.7).string()};
  }

  35% {
    box-shadow: 0 0 0 5rem ${color.fade(1).string()};
  }
`;

export const singlePulse = keyframes`
0% {
  transform: scale(0.9);
  opacity: 1;
}

70% {
  transform: scale(1.5);
  opacity: 0;
}
`;

export const pulse = keyframes`
  0% {
    transform: scale(0.9);
  }

  70% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.9);
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerPlaceholder = styled.div<SpinnerPlaceholderProps>`
  position: relative;
  width: 7rem;
  height: 7rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 5px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 200;
  box-sizing: border-box;
  text-transform: uppercase;
  font-size: 0.7rem;

  ${(props) => {
    if (props.pulse === "single") {
      return css`
        opacity: 0;
        animation: ${singlePulse} 1s linear;
      `;
    }

    if (props.pulse === "continuous") {
      return css`
        animation: ${pulse} 2s linear infinite;

        &::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50%;
          animation: ${beacon(props.theme.colorPairs[props.color].i)} 4s linear
            infinite;
        }

        &::after {
          content: "";
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50%;
          animation: ${beacon(props.theme.colorPairs[props.color].f)} 4s linear
            infinite;
          animation-delay: 2s;
        }
      `;
    }

    return null;
  }}
`;

export const spinnerBase = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  opacity: 0.5;
`;

export const SpinnerA = styled.div<SpinnerProps>`
  ${spinnerBase}
  border-right: 5px solid transparent;
  ${(props) => {
    return css`
      border-top: 5px solid ${props.theme.colorPairs[props.color].i.string()};
    `;
  }}
`;

export const SpinnerB = styled.div<SpinnerProps>`
  ${spinnerBase}
  border-left: 5px solid transparent;
  ${(props) => {
    return css`
      border-bottom: 5px solid ${props.theme.colorPairs[props.color].f.string()};
    `;
  }}
`;
