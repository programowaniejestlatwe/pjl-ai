/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/10/2023
 */

import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { TCarInformation } from "@/app/components/CarInformationPanel";
import Button from "@mui/material/Button";
import Panel from "@/themes/components/Panel";
import { FormControl, Stack, Typography } from "@mui/material";
import SimpleRadioOption from "@/themes/components/SimpleRadioOption";
import RadioOption from "@/themes/components/RadioOption";
import Matching from "@/themes/components/Matching";
import { TPartsSummary, TSymptoms } from "@/api/repair";
import ProblemCategories, {
  PartsSummaryPropTypes,
} from "@/app/components/DiagnosticsPanel/ProblemCategories";

type TDiagnosticsPanelProps = {
  children?: React.ReactNode;
  currentStep: number;

  symptoms?: TSymptoms[];
  selectedThreadId?: string;
  onUpdateThreadId: (threadId: string) => void;

  onEdit: (step: number) => void;

  partsSummary?: TPartsSummary[];
  selectedCategoryId?: string;
  onSelectCategory: (value: string) => void;

  selectedPartId?: string;
  onSelectPart: (value: string) => void;

  onFormSubmit: () => void;
};

/**
 *
 * @param symptoms
 * @param selectedThreadId
 * @param partsSummary
 * @param selectedCategoryId
 * @param selectedPartId
 */
export const getDiagnosticsSummary = (
  symptoms: TSymptoms[],
  selectedThreadId: string | undefined,
  partsSummary: TPartsSummary[],
  selectedCategoryId: string | undefined,
  selectedPartId: string | undefined
) => {
  let _summary = "";

  if (selectedThreadId !== undefined && symptoms) {
    const symptom = symptoms.find(
      (symptom) =>
        symptom.thread_id === (selectedThreadId ? +selectedThreadId : 0)
    );
    _summary = symptom?.symptoms || "";
  }

  let category = null;
  if (selectedCategoryId && partsSummary) {
    category = partsSummary.find(
      (part) => part.category_name === selectedCategoryId
    );

    _summary += category ? ` ${category.category_name}.` : "";
  }

  if (category && selectedPartId && partsSummary) {
    const part = category.parts.find(
      (part) => part.id === (selectedPartId ? +selectedPartId : 0)
    );

    _summary += part ? ` ${part.name}.` : "";
  }
  return _summary;
};

const DiagnosticsPanel = (props: TDiagnosticsPanelProps) => {
  const summary = useMemo(() => {
    if (!props.symptoms || !props.partsSummary) {
      return undefined;
    }
    return getDiagnosticsSummary(
      props.symptoms,
      props.selectedThreadId,
      props.partsSummary,
      props.selectedCategoryId,
      props.selectedPartId
    );
  }, [
    props.selectedThreadId,
    props.symptoms,
    props.partsSummary,
    props.selectedCategoryId,
    props.selectedPartId,
  ]);

  /**
   *
   */
  const onEdit = useCallback(() => {
    props.onEdit(3);
  }, [props.onEdit]);

  const diagnosticsOptions = useMemo(
    () =>
      props.symptoms &&
      props.symptoms.map((result) => {
        return (
          <RadioOption
            key={result.thread_id}
            label={result.symptoms}
            value={result.thread_id.toString()}
            onChange={props.onUpdateThreadId}
            checked={props.selectedThreadId === result.thread_id.toString()}
            rightComponent={
              <Matching
                value={+Number(result.probability * 100).toPrecision(5)}
              />
            }
          >
            <ProblemCategories
              partsSummary={props.partsSummary}
              selectedCategoryId={props.selectedCategoryId}
              onSelectCategory={props.onSelectCategory}
              onSelectPart={props.onSelectPart}
              selectedPartId={props.selectedPartId}
            />
          </RadioOption>
        );
      }),
    [
      props.symptoms,
      props.selectedThreadId,
      props.onUpdateThreadId,
      props.partsSummary,
      props.selectedCategoryId,
      props.onSelectCategory,
      props.selectedPartId,
      props.onSelectPart,
    ]
  );

  /**
   *
   */
  const onFormSubmit = useCallback(() => {
    props.onFormSubmit();
  }, [props.onFormSubmit]);

  const showEdit =
    props.currentStep !== 3 &&
    props.selectedThreadId !== undefined &&
    props.selectedCategoryId !== undefined &&
    props.selectedPartId !== undefined;

  return (
    <Panel
      title={"Diagnostyka"}
      step={3}
      isContentExpanded={props.currentStep === 3}
      subheader={summary}
      showEdit={showEdit}
      onEdit={onEdit}
      footer={
        <Button variant={"contained"} onClick={onFormSubmit}>
          Stwórz plan naprawy
        </Button>
      }
    >
      <FormControl>
        <Typography variant={"textAccent"}>
          Sztuczna inteligencja znalazła poniższe wyniki na podstawie opisu
          Twojego problemu. Wybierz najbardziej pasujący wątek.
        </Typography>
        <Stack gap={1}>{diagnosticsOptions}</Stack>
      </FormControl>
    </Panel>
  );
};

DiagnosticsPanel.propTypes = {
  children: PropTypes.node,
  currentStep: PropTypes.number.isRequired,
  onUpdateThreadId: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  symptoms: PropTypes.arrayOf(
    PropTypes.shape({
      symptoms: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired,
      thread_id: PropTypes.number.isRequired,
    })
  ),
  selectedThreadId: PropTypes.string,
  partsSummary: PartsSummaryPropTypes,
  selectedCategoryId: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,

  selectedPartId: PropTypes.string,
  onSelectPart: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default DiagnosticsPanel;
