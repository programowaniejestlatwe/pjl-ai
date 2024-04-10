import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { primary } from "@/themes/colors";

const Progress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: primary[theme.palette.mode === "light" ? 200 : 400],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: primary[theme.palette.mode === "light" ? 300 : 600],
  },
}));

export default Progress;
