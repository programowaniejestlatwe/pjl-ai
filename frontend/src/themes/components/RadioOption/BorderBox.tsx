import { Accordion, AccordionProps, Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { neutral, primary } from "@/themes/colors";

const BorderBox = styled(Accordion)<AccordionProps>(({ expanded, theme }) => {
  const isLight = theme.palette.mode === "light";
  const backgroundExpanded = isLight ? primary[100] : neutral[600];
  const backgroundCollapsed = isLight ? neutral[0] : neutral[600];

  return {
    border: expanded
      ? `1px solid ${primary[isLight ? 300 : 200]}`
      : `1px solid ${neutral[isLight ? 300 : 400]}`,
    borderRadius: 4,
    padding: 8,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: expanded ? backgroundExpanded : backgroundCollapsed,
    boxShadow: "none",
    ".MuiAccordionSummary-root": {
      padding: 0,
      "&.Mui-expanded": {
        minHeight: 48,
      },
    },
    ".MuiAccordionSummary-content": {
      margin: 0,
      "&.Mui-expanded": {
        margin: 0,
      },
    },
  };
});

export default BorderBox;
