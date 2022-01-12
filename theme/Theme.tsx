import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import lukeflixTheme from "./lukeflix-theme";

interface Props {
  children: ReactNode;
}

const Theme: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <ThemeProvider theme={lukeflixTheme}>{children}</ThemeProvider>;
};

export default Theme;
