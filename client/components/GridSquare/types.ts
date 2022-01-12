import { Layout } from "react-grid-layout";

export interface Props {
  minWidth: number;
  gutterSize: number;
  layout: Layout[];
}

export interface State {
  columns: number;
  maxRows: number;
}
