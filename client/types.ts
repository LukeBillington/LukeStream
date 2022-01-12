import { AvatarEnum } from "./components/UserAvatar/types";
import { ColorPairEnum } from "../theme/types";

export interface User {
  name: string;
  avatar: keyof typeof AvatarEnum;
  color: keyof typeof ColorPairEnum;
}

interface BaseConfig {
  port: number;
  
  certs: {
    key: string;
    cert: string;
    ca: string | null;
  };
  reverseProxy: string;
  movie: {
    movie: string;
    subtitles?: string;
    thumbs?: string;
    title: string;
    year?: number;
  };
}

export type Config = BaseConfig & unknown;
