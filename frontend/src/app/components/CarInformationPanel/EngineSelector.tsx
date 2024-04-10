/**
 * Created by piotr.pozniak@thebeaverhead.com on 05/10/2023
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, FormControl, Stack, Typography } from "@mui/material";
import SimpleRadioOption from "@/themes/components/SimpleRadioOption";
import RadioOption from "@/themes/components/RadioOption";
import { TEngine } from "@/consts/modelTypes";

/*
type TMotorEngine = {
  fuel: string;
  motor: string;
  engines: string[];
};
*/

type TEngineSelectorProps = {
  children?: React.ReactNode;
  engines: TEngine[];
  fuel: string;
  motor: string;

  onFuelChange: (fuel: string) => void;
  onMotorChange: (motor: string) => void;
};

const EngineSelector = (props: TEngineSelectorProps) => {
  const engines = useMemo(
    () =>
      props.engines
        ? props.engines.map((engine: TEngine) => (
            <RadioOption
              key={engine.fuel}
              label={engine.fuel}
              value={engine.fuel}
              onChange={props.onFuelChange}
              checked={props.fuel === engine.fuel}
            >
              <Stack direction={"column"} spacing={2}>
                {engine.motors.map((motor: string) => (
                  <SimpleRadioOption
                    key={motor}
                    label={motor}
                    value={motor}
                    onChange={props.onMotorChange}
                    checked={props.motor === motor}
                  />
                ))}
              </Stack>
            </RadioOption>
          ))
        : null,
    [props.fuel, props.motor, props.engines, props.onFuelChange]
  );

  if (!engines?.length) {
    return null;
  }

  return (
    <FormControl>
      <Typography variant={"textAccent"}>Silnik</Typography>
      <Stack direction={"column"} spacing={2}>
        {engines}
      </Stack>
    </FormControl>
  );
};

EngineSelector.propTypes = {
  engines: PropTypes.arrayOf(
    PropTypes.shape({
      fuel: PropTypes.string.isRequired,
      motors: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onFuelChange: PropTypes.func.isRequired,
  onMotorChange: PropTypes.func.isRequired,
};

export default EngineSelector;
