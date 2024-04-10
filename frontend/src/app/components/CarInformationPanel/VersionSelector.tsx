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

type TVersionSelectorProps = {
  children?: React.ReactNode;
  versions: string[];
  value: string;
  onChange: (event: string) => void;
};

const VersionSelector = (props: TVersionSelectorProps) => {
  const versions = useMemo(
    () =>
      props.versions
        ? props.versions.map((version) => {
            return (
              <ToggleButton key={version} value={version} aria-label="list">
                {version}
              </ToggleButton>
            );
          })
        : null,
    [props.versions]
  );

  /**
   *
   */
  const onChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      props.onChange(value);
    },
    [props.onChange]
  );

  if (!versions) {
    return null;
  }

  return (
    <FormControl>
      <Typography variant={"textAccent"}>Wersja</Typography>
      <ToggleButtonGroup
        orientation="horizontal"
        exclusive
        fullWidth={true}
        value={props.value || "none"}
        onChange={onChange}
      >
        {versions}
      </ToggleButtonGroup>
    </FormControl>
  );
};

VersionSelector.propTypes = {
  versions: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VersionSelector;
