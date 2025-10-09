"use client";

import React from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@/styles/globals";
import aulaGenTheme from "@/styles/themes";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={aulaGenTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;