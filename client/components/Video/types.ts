export interface DefaultProps {
  muted: boolean;
}

export interface Props extends Required<DefaultProps> {
  stream: MediaStream;
}
