import React from "react";
import GridLayout from "react-grid-layout";
import { Container } from "./styles";
import { State, Props } from "./types";
import { defaultState } from "./defaults";

class GridSquare extends React.Component<Props, State> {
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = defaultState;
  }

  componentDidMount = (): void => {
    this.setState({ columns: this.columns, maxRows: this.maxRows });
    window.addEventListener("resize", this.handleResize);
  };

  componentDidUpdate = (prevProps: Props): void => {
    const { gutterSize, minWidth } = this.props;
    if (
      prevProps.gutterSize !== gutterSize ||
      prevProps.minWidth !== minWidth
    ) {
      this.handleResize();
    }
  };

  componentWillUnmount = (): void => {
    window.removeEventListener("resize", this.handleResize);
  };

  get containerDimensions(): { width: number; height: number } {
    const container = this.containerRef.current;
    if (container) {
      return { width: container.offsetWidth, height: container.offsetHeight };
    }
    return { width: 0, height: 0 };
  }

  get columns(): number {
    const { minWidth } = this.props;
    return Math.floor(this.containerDimensions.width / minWidth) - 1;
  }

  get rowHeight(): number {
    const { gutterSize } = this.props;
    return (
      (this.containerDimensions.width - (this.columns + 1) * gutterSize) /
      this.columns
    );
  }

  get maxRows(): number {
    const { gutterSize } = this.props;
    const guess = Math.floor(this.containerDimensions.height / this.rowHeight);
    if (
      guess * this.rowHeight + (guess + 1) * gutterSize >
      this.containerDimensions.height
    ) {
      return guess - 1;
    }
    return guess;
  }

  render = (): JSX.Element => {
    const { layout, children, gutterSize } = this.props;
    const { columns, maxRows } = this.state;
    return (
      <Container ref={this.containerRef}>
        <GridLayout
          cols={columns}
          width={this.containerDimensions.width}
          rowHeight={this.rowHeight}
          maxRows={maxRows}
          compactType={null}
          preventCollision
          layout={layout}
          margin={[gutterSize, gutterSize]}
        >
          {children}
        </GridLayout>
      </Container>
    );
  };

  handleResize = (): void => {
    this.setState({ columns: this.columns, maxRows: this.maxRows });
  };
}

export default GridSquare;
