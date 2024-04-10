/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/10/2023
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Panel from "@/themes/components/Panel";
import { Link, Stack, Tab, Tabs, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { TPart, TSolution } from "@/api/repair";
import RadioOption from "@/themes/components/RadioOption";

type TRepairPlanPanelProps = {
  currentStep: number;
  solutions?: TSolution[];
  parts?: TPart[];
  solutionSummary?: string;
};

const styles = require("@/../public/css/iframe.module.css");

/**
 * Makes first letter of the string uppercase.
 * @param str
 */
const ucFirst = (str: string) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const RepairPlanPanel = (props: TRepairPlanPanelProps) => {
  const [currentTab, setCurrentTab] = useState<string>();
  const [selectedSolution, setSelectedSolution] = useState<number>();

  useEffect(() => {
    if (props.parts?.length) {
      setCurrentTab(props.parts[0].url);
    }
  }, [props.parts]);
  /**
   *
   */
  const onChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    [currentTab]
  );

  const onSelectSolution = useCallback(
    (value: string) => {
      setSelectedSolution(parseInt(value));
    },
    [selectedSolution]
  );

  const solutions = useMemo(
    () =>
      props.solutions?.length &&
      props.solutions.map((solution) => (
        <RadioOption
          label={ucFirst(solution.solution)}
          value={solution.id.toString()}
          checked={selectedSolution === solution.id}
          onChange={onSelectSolution}
          rightComponent={
            <Link
              target={`_blank_${solution.external_post_id}`}
              href={`https://forum.fordclubpolska.org/showpost.php?p=${solution.external_post_id}`}
            >
              <Typography variant={"link"} color={"primary"}>
                Źródło
                <LaunchIcon fontSize={"inherit"} />
              </Typography>
            </Link>
          }
        >
          <Stack gap={1}>
            <Typography variant={"textAccent"}>
              Rozwiązanie na podstawie poniższego opisu (kliknij w źródło aby
              dowiedzieć się więcej):
            </Typography>
            <Typography variant={"text"}>{solution.description}</Typography>
          </Stack>
        </RadioOption>
      )),
    [props.solutions, selectedSolution]
  );

  const tabs = useMemo(
    () =>
      props.parts?.length &&
      props.parts.map((part) => (
        <Tab key={part.url} label={part.category_name} value={part.url} />
      )),
    [props.parts]
  );

  const selectedTabContent = useMemo(() => {
    if (!props.parts?.length || !currentTab) {
      return null;
    }
    const part = props.parts.find((part) => part.url === currentTab);

    if (!part) {
      return null;
    }

    return (
      props.parts?.length && (
        <iframe className={styles["app-iframe"]} src={part.url}></iframe>
      )
    );
  }, [props.parts, currentTab]);

  return (
    <Panel
      title={"Plan naprawy"}
      step={4}
      isContentExpanded={props.currentStep === 4}
    >
      <Stack gap={1} mb={3}>
        <Typography variant={"textAccent"}>Podsumowanie</Typography>
        <Typography variant={"text"}>{props.solutionSummary}</Typography>
      </Stack>

      <Stack gap={1}>
        <Typography variant={"textAccent"}>
          Poniższe czynności pomogły innym rozwiązać problem:
        </Typography>
        <Stack gap={1}>{solutions}</Stack>
      </Stack>

      <Stack gap={1} mt={8}>
        <Typography variant={"textAccent"}>Schematy </Typography>
        <Tabs
          value={currentTab}
          onChange={onChangeTab}
          aria-label="Zakłądki ze schematami części"
        >
          {tabs}
        </Tabs>

        {selectedTabContent}
      </Stack>
    </Panel>
  );
};

RepairPlanPanel.propTypes = {
  currentStep: PropTypes.number.isRequired,
  solutions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      solution: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      external_post_id: PropTypes.number.isRequired,
    })
  ),
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category_name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  solutionSummary: PropTypes.string,
};

export default RepairPlanPanel;
