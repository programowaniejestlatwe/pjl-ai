import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import BlurredBackdrop from "@/themes/components/LoadingBackdrop/Backdrop";

const styles = require("@/../public/css/loading-dots.module.css");

type TLoadingBackdropProps = {
  open: boolean;
  title: string;
  description: string;
  image: string;
};

const LoadingBackdrop = ({
  open,
  title,
  description,
  image,
}: TLoadingBackdropProps) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress % 3) + 1);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <BlurredBackdrop open={open}>
      <Paper>
        <Box
          py={7}
          px={2}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Image src={image} alt={"Loading image"} width={200} height={200} />
          <Box py={1} ml={-2} display={"flex"}>
            <Typography
              variant={"subheader"}
              color={"text"}
              align={"center"}
              display={"block"}
            >
              {title}
            </Typography>
            <Box display={"inline-flex"} className={styles["dot-pulse"]}></Box>
          </Box>
          <Box width={380}>
            <Typography
              variant={"text"}
              color={"text"}
              align={"center"}
              display={"block"}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </BlurredBackdrop>
  );
};

export default LoadingBackdrop;
