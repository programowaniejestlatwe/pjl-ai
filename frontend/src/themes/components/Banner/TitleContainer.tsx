/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/10/2023
 */

import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const TitleContainer = styled(Container)<ContainerProps>((props) => ({
  position: "sticky",
  top: 0,
  zIndex: 12,
  background: "black",
  paddingTop: 24,
  paddingBottom: 16,
  marginBottom: 8,
}));

TitleContainer.propTypes = {};

export default TitleContainer;
