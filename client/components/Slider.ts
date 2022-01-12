import styled, { css } from "styled-components";
import { ColorPairEnum } from "../../theme/types";

interface SliderProps {
  color?: keyof typeof ColorPairEnum;
}

/* stylelint-disable property-no-vendor-prefix */
export default styled.input<SliderProps>`
  -webkit-appearance: none;
  background: transparent;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    top: -0.25rem;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 1);
    ${(props) => {
      return css`
        background: linear-gradient(
          180deg,
          ${props.theme.colorPairs[props.color || "orange-pink"].i.string()} 0%,
          ${props.theme.colorPairs[props.color || "orange-pink"].f.string()}
            100%
        );
      `;
    }};
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
    ${(props) => {
      return css`
        background: linear-gradient(
          135deg,
          ${props.theme.colorPairs[props.color || "orange-pink"].i.string()} 0%,
          ${props.theme.colorPairs[props.color || "orange-pink"].f.string()}
            100%
        );
      `;
    }};
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`;
/* stylelint-enable property-no-vendor-prefix */
