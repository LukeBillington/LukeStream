export interface Props {
  playerVolume: number;
  socketSetPlaying: (playingValue: boolean) => void;
  indicatorSetPlaying: (playingValue: boolean) => void;
  socketSetBuffering: (bufferingValue: boolean) => void;
  socketSetTime: () => void;
  indicatorSetTime: (timeValue: number) => void;
  onFullScreen?: (fullScreen: boolean) => void;
}
