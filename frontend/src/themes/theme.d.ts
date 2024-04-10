// Update the Typography's variant prop options

import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    mode: PaletteMode;
    primary: {
      main: string;
      light: string;
      dark: string;
      // darker: primary[600],
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    success: {
      main: string;
      light: string;
    };
    warning: {
      main: string;
      light: string;
    };
    error: {
      main: string;
      light: string;
    };
  }
}
export default function createTheme(options?: CustomThemeOptions): Theme;
