declare module "@mui/material/styles" {
  interface TypographyVariants {
    header: React.CSSProperties;
    headerAccent: React.CSSProperties;
    subheader: React.CSSProperties;
    text: React.CSSProperties;
    button: React.CSSProperties;
    buttonSmall: React.CSSProperties;
    link: React.CSSProperties;
    small: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    header?: React.CSSProperties;
    headerAccent?: React.CSSProperties;
    text?: React.CSSProperties;
    textAccent?: React.CSSProperties;
    button?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    link?: React.CSSProperties;
    small?: React.CSSProperties;
    smallAccent?: React.CSSProperties;
    subheader?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    header: true;
    headerAccent: true;
    text: true;
    textAccent: true;
    button: true;
    buttonSmall: true;
    link: true;
    small: true;
    smallAccent: true;
    subheader: true;

    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    caption: false;
  }
}

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions
): Typography;
