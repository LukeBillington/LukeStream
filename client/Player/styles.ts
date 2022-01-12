import styled from "styled-components";

export const VideoWrapper = styled.div`
  position: relative;
  background-color: black;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

/* stylelint-disable selector-pseudo-element-no-unknown */
export const VideoPlayer = styled.video`
  width: 100vw;

  &::cue {
    color: white;
    font-size: 2rem;
    font-family: interstate, sans-serif;
    font-weight: 700;
    font-style: normal;
    text-transform: uppercase;
  }
`;
/* stylelint-enable selector-pseudo-element-no-unknown */
