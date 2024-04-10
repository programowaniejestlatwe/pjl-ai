import React from "react";

import { Box, Typography } from "@mui/material";
import Progress from "@/themes/components/Matching/Progress";
import Indicator from "@/themes/components/Matching/Indicator";

type TMatchingProps = {
  value: number;
  label?: string;
  isLoading?: boolean;
};

const Index = ({
  label = "Prawdopodobieństwo",
  value,
  isLoading,
}: TMatchingProps) => {
  if (isLoading) {
    return <Indicator />;
  }

  return (
    <Box width={"80%"}>
      <Box mb={0.85}>
        <Typography variant={"small"}>
          {label} {value}%
        </Typography>
      </Box>
      <Progress variant="determinate" value={value} />
    </Box>
  );
};

export default Index;
