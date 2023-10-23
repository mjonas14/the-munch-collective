import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function UserStatus(props) {
  var status;
  if (props.user.privateRecipes && props.user.privateRecipes.length === 0) {
    status = "Potato Pealer";
  } else if (props.user.privateRecipes && props.user.privateRecipes.length <= 5) {
    status = "Sauce Maker";
  } else if (props.user.privateRecipes && props.user.privateRecipes.length <= 10) {
    status = "Sue Chef";
  } else {
    status = "Head Chef";
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Status:
      </Typography>
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        {status}
      </Typography>
    </Container>
  );
}
