import { styled } from "@mui/material/styles";
import { CardContent, CardContentProps } from "@mui/material";
import { neutral } from "@/themes/colors";

type TPanelCardContentProps = {} & CardContentProps;

const PanelCardContent = styled(CardContent)<TPanelCardContentProps>(
  ({ theme }) => {
    const isLight = theme.palette.mode === "light";

    return {
      padding: 32,
      paddingLeft: 72,
      border: `1px solid ${neutral[isLight ? 200 : 400]}`,
      borderBottom: "none",
      background: isLight ? neutral[0] : neutral[600],
    };
  }
);

export default PanelCardContent;
