import React, { SyntheticEvent, useCallback } from "react";
import { DataType } from "csstype";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import BorderBox from "@/themes/components/RadioOption/BorderBox";
import PropTypes from "prop-types";

type RadioOptionProps = {
  label: string;
  value: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (value: string) => void;
  checked?: boolean;
  children?: React.ReactNode;
  rightComponent?: React.ReactNode;
};

const RadioOption = ({
  label,
  value,
  onChange,
  checked,
  children,
  rightComponent,
}: RadioOptionProps) => {
  /**
   *
   */
  const onClick = useCallback(
    (e: any) => {
      onChange(value);
    },
    [checked]
  );

  const rightContent = rightComponent ? (
    <Grid item xs={4}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        {rightComponent}
      </Box>
    </Grid>
  ) : null;

  return (
    <BorderBox expanded={checked} onChange={onClick}>
      <AccordionSummary>
        <Grid container spacing={2}>
          <Grid item xs={rightContent ? 8 : 12}>
            <Box display={"flex"} alignItems={"center"}>
              <Radio checked={checked} onClick={onClick} />
              <Typography variant={"text"}>{label}</Typography>
            </Box>
          </Grid>
          {rightContent}
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Box pl={4}>{children}</Box>
      </AccordionDetails>
    </BorderBox>
  );
};

RadioOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  children: PropTypes.node,
  rightComponent: PropTypes.node,
};
export default RadioOption;
