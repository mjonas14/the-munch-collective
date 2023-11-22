import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

// components
import UserExpertise from "./components/UserExpertise";
import Munch from "./components/Munch";
import Info from "./components/Info";

export default function UserInfo({ loading, user, isFriend }) {
  return (
    <Box className={"list-box-recipes"} sx={{ margin: "20px 20px 20px 10px" }}>
      <Info user={user} isFriend={isFriend} />
      <Munch user={user} isFriend={isFriend} />
      <UserExpertise user={user} />
    </Box>
  );
}
