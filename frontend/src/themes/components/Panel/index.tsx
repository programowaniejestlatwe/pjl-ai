import React, { useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
  Card,
  Collapse,
  Divider,
} from "@mui/material";
import PanelCard from "@/themes/components/Panel/PanelCard";
import PanelCardTitle from "@/themes/components/Panel/PanelCardTitle";
import EditLabel from "@/themes/components/Panel/EditLabel";
import PanelCardContent from "@/themes/components/Panel/PanelCardContent";
import PanelCardFooter from "@/themes/components/Panel/PanelCardFooter";

type TPanelProps = {
  children?: React.ReactNode;
  title: string;
  subheader?: string;
  step: number;
  showEdit?: boolean;
  isContentExpanded?: boolean;
  onEdit?: () => void;
  footer?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Panel = ({
  children,
  title,
  subheader,
  showEdit,
  onEdit,
  isContentExpanded,
  footer,
  step,
  ...rest
}: TPanelProps) => {
  /**
   *
   */
  const onEditClick = useCallback(() => {
    if (onEdit) {
      onEdit();
    }
  }, [onEdit, showEdit]);

  const editAction = showEdit ? <EditLabel onClick={onEditClick} /> : null;

  const content = children ? (
    <Collapse in={isContentExpanded}>
      <PanelCardContent>{children}</PanelCardContent>
      <PanelCardFooter>
        <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
          {footer}
        </Box>
      </PanelCardFooter>
    </Collapse>
  ) : null;

  return (
    /* <PanelCard hasBorder={!children || !isContentExpanded}>*/
    <>
      <PanelCardTitle
        step={step}
        title={title}
        subheader={subheader}
        action={editAction}
        expanded={isContentExpanded}
      ></PanelCardTitle>
      {content}
      <Box m={1} />
    </>
    /*</PanelCard>*/
  );
};

export default Panel;
