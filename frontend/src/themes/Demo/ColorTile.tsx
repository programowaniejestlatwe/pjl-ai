import { neutral, primary } from "@/themes/colors";
import { Box, Typography } from "@mui/material";

export const ColorTile = ({
  bgColor,
  labelColor,
  label,
}: {
  bgColor: string;
  labelColor: string;
  label: string;
}) => {
  return (
    <Box
      width={120}
      height={120}
      bgcolor={bgColor}
      borderRadius={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
      p={2}
    >
      <Typography variant={"text"} color={labelColor}>
        {label}
      </Typography>
      <Typography variant={"small"} color={labelColor}>
        {bgColor}
      </Typography>
    </Box>
  );
};
