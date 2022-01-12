import styled from "styled-components";

export const VideoWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background-clip: padding-box;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;
