import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { neutral, primary } from "@/themes/colors";

interface StyledBoxProps extends BoxProps {
  checked?: boolean;
}

const BorderBox = styled(Box)<StyledBoxProps>(({ checked, theme }) => {
  const isLight = theme.palette.mode === "light";
  return {
    border: checked
      ? `1px solid ${primary[isLight ? 300 : 200]}`
      : `1px solid ${neutral[isLight ? 300 : 400]}`,
    borderRadius: 4,
    padding: 8,
    backgroundColor: isLight ? neutral[0] : neutral[600],
    "&:hover": {
      cursor: "pointer",
    },
    flexGrow: 1,
  };
});

export default BorderBox;
