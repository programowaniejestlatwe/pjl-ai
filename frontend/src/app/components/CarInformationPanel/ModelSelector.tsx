/**
 * Created by piotr.pozniak@thebeaverhead.com on 05/10/2023
 */

import React, { SyntheticEvent, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { TBrandModel } from "@/consts/modelTypes";
const Models = require("@/consts/models.json");

type TModelSelectorProps = {
  children?: React.ReactNode;
  onChange: (value: string) => void;
  value: string;
};

const ModelSelector = (props: TModelSelectorProps) => {
  const models = useMemo(
    () =>
      Models.map((model: TBrandModel) => (
        <MenuItem key={model.name} value={model.name}>
          {model.name}
        </MenuItem>
      )),
    []
  );

  const onChange = useCallback(
    (event: SelectChangeEvent) => {
      props.onChange(event.target.value);
    },
    [props.onChange]
  );

  return (
    <FormControl fullWidth>
      <Typography variant={"textAccent"}>Model</Typography>
      <Select id="model-select" value={props.value} onChange={onChange}>
        {models}
      </Select>
    </FormControl>
  );
};

ModelSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ModelSelector;
