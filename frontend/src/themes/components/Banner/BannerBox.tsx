/**
 * Created by piotr.pozniak@thebeaverhead.com on 05/10/2023
 */

import React from "react";
import PropTypes from "prop-types";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type TBannerBoxProps = {
  children?: React.ReactNode;
};

const BannerBox = styled(Box)<BoxProps>((props) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: "#000",
  marginBottom: -150,
  position: "sticky",
  top: -240,
  "& > img": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
  zIndex: 11
}));

BannerBox.propTypes = {};

export default BannerBox;
