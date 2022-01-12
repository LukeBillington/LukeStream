/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import Head from "next/head";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faPlay,
  faPause,
  faComment,
  faCommentSlash,
  faVolumeSlash,
  faVolumeOff,
  faVolumeDown,
  faVolume,
  faVolumeUp,
  faExpandAlt,
  faCompressAlt,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faArrowCircleLeft,
  faArrowCircleRight,
  faRedo,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faHeadphones,
  faWebcam,
  faSignalStream,
  faPopcorn,
  faTabletAlt,
  faUserVisor,
  faUserTie,
  faUserSecret,
  faUserRobot,
  faUserNinja,
  faUserHeadset,
  faUserCrown,
  faUserCowboy,
  faUserAstronaut,
  faUserAlien,
  faUserMd,
  faSquirrel,
  faNarwhal,
  faMonkey,
  faDog,
  faCatSpace,
  faPegasus,
  faKiwiBird,
  faDragon,
  faExclamationTriangle,
  faShieldAlt,
  faCheckCircle,
} from "@fortawesome/pro-duotone-svg-icons";
import Theme, { GlobalStyle } from "../theme";

function MyApp({ Component, pageProps }: any): any {
  config.autoAddCss = false;
  library.add(
    faPlay,
    faPause,
    faComment,
    faCommentSlash,
    faVolumeSlash,
    faVolumeOff,
    faVolumeDown,
    faVolume,
    faVolumeUp,
    faExpandAlt,
    faCompressAlt,
    faMicrophone,
    faMicrophoneSlash,
    faVideo,
    faVideoSlash,
    faHeadphones,
    faWebcam,
    faSignalStream,
    faPopcorn,
    faTabletAlt,
    faArrowCircleLeft,
    faArrowCircleRight,
    faUserVisor,
    faUserTie,
    faUserSecret,
    faUserRobot,
    faUserNinja,
    faUserHeadset,
    faUserCrown,
    faUserCowboy,
    faUserAstronaut,
    faUserAlien,
    faUserMd,
    faSquirrel,
    faNarwhal,
    faMonkey,
    faDog,
    faCatSpace,
    faPegasus,
    faKiwiBird,
    faDragon,
    faShieldAlt,
    faExclamationTriangle,
    faCheckCircle,
    faRedo
  );

  return (
    <>
      <Head>
        <title>LukeStream</title>
        <link rel="stylesheet" href="https://use.typekit.net/qvx0ief.css" />
      </Head>
      <GlobalStyle />
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}

export default MyApp;
