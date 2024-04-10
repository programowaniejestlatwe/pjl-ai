/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/10/2023
 */

import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Panel from "@/themes/components/Panel";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

type TProblemDescriptionPanelProps = {
  children?: React.ReactNode;
  currentStep: number;
  onEdit: (step: number) => void;
  onUpdateProblemDescription: (step: string) => void;
};

const ProblemDescriptionPanel = (props: TProblemDescriptionPanelProps) => {
  /*const [problemDescription, setProblemDescription] = React.useState(
    "Silnik poszarpuje, dławi się przy jeździe ze stałą prędkością. Bieg nie ma znaczenia. Dzieje się to w okolicy 2000 obrotów na minutę."
  );*/
  const [problemDescription, setProblemDescription] = React.useState("");

  const summary = useMemo(() => "", []);

  /**
   *
   */
  const onProblemDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProblemDescription(event.target.value);
    },
    [setProblemDescription]
  );

  /**
   *
   */
  const onEdit = useCallback(() => {
    props.onEdit(2);
  }, [props.onEdit]);

  /**
   *
   */
  const onSubmitForm = useCallback(() => {
    props.onUpdateProblemDescription(problemDescription);
  }, [problemDescription, props.onUpdateProblemDescription]);

  const isExpanded = props.currentStep === 2;

  return (
    <Panel
      title={"Problem"}
      step={2}
      isContentExpanded={isExpanded}
      subheader={isExpanded ? undefined : problemDescription}
      showEdit={problemDescription.length > 0 && !isExpanded}
      onEdit={onEdit}
      footer={
        <Button
          variant={"contained"}
          color={"primary"}
          disabled={problemDescription.length < 60}
          onClick={onSubmitForm}
        >
          Diagnozuj
        </Button>
      }
    >
      <FormControl fullWidth>
        <Typography variant={"textAccent"}>
          Opisz co się dzieje z Twoim pojazdem. Im więcej informacji tym lepiej.
        </Typography>
        <TextField
          multiline
          rows={4}
          id="outlined-basic"
          variant="outlined"
          placeholder={"Placeholder"}
          fullWidth={true}
          value={problemDescription}
          onChange={onProblemDescriptionChange}
        ></TextField>
      </FormControl>
    </Panel>
  );
};

ProblemDescriptionPanel.propTypes = {};

export default ProblemDescriptionPanel;
