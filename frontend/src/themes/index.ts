import {
  createTheme,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";
import {
  background,
  error,
  neutral,
  primary,
  success,
  warning,
} from "@/themes/colors";
import { PaletteMode } from "@mui/material";

const palette = {
  mode: "light" as PaletteMode,
  primary: {
    main: primary[400],
    light: primary[300],
    dark: primary[500],
  },
  secondary: {
    main: neutral[500],
    light: neutral[300],
    dark: neutral[600],
  },
  text: {
    primary: neutral[600],
    secondary: neutral[500],
    disabled: neutral[300],
  },
  success: {
    main: success.medium,
    light: success.light,
  },
  warning: {
    main: warning.medium,
    light: warning.light,
  },
  error: {
    main: error.medium,
    light: error.light,
  },
  background: {
    default: background["default"],
    paper: background.paper,
  },

  // grey: neutral[200],
  divider: neutral[300],
  action: {
    active: neutral[300],
    hover: neutral[300],
    // hoverOpacity: neutral[300],
    selected: neutral[300],
    // selectedOpacity: neutral[300],
    disabled: neutral[300],
    disabledOpacity: 1,
    disabledBackground: neutral[300],
    focus: neutral[300],
    focusOpacity: 0.4,
    activatedOpacity: 0.2,
  },
};

const paletteDark = {
  palette: {
    mode: "dark",
    primary: {
      main: primary[400],
      light: primary[300],
      dark: primary[500],
    },
    secondary: {
      main: neutral[500],
      light: neutral[300],
      dark: neutral[600],
    },
    text: {
      primary: neutral[100],
      secondary: neutral[500],
      disabled: neutral[300],
    },
    success: {
      main: success.medium,
      light: success.light,
    },
    warning: {
      main: warning.medium,
      light: warning.light,
    },
    error: {
      main: error.medium,
      light: error.light,
    },
    background: {
      default: neutral["600"],
      paper: neutral["600"],
    },

    // grey: neutral[200],
    divider: neutral[300],
    action: {
      active: neutral[200],
      hover: neutral[500],
      hoverOpacity: neutral[300],
      selected: neutral[300],
      // selectedOpacity: neutral[300],
      disabled: neutral[300],
      disabledOpacity: 1,
      disabledBackground: neutral[300],
      focus: neutral[300],
      focusOpacity: 0.3,
      activatedOpacity: 0.4,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "Poppins",
        color: neutral[300],
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: primary[400],
          textDecorationColor: primary[400],
          fontWeight: 600,
        },
      },
    },
  },
};

const themeOptions: ThemeOptions = {
  palette: palette as PaletteOptions,
  typography: {
    fontSize: 16,
    text: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    textAccent: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    small: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    smallAccent: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    header: {
      fontSize: 28,
      lineHeight: 1.5,
      color: neutral[500],
      fontWeight: 500,
    },
    headerAccent: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.5,
      // fontFamily: poppinsBold.style.fontFamily,
    },
    subheader: {
      fontSize: 20,
      fontWeight: 600,
      color: neutral[500],
    },
    button: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
    buttonSmall: {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
    link: {
      color: primary[600],
      fontWeight: 600,
      textDecorationColor: primary[600],
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "Poppins",
        color: neutral[500],
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: primary[500],
          textDecorationColor: primary[500],
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid ${neutral[200]}`,
          boxShadow: "none",
          padding: 32,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            ...{
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 8,
              padding: "12px 24px",
              lineHeight: 1.5,
              letterSpacing: 0.9,
            },
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                color: neutral[0],
                "&:disabled": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? neutral[500]
                      : neutral[500],
                  color:
                    theme.palette.mode === "light" ? neutral[0] : neutral[300],
                },
              }),
            ...(ownerState.variant === "outlined" &&
              ownerState.color === "primary" && {
                fontWeight: 600,
                color: primary[500],
                borderColor: primary[300],
                backgroundColor:
                  theme.palette.mode === "light" ? neutral[0] : primary[200],
                "&:disabled": {
                  borderColor: neutral[300],
                  backgroundColor: neutral[200],
                  color: neutral[600],
                },
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? primary[100]
                      : primary[300],
                },
              }),
            ...(ownerState.variant === "text" &&
              ownerState.color === "primary" && {
                color:
                  theme.palette.mode === "light" ? primary[500] : primary[300],
                fontWeight: 600,
                borderColor: primary[300],
                backgroundColor: "transparent",
                textDecoration: "underline",
                padding: 2,
                textTransform: "none",
                "&:disabled": {
                  color: neutral[400],
                },
                "&:hover": {
                  textDecoration: "underline",
                  color: primary[600],
                  backgroundColor: "transparent",
                },
              }),
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "16px 12px",
          "&.Mui-focused": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: primary[300],
            },
          },
          // padding: "160px 12px ",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: primary[300],
          },
          "&:hover": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: primary[300],
            },
          },
          "textarea::placeholder": {
            color: neutral[400],
            fontSize: 16,
            fontWeight: 400,
          },
          textarea: {
            color: neutral[600],
            fontSize: 16,
            fontWeight: 400,
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          gap: 20,
          display: "flex",
          flexWrap: "wrap",
          ".MuiToggleButtonGroup-grouped": {
            textTransform: "none",
            color: theme.palette.mode === "light" ? neutral[600] : neutral[100],

            fontWeight: 400,
            fontSize: 16,
            border: `1px solid ${neutral[300]}`,
            flex: "0 0 calc(33.333% - 13px)",

            "&:not(:last-of-type)": {
              border: `1px solid ${neutral[300]}`,
              borderRadius: 4,
            },
            "&:not(:first-of-type)": {
              border: `1px solid ${neutral[300]}`,
              borderRadius: 4,
            },

            "&.Mui-selected": {
              border: `1px solid ${primary[300]}`,
              backgroundColor:
                theme.palette.mode === "light" ? primary[100] : primary[400],
            },
            "&.Mui-selected:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? primary[300] : primary[300],
            },
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: 0,
          ".MuiSelect-select": {
            padding: "16px 12px",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: neutral[300],
          "&.Mui-checked": {
            color: primary[300],
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          gap: "0.5em",
        },
      },
    },
  },
};

console.log(themeOptions);
export const theme = createTheme(themeOptions as ThemeOptions);
export const themeDark = createTheme({
  ...themeOptions,
  palette: paletteDark.palette,
  components: {
    ...themeOptions.components,
    ...paletteDark.components,
  },
} as ThemeOptions);
