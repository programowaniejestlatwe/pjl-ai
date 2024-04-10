import React from "react";

import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { primary } from "@/themes/colors";

const Indicator = styled(Skeleton)(({ theme }) => ({
  height: 47,
  width: 27,
  padding: 15,
  borderRadius: "50%",
}));

export default Indicator;
