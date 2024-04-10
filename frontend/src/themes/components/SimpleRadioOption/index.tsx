import React, { SyntheticEvent, useCallback } from "react";
import { DataType } from "csstype";
import { Box, Chip, Grid, Radio, Skeleton, Typography } from "@mui/material";
import BorderBox from "@/themes/components/SimpleRadioOption/BorderBox";
import Indicator from "@/themes/components/RadioOption/Indicator";

type SimpleRadioOptionProps = {
  label: string;
  value: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (value: string) => void;
  checked?: boolean;
  rightComponent?: React.ReactNode;
  isLoading?: boolean;
};

const SimpleRadioOption = ({
  label,
  value,
  onChange,
  checked,
  rightComponent,
  isLoading,
}: SimpleRadioOptionProps) => {
  const onClick = useCallback(
    (e: any) => {
      if (isLoading) {
        return;
      }
      onChange(value);
    },
    [checked, isLoading]
  );

  const rightContent = rightComponent ? (
    <Grid item xs={4}>
      {rightComponent}
    </Grid>
  ) : null;

  const content = isLoading ? (
    <Box display={"flex"} gap={1} alignItems={"center"} pl={1}>
      <Indicator />
      <Skeleton width={"70%"} height={40} />
    </Box>
  ) : (
    <>
      <Radio checked={checked} onClick={onClick} disabled={!isLoading} />
      <Typography variant={"text"}>{label}</Typography>
    </>
  );

  return (
    <BorderBox checked={checked} onClick={onClick}>
      <Grid container spacing={2}>
        <Grid item xs={rightContent ? 8 : 12}>
          {content}
        </Grid>
        {rightContent}
      </Grid>
    </BorderBox>
  );
};

export default SimpleRadioOption;
