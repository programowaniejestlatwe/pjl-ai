import { styled } from "@mui/material/styles";
import { BackdropProps, Backdrop } from "@mui/material";

const BlurredBackdrop = styled(Backdrop)<BackdropProps>((props) => ({
  backdropFilter: "blur(4px)",
  zIndex: 1000,
}));

export default BlurredBackdrop;
