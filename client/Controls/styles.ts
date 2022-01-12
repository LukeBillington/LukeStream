import styled, { css } from "styled-components";
import { ContainerProps, VolumeContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 5rem;
  grid-template-rows: auto;
  grid-template-areas:
    "elapsedTime scrubber scrubber scrubber remainingTime"
    "toolbarLeft toolbarLeft brand toolbarRight toolbarRight";
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  backdrop-filter: blur(0.5rem);
  background: linear-gradient(
    to bottom,
    rgba(38, 50, 56, 1) 0%,
    rgba(38, 50, 56, 0.75) 100%
  );
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  user-select: none;
  transition: opacity 0.5s;
  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
    `;
  }}
`;

export const TimeBox = styled.div`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 200;
`;

export const ElapsedTime = styled(TimeBox)`
  grid-area: elapsedTime;
`;

export const RemainingTime = styled(TimeBox)`
  grid-area: remainingTime;
`;

export const TimeContainer = styled.div`
  grid-area: scrubber;
  display: flex;
  align-items: center;
`;

export const ToolbarLeft = styled.div`
  grid-area: toolbarLeft;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > * {
    margin-right: 1rem;
  }
`;

export const Brand = styled.div`
  grid-area: brand;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.25);
  text-transform: uppercase;
  font-size: 1.5rem;
  font-family: interstate-condensed, sans-serif;
  font-weight: 700;
  font-style: normal;
`;

export const ToolbarRight = styled.div`
  grid-area: toolbarRight;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > * {
    margin-left: 1rem;
  }
`;

export const Button = styled.button`
  border: none;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  text-align: center;
  background: transparent;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: interstate, sans-serif;
  font-weight: 400;
  font-style: normal;
  &:hover {
    color: #ffffff;
  }

  &:focus {
    outline: 0;
  }
`;

export const Title = styled.span`
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  font-weight: 700;
`;

export const Year = styled.span`
  color: rgba(255, 255, 255, 0.25);
  font-weight: 200;
`;

export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const VolumeContainer = styled.div<VolumeContainerProps>`
  transition: width 0.5s, margin 0.5s, opacity 0.5s;
  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
      width: ${props.visible ? "7rem" : 0};
      margin-right: ${props.visible ? "1rem" : 0};
    `;
  }};
  height: 100%;
`;
