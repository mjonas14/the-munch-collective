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
    <Box
      className={"list-box-recipes"}
      sx={{ ml: "20px", display: "flex", flexDirection: "column" }}
    >
      <header className="box-header">Info</header>
      <UserExpertise user={user} />
      <Info user={user} isFriend={isFriend} />
      <Munch user={user} isFriend={isFriend} />
    </Box>
  );
}
