/**
 * Created by piotr.pozniak@thebeaverhead.com on 12/10/2023
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import RadioOption from "@/themes/components/RadioOption";
import Matching from "@/themes/components/Matching";
import { TPartsSummary } from "@/api/repair";
import { Stack, Typography } from "@mui/material";
import SimpleRadioOption from "@/themes/components/SimpleRadioOption";
import CategoriesParts, {
  CategoryPartsPropTypes,
} from "@/app/components/DiagnosticsPanel/CategoriesParts";

type TCarPartsOptionsProps = {
  children?: React.ReactNode;

  partsSummary?: TPartsSummary[];
  selectedCategoryId?: string;
  onSelectCategory: (value: string) => void;
  selectedPartId?: string;
  onSelectPart: (value: string) => void;
};

const PartsLoadingPlaceholder = () => (
  <>
    {Array.from(Array(3).keys()).map((i, idx) => (
      <SimpleRadioOption
        key={`loading-${idx}`}
        isLoading={true}
        value={"text"}
        onChange={() => {}}
        label={"Loading..."}
        rightComponent={<Matching value={0} isLoading={true} />}
      />
    ))}
  </>
);

const ProblemCategories = (props: TCarPartsOptionsProps) => {
  const categoriesTotal = useMemo(() => {
    const totals = props.partsSummary?.reduce<number>(
      (acc, curr) => curr.total + acc,
      0
    );
    return totals;
  }, [props.partsSummary]);

  const categoriesOptions = useMemo(
    () =>
      props.partsSummary && categoriesTotal
        ? props.partsSummary.map((result) => {
            return (
              <RadioOption
                key={result.category_name}
                label={result.category_name}
                value={result.category_name}
                onChange={props.onSelectCategory}
                checked={props.selectedCategoryId === result.category_name}
                rightComponent={
                  <Matching
                    value={
                      +Number(
                        (result.total * 100) / categoriesTotal
                      ).toPrecision(5)
                    }
                  />
                }
              >
                <CategoriesParts
                  parts={result.parts}
                  onSelectPart={props.onSelectPart}
                  selectedPartId={props.selectedPartId}
                />
              </RadioOption>
            );
          })
        : null,
    [
      props.partsSummary,
      categoriesTotal,
      props.selectedCategoryId,
      props.onSelectCategory,
      props.onSelectPart,
      props.selectedPartId,
    ]
  );

  const loadingOptions = useMemo(
    () => (
      <Stack pt={1} gap={1}>
        <PartsLoadingPlaceholder />
      </Stack>
    ),
    []
  );

  if (!categoriesOptions) {
    return loadingOptions;
  }

  return (
    <>
      <Typography variant={"smallAccent"}>
        Wybrany wątek zawiera poniższe grupy części, które prawodopodobnie
        powodują usterkę:
        <Stack pt={1} gap={1}>
          {categoriesOptions}
        </Stack>
      </Typography>
    </>
  );
};

export const PartsSummaryPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    parts: CategoryPartsPropTypes,
  })
);

ProblemCategories.propTypes = {
  partsSummary: PartsSummaryPropTypes,
  selectedCategoryId: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
  onSelectPart: PropTypes.func.isRequired,
  selectedPartId: PropTypes.string,
};

export default ProblemCategories;
