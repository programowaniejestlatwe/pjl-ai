import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { SyntheticEvent, useCallback } from "react";

type TEditLabelProps = {
  onClick: () => void;
};

const EditLabel = ({ onClick: _onClick }: TEditLabelProps) => {
  const onClick = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      _onClick();
    },
    [_onClick]
  );

  return (
    <Link href={"#"}>
      <Box onClick={onClick} display={"flex"} gap={1}>
        Edytuj
        <EditIcon color={"primary"} fontSize={"small"} />
      </Box>
    </Link>
  );
};

export default EditLabel;
