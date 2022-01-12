import styled, { css } from "styled-components";
import { ColorSelectorProps, VideoPreviewProps } from "./types";

export const Header = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  margin: 0;
  text-transform: uppercase;
  font-family: interstate-condensed, sans-serif;
  font-weight: 700;
  font-style: normal;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const Heading = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Tagline = styled.p`
  text-align: center;
  margin-top: 0;
  color: rgba(255, 255, 255, 0.5);
`;

export const Text = styled.p`
  color: rgba(255, 255, 255, 0.5);
`;

export const Content = styled.main`
  max-width: 60ch;
  margin-top: 3rem;
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Table = styled.table`
  & td {
    padding: 1rem;

    & strong {
      display: block;
      margin-bottom: 0.25rem;
      text-transform: uppercase;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.75);
    }

    & small {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  margin: 2rem 0;
`;

export const Label = styled.label`
  display: block;
  text-align: center;

  & > span {
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.75);
  }
`;

/* stylelint-disable property-no-vendor-prefix */
export const Button = styled.button`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  color: #ffffff;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-family: interstate, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-style: normal;
  font-size: 1.25rem;
  border-radius: 3rem;
  cursor: pointer;

  & span {
    color: #dd2476;
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover,
  &:active {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);

    & span {
      color: #ffffff;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
    }
  }
`;
/* stylelint-enable property-no-vendor-prefix */

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  *:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

/* stylelint-disable property-no-vendor-prefix */
export const Name = styled.input`
  font-size: 2rem;
  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 3rem;
  font-family: interstate, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-style: normal;

  &:focus {
    outline: none;
  }
`;
/* stylelint-enable property-no-vendor-prefix */

export const AvatarSelector = styled.div`
  display: grid;
  row-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "left avatar right"
    "left colors right";
`;

export const SelectorCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftCell = styled(SelectorCell)`
  grid-area: left;
`;

export const RightCell = styled(SelectorCell)`
  grid-area: right;
`;

export const AvatarCell = styled(SelectorCell)`
  grid-area: avatar;
`;

export const ColorCell = styled(SelectorCell)`
  grid-area: colors;
  justify-content: space-around;
`;

export const ColorSelector = styled.button<ColorSelectorProps>`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  ${(props) => {
    return css`
      background: linear-gradient(
        135deg,
        ${props.theme.colorPairs[props.color].i.string()} 0%,
        ${props.theme.colorPairs[props.color].f.string()} 100%
      );
    `;
  }};
`;

export const VideoPreview = styled.video<VideoPreviewProps>`
  width: 100%;
  border-radius: 1rem;
  box-sizing: border-box;
  transition: border-color 0.5s;

  ${(props) => {
    return css`
      border: 0.25rem solid rgba(255, 255, 255, ${props.speaking ? 0.75 : 0});
    `;
  }}
`;
