import React from "react";

import { Box, Skeleton } from "@mui/material";

const Indicator = () => {
  return (
    <Box width={"80%"}>
      <Box mb={0.85}>
        <Skeleton />
      </Box>
      <Skeleton height={4} />
    </Box>
  );
};

export default Indicator;
