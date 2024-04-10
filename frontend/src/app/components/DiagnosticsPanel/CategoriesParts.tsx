/**
 * Created by piotr.pozniak@thebeaverhead.com on 12/10/2023
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { TPartSummary } from "@/api/repair";
import { Stack, Typography } from "@mui/material";
import SimpleRadioOption from "@/themes/components/SimpleRadioOption";
import Matching from "@/themes/components/Matching";

type TCategoriesPartsProps = {
  children?: React.ReactNode;
  parts: TPartSummary[];
  selectedPartId?: string;
  onSelectPart: (value: string) => void;
};

const CategoriesParts = (props: TCategoriesPartsProps) => {
  const partsTotal = useMemo(() => {
    const totals = props.parts?.reduce<number>(
      (acc, curr) => curr.total + acc,
      0
    );
    return totals;
  }, [props.parts]);

  const partOptions = useMemo(
    () =>
      props.parts &&
      props.parts.map((part) => {
        return (
          <SimpleRadioOption
            key={part.id}
            label={part.name}
            value={part.id.toString()}
            onChange={props.onSelectPart}
            checked={props.selectedPartId === part.id.toString()}
            rightComponent={
              <Matching
                value={+Number((part.total / partsTotal) * 100).toFixed(2)}
              />
            }
          />
        );
      }),
    [props.parts, props.selectedPartId]
  );

  return (
    <>
      <Typography variant={"smallAccent"}>
        Wybierz część, która najbardziej pasuje do Twojego problemu:
        <Stack pt={1} gap={1}>
          {partOptions}
        </Stack>
      </Typography>
    </>
  );
};

export const CategoryPartsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
  })
);

CategoriesParts.propTypes = {
  parts: CategoryPartsPropTypes,
  selectedPartId: PropTypes.string,
  onSelectPart: PropTypes.func.isRequired,
};

export default CategoriesParts;
