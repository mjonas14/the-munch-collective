import React from "react";
import { Typography, Grid, Item, Box, Container, Avatar } from "@mui/material";

import Auth from "../../../utils/auth";

// components
import UsernameSec from "./ProfileSec";
import InfoSec from "./InfoSec";

const MyInfo = () => {
  return (
    <div>
      <UsernameSec />
      <InfoSec />
    </div>
  );
};


export default MyInfo;