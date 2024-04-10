import { styled } from "@mui/material/styles";
import { Card, CardProps } from "@mui/material";
import { neutral } from "@/themes/colors";

type TPanelCardProps = {
  hasBorder?: boolean;
} & CardProps;

const PanelCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "hasBorder",
})<TPanelCardProps>(({ hasBorder, theme }) => {
  const isLight = theme.palette.mode === "light";

  return {
    // padding: 32,
    // paddingLeft: 72,
    padding: 0,
    position: "relative",
    // position: "sticky",
    // top: 100,
    border: hasBorder ? `1px solid ${neutral[isLight ? 200 : 400]}` : "none",
  };
});

export default PanelCard;
