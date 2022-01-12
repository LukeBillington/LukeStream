import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Table, Divider, ButtonContainer, Button } from "./styles";

interface Props {
  onContinue: () => void;
}

const Intro = (props: Props): JSX.Element => {
  const { onContinue } = props;
  return (
    <>
      <Text>You&apos;ll want to have these things handy to start:</Text>
      <Table>
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon
                icon={["fad", "headphones"]}
                fixedWidth
                size="4x"
              />
            </td>
            <td>
              <strong>Headphones</strong>
              <small>
                Using headphones will reduce the feedback and echo for others as
                well as improve the experience for yourself.
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={["fad", "webcam"]} fixedWidth size="4x" />
            </td>
            <td>
              <strong>Webcam & Microphone</strong>
              <small>
                Make sure your device has a microphone and camera, or that they
                are connected. You can join without sharing or stop sharing
                video and audio at any time.
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon
                icon={["fad", "signal-stream"]}
                fixedWidth
                size="4x"
              />
            </td>
            <td>
              <strong>Strong Connection</strong>
              <small>
                Watch With Friends uses significant data, and when your
                connection stalls, it pauses the video for everyone. Avoid using
                cellular data.
              </small>
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={["fad", "popcorn"]} fixedWidth size="4x" />
            </td>
            <td>
              <strong>Snacks</strong>
              <small>What&apos;s a good movie without popcorn?</small>
            </td>
          </tr>
        </tbody>
      </Table>
      <Divider />
      <Table>
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon
                icon={["fad", "tablet-alt"]}
                fixedWidth
                size="4x"
              />
            </td>
            <td>
              <strong>iPad Users</strong>
              <small>
                Some features, such as adjusting individual volumes are not
                supported by iPadOS. Also, by default your device automatically
                ducks your audio when your Microphone is in use. You can disable
                this in Settings {">"} Accessibility {">"} VoiceOver {">"}{" "}
                Audio, and disabling Audio Ducking.
              </small>
            </td>
          </tr>
        </tbody>
      </Table>
      <Divider />
      <ButtonContainer>
        <Button onClick={onContinue}>
          <span>
            Get Started <FontAwesomeIcon icon="arrow-circle-right" fixedWidth />
          </span>
        </Button>
      </ButtonContainer>
    </>
  );
};

export default Intro;
