/**
 * Created by piotr.pozniak@thebeaverhead.com on 05/10/2023
 */

import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import BannerBox from "@/themes/components/Banner/BannerBox";
import { neutral } from "@/themes/colors";
import TitleContainer from "@/themes/components/Banner/TitleContainer";
const bannerImg = require("@/../public/img/banner.png");

const Banner = () => {
  return (
    <>
      <BannerBox>
        <Image src={bannerImg} alt={"Banner Image"} />
      </BannerBox>
      <TitleContainer>
        <Box mb={2}>
          <Typography variant={"headerAccent"} color={neutral[100]}>
            Ford Diagnostic Hub
          </Typography>
        </Box>
      </TitleContainer>
    </>
  );
};

Banner.propTypes = {};

export default Banner;
