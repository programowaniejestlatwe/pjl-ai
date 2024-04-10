/**
 * Created by piotr.pozniak@thebeaverhead.com on 05/10/2023
 */

import React, { SyntheticEvent, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type TChassisSelectorProps = {
  children?: React.ReactNode;
  chassisTypes: string[];
  value: string;
  onChange: (value: string) => void;
};

const ChassisSelector = (props: TChassisSelectorProps) => {
  const types = useMemo(
    () =>
      props.chassisTypes.length
        ? props.chassisTypes.map((chassis) => {
            return (
              <ToggleButton key={chassis} value={chassis} aria-label="list">
                {chassis}
              </ToggleButton>
            );
          })
        : null,
    [props.chassisTypes, props.value]
  );

  /**
   *
   */
  const onChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, value: string) => {
      props.onChange(value);
    },
    [props.onChange]
  );

  if (!types) {
    return null;
  }

  return (
    <FormControl>
      <Typography variant={"textAccent"}>Nadwozie</Typography>
      <ToggleButtonGroup
        orientation="horizontal"
        exclusive
        fullWidth={true}
        value={props.value}
        onChange={onChange}
      >
        {types}
      </ToggleButtonGroup>
    </FormControl>
  );
};

ChassisSelector.propTypes = {
  chassisTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChassisSelector;
