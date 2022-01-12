import styled, { css } from "styled-components";

export const Container = styled.div`
  backdrop-filter: blur(0.5rem);
  background: linear-gradient(
    to bottom,
    rgba(38, 50, 56, 1) 0%,
    rgba(38, 50, 56, 0.75) 100%
  );
  border-radius: 0.5rem;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  user-select: none;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

interface ContentProps {
  visible: boolean;
  speaking: boolean;
  size: number;
}

export const Content = styled.div<ContentProps>`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas:
    "avatar"
    "audio"
    "toolbar";
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: opacity 0.5s, border-color 0.5s;
  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
      border: 0.25rem solid rgba(255, 255, 255, ${props.speaking ? 0.3 : 0});
      grid-template-rows: 50% ${props.size >= 180 ? 2 : 0}rem 1fr;
    `;
  }}
`;

interface OverlayProps {
  visible: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 0.5rem;
  background: linear-gradient(
    to bottom,
    rgba(38, 50, 56, 1) 0%,
    rgba(38, 50, 56, 0.75) 100%
  );
  transition: opacity 0.5s;

  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
      backdrop-filter: blur(${props.visible ? 0.5 : 0}rem);
    `;
  }};
`;

export const Avatar = styled.div`
  grid-area: avatar;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Audio = styled.div`
  grid-area: audio;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 200;
  box-sizing: border-box;
  text-transform: uppercase;
`;

interface VideoProps {
  visible: boolean;
  speaking: boolean;
}

export const Video = styled.video<VideoProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s, border-color 0.5s;
  border-radius: 0.5rem;
  box-sizing: border-box;

  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
      border: 0.25rem solid rgba(255, 255, 255, ${props.speaking ? 0.3 : 0});
    `;
  }}
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

interface ToolbarProps {
  visible: boolean;
}

export const Toolbar = styled.div<ToolbarProps>`
  grid-area: toolbar;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  transition: opacity 0.5s;
  cursor: default;

  ${(props) => {
    return css`
      opacity: ${props.visible ? 1 : 0};
    `;
  }}
`;
