import { styled } from "@mui/material/styles";
import { CardHeader, CardHeaderProps } from "@mui/material";
import { neutral } from "@/themes/colors";
import PropTypes from "prop-types";

type TPanelCardTitleProps = {
  step: number;
  expanded?: boolean;
} & CardHeaderProps;

const PanelCardTitle = styled(CardHeader, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<TPanelCardTitleProps>(({ theme, step, expanded }) => {
  const isLight = theme.palette.mode === "light";

  return {
    padding: 32,
    paddingLeft: 72,
    position: "sticky",
    zIndex: 10,
    top: 98,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: expanded ? 0 : 4,
    borderBottomRightRadius: expanded ? 0 : 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: neutral[isLight ? 200 : 400],
    background: isLight ? neutral[0] : neutral[600],
    borderBottomStyle: expanded ? "none" : "solid",
    "& .MuiCardHeader-content": {
      width: "70%",
    },

    "& .MuiCardHeader-title": {
      //position: "relative",
      ...theme.typography.subheader,
      color: isLight ? neutral[500] : neutral[300],

      "&:before": {
        content: `'${step}.'`,
        position: "absolute",
        left: 32,
      },
    },
    "& .MuiCardHeader-subheader": {
      marginTop: 16,
      ...theme.typography.text,
      color: isLight ? neutral[500] : neutral[300],
      textOverflow: "ellipsis",
      overflow: "hidden",
      overflowWrap: "break-word",
      display: "block",
      whiteSpace: "nowrap",
      width: "80%",
    },
  };
});

PanelCardTitle.propTypes = {
  step: PropTypes.number.isRequired,
  expanded: PropTypes.bool,
};

export default PanelCardTitle;
