export interface DefaultProps {
  host: boolean;
}

export interface Props extends Partial<DefaultProps> {
  stream: MediaStream;
}

export interface State {
  fullScreen: boolean;
}

export interface InteractiveProps {
  showCursor: boolean;
}
