export interface DefaultProps {
  fullScreen: boolean;
}

export interface Props extends Required<DefaultProps> {
  onFullScreen: (fullScreen: boolean) => void;
}

export interface State {
  showVolume: boolean;
}

export interface ContainerProps {
  visible: boolean;
}

export interface VolumeContainerProps {
  visible: boolean;
}
