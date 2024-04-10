"use client";

//import './globals.css'
import type { Metadata } from "next";

import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, themeDark } from "@/themes";
import { useEffect, useState } from "react";
import Banner from "@/themes/components/Banner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appTheme, setAppTheme] = useState(theme);

  useEffect(() => {
    setAppTheme(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themeDark
        : theme
    );
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,900&display=swap"
            rel="stylesheet"
          />
          <title>Fix a car</title>
          <meta property="og:title" content="My page title" key="title" />
        </head>
        <body className={""}>
          <Banner />

          <Container>{children}</Container>
        </body>
      </html>
    </ThemeProvider>
  );
}
