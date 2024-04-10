"use client";

import { useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/material";

import CarInformationPanel, {
  getModelSummary,
  TCarInformation,
} from "@/app/components/CarInformationPanel";
import ProblemDescriptionPanel from "@/app/components/ProblemDescriptionPanel";
import DiagnosticsPanel, {
  getDiagnosticsSummary,
} from "@/app/components/DiagnosticsPanel";
import RepairPlanPanel from "@/app/components/RepairPlanPanel";
import {
  fetchParts,
  fetchPartsSummary,
  fetchSolutions,
  fetchSolutionSummary,
  fetchSymptoms,
  TPart,
  TPartsSummary,
  TSolution,
  TSymptoms,
} from "@/api/repair";
import LoadingBackdrop from "@/themes/components/LoadingBackdrop";
import Demo from "@/themes/Demo";
const LoadingDiagnosticsImg = require("@/../public/img/loading.png");
const LoadingRepairPlanImg = require("@/../public/img/loading_repair_plan.png");

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [carInformation, setCarInformation] = useState<TCarInformation>();
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [showDiagnosticsLoadingBanner, setShowDiagnosticsLoadingBanner] =
    useState(false);
  const [showRepairPlanLoadingBanner, setShowRepairPlanLoadingBanner] =
    useState(false);
  const [symptoms, setSymptoms] = useState<TSymptoms[]>();
  const [selectedThreadId, setSelectedThreadId] = useState<string>();
  const [partsSummary, setPartsSummary] = useState<TPartsSummary[]>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [selectedPartId, setSelectedPartId] = useState<string>();
  const [solutions, setSolutions] = useState<TSolution[]>();
  const [parts, setParts] = useState<TPart[]>();
  const [solutionSummary, setSolutionSummary] = useState<string>();

  useEffect(() => {
    if (showDiagnosticsLoadingBanner && symptoms) {
      setShowDiagnosticsLoadingBanner(false);
      setCurrentStep(3);
    }
  }, [showDiagnosticsLoadingBanner, symptoms]);

  useEffect(() => {
    if (showRepairPlanLoadingBanner && solutions && parts) {
      setShowRepairPlanLoadingBanner(false);
      setCurrentStep(4);
    }
  }, [
    showRepairPlanLoadingBanner,
    symptoms,
    parts,
    setShowDiagnosticsLoadingBanner,
    setCurrentStep,
  ]);

  /**
   *
   */
  const onUpdateCarInformation = useCallback(
    (carInformation: TCarInformation) => {
      console.debug("onUpdateCarInformation");
      setCarInformation(carInformation);
      setCurrentStep(2);
    },
    [carInformation]
  );

  /**
   *
   */
  const onChangeStepTo = useCallback(
    (step: number) => {
      setCurrentStep(step);
    },
    [setCurrentStep]
  );

  /**
   *
   */
  const onUpdateProblemDescription = useCallback(
    async (problemDesc: string) => {
      console.debug("onUpdateProblemDescription");
      if (!carInformation) {
        return;
      }

      setProblemDescription(problemDesc);
      setShowDiagnosticsLoadingBanner(true);

      const symptoms = await fetchSymptoms(
        carInformation.model,
        carInformation.version,
        carInformation.chassis,
        carInformation.motor,
        problemDesc
      );

      setSymptoms(symptoms);
    },
    [carInformation, problemDescription, setSymptoms]
  );

  /**
   *
   */
  const onSelectThreadId = useCallback(
    async (threadId: string) => {
      setSelectedThreadId(threadId);
      setPartsSummary([]);

      const partsSummary = await fetchPartsSummary(+threadId);

      setPartsSummary(partsSummary);
    },
    [selectedPartId]
  );

  /**
   *
   */
  const onSelectCategory = useCallback(
    (value: string) => {
      setSelectedCategoryId(value);
    },
    [selectedCategoryId]
  );

  /**
   *
   */
  const onSelectPartId = useCallback(
    async (value: string) => {
      setSelectedPartId(value);
    },
    [selectedPartId]
  );

  /**
   *
   */
  const onFetchRepairPlan = useCallback(async () => {
    if (!selectedPartId || !symptoms || !partsSummary) {
      return;
    }
    setShowRepairPlanLoadingBanner(true);

    const parts = await fetchParts(+selectedPartId);
    const solutions = await fetchSolutions(
      selectedThreadId ? +selectedThreadId : 0,
      +selectedPartId
    );

    const modelSummary = carInformation ? getModelSummary(carInformation) : "";
    const diagnosticSummary = getDiagnosticsSummary(
      symptoms,
      selectedThreadId,
      partsSummary,
      selectedCategoryId,
      selectedPartId
    );

    const summary = await fetchSolutionSummary(
      modelSummary,
      problemDescription,
      diagnosticSummary
    );

    setParts(parts);
    setSolutions(solutions);
    setSolutionSummary(summary);
  }, [selectedPartId, selectedThreadId]);

  return (
    <Stack>
      {/* <Demo /> */}

      <LoadingBackdrop
        title={"Wstępna diagnostyka"}
        description={
          "Przetwarzamy dane Twojego pojazdu i opis usterki. Trzymaj się, odpowiedzi nadchodzą!"
        }
        image={LoadingDiagnosticsImg}
        open={showDiagnosticsLoadingBanner}
      />
      <LoadingBackdrop
        title={"Tworzenie planu naprawy"}
        description={
          "Ciężko pracujemy, aby opracować najskuteczniejsze rozwiązania dla Twojego pojazdu."
        }
        image={LoadingRepairPlanImg}
        open={showRepairPlanLoadingBanner}
      />
      <CarInformationPanel
        currentStep={currentStep}
        onUpdateCarInformation={onUpdateCarInformation}
        onEdit={onChangeStepTo}
      />
      <ProblemDescriptionPanel
        currentStep={currentStep}
        onEdit={onChangeStepTo}
        onUpdateProblemDescription={onUpdateProblemDescription}
      />

      <DiagnosticsPanel
        currentStep={currentStep}
        onUpdateThreadId={onSelectThreadId}
        onEdit={onChangeStepTo}
        symptoms={symptoms}
        selectedThreadId={selectedThreadId}
        partsSummary={partsSummary}
        onSelectCategory={onSelectCategory}
        selectedCategoryId={selectedCategoryId}
        selectedPartId={selectedPartId}
        onSelectPart={onSelectPartId}
        onFormSubmit={onFetchRepairPlan}
      />

      <RepairPlanPanel
        currentStep={currentStep}
        solutions={solutions}
        parts={parts}
        solutionSummary={solutionSummary}
      />

      {/*<Button variant="contained">Hello world</Button>*/}
    </Stack>
  );
}
