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

export default function UserExpertise(props) {

  // Define experties status based on number of recipes added
  var status = "";
  if (props.user.privateRecipes && props.user.privateRecipes.length === 0) {
    status = "Dish Washer";
  } else if (props.user.privateRecipes && props.user.privateRecipes.length <= 1) {
    status = "Potato Peeler";
  } else if (props.user.privateRecipes && props.user.privateRecipes.length <= 5) {
    status = "Sauce Maker";
  } else if (props.user.privateRecipes && props.user.privateRecipes.length <= 10) {
    status = "Sue Chef";
  } else if (props.user.privateRecipes && props.user.privateRecipes.length > 10) {
    status = "Head Chef";
  };

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
        Expertise:
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
