"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3OnboardProvider } from "@web3-onboard/react";
import web3Onboard from "./web3-onboard";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { themeColor } from "@/constants";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: themeColor.primary,
    },
    secondary: {
      main: themeColor.secondary,
    },
    text: {
      primary: themeColor.textPrimary,
      secondary: themeColor.textSecondary,
    },
    background: {
      default: themeColor.background,
      paper: themeColor.backgroundLight,
    },
  },
});

export function Provider({
  children,
}: {
  children: React.ReactElement | React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <QueryClientProvider client={queryClient}>
          <StyledThemeProvider theme={themeColor}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
          </StyledThemeProvider>
        </QueryClientProvider>
      </Web3OnboardProvider>
    </StyledComponentsRegistry>
  );
}

function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
