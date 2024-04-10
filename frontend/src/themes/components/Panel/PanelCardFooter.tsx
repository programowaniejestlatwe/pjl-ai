import { styled } from "@mui/material/styles";
import { CardActions, CardActionsProps } from "@mui/material";
import { neutral } from "@/themes/colors";

type TPanelCardContentProps = {} & CardActionsProps;

const PanelCardContent = styled(CardActions)<TPanelCardContentProps>(
  ({ theme }) => {
    const isLight = theme.palette.mode === "light";

    return {
      padding: 32,
      paddingLeft: 72,
      borderTop: "none",
      border: `1px solid ${neutral[isLight ? 200 : 400]}`,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      background: isLight ? neutral[0] : neutral[600],
    };
  }
);

export default PanelCardContent;
