/**
 * Created by piotr.pozniak@thebeaverhead.com on 05/10/2023
 */

import React, { SyntheticEvent, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, FormControl, MenuItem, Select, Stack } from "@mui/material";
import ModelSelector from "@/app/components/CarInformationPanel/ModelSelector";
import VersionSelector from "@/app/components/CarInformationPanel/VersionSelector";
import ChassisSelector from "@/app/components/CarInformationPanel/ChassisSelector";
import EngineSelector from "@/app/components/CarInformationPanel/EngineSelector";
import Button from "@mui/material/Button";
import Panel from "@/themes/components/Panel";
import { TBrandModel } from "@/consts/modelTypes";

type TCarInformationProps = {
  children?: React.ReactNode;
  currentStep: number;
  onUpdateCarInformation: (carInformation: TCarInformation) => void;
  onEdit: (step: number) => void;
};

export type TCarInformation = {
  model: string;
  version: string;
  chassis: string;
  fuel: string;
  motor: string;
};

const Models = require("@/consts/models.json");

/**
 *
 * @param car
 */
export const getModelSummary = (car: TCarInformation): string => {
  return `${car.model} ${car.version} ${car.chassis} ${car.fuel} ${car.motor}`;
};

const CarInformationPanel = (props: TCarInformationProps) => {
  /*const [model, setModel] = useState("Mondeo");
  const [version, setVersion] = useState("MK4 (2007-2014)");
  const [chassis, setChassis] = useState("Kombi");
  const [fuel, setFuel] = useState("diesel");
  const [motor, setMotor] = useState("2.2 TDCi 129kW 175KM");*/

  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");
  const [chassis, setChassis] = useState("");
  const [fuel, setFuel] = useState("");
  const [motor, setMotor] = useState("");

  const selectedModel = useMemo<TBrandModel>(
    () =>
      model !== "" ? Models.find((m: TBrandModel) => m.name === model) : null,
    [model]
  );

  const allowedVersions = useMemo(
    () => (selectedModel ? selectedModel.versions.map((i) => i.name) : []),
    [model, selectedModel]
  );

  const selectedVersion = useMemo(
    () =>
      selectedModel
        ? selectedModel.versions.find((v) => v.name === version)
        : null,
    [version]
  );

  const allowedChassisTypes = useMemo(
    () => (selectedVersion ? selectedVersion.chassis.map((i) => i.name) : []),
    [version, selectedVersion]
  );

  const selectedChassis = useMemo(
    () =>
      selectedVersion
        ? selectedVersion.chassis.find((c) => c.name === chassis)
        : null,
    [chassis, selectedVersion]
  );

  const allowedEngines = useMemo(
    () => (selectedChassis ? selectedChassis.engines : []),
    [chassis, selectedChassis]
  );

  const hasAllInformation = useMemo(
    () =>
      true ||
      (model !== "" &&
        version !== "" &&
        chassis !== "" &&
        fuel !== "" &&
        motor !== ""),
    [model, version, chassis, fuel, motor]
  );

  const summary = useMemo(
    () =>
      hasAllInformation
        ? getModelSummary({ model, version, chassis, fuel, motor })
        : undefined,
    [model, version, chassis, fuel, motor]
  );

  /**
   *
   */
  const onChangeModel = useCallback(
    (value: string) => {
      setModel(value);
    },
    [model]
  );

  /**
   *
   */
  const onChangeVersion = useCallback(
    (value: string) => {
      setVersion(value);
    },
    [model]
  );

  /**
   *
   */
  const onChangeChassis = useCallback(
    (value: string) => {
      setChassis(value);
    },
    [model]
  );

  /**
   *
   */
  const onFuelChange = useCallback((value: string) => setFuel(value), [model]);

  /**
   *
   */
  const onMotorChange = useCallback(
    (value: string) => setMotor(value),
    [model]
  );

  /**
   *
   */
  const onSubmitForm = useCallback(() => {
    props.onUpdateCarInformation({
      model,
      version,
      chassis,
      fuel,
      motor,
    });
  }, [model, version, chassis, fuel, motor]);

  /**
   *
   */
  const onEdit = useCallback(() => {
    props.onEdit(1);
  }, [props.onEdit]);

  return (
    <Panel
      title={"Pojazd"}
      step={1}
      isContentExpanded={props.currentStep === 1}
      subheader={summary}
      showEdit={hasAllInformation && props.currentStep !== 1}
      onEdit={onEdit}
      footer={
        <Button
          variant={"contained"}
          disabled={!hasAllInformation}
          onClick={onSubmitForm}
        >
          Zapisz i kontynuuj
        </Button>
      }
    >
      <Stack gap={4}>
        <ModelSelector value={model} onChange={onChangeModel} />
        <VersionSelector
          onChange={onChangeVersion}
          value={version}
          versions={allowedVersions}
        />
        <ChassisSelector
          chassisTypes={allowedChassisTypes}
          value={chassis}
          onChange={onChangeChassis}
        />
        <EngineSelector
          engines={allowedEngines}
          fuel={fuel}
          motor={motor}
          onFuelChange={onFuelChange}
          onMotorChange={onMotorChange}
        />
      </Stack>
    </Panel>
  );
};

CarInformationPanel.propTypes = {
  currentStep: PropTypes.number,
  onUpdateCarInformation: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};

export default CarInformationPanel;
