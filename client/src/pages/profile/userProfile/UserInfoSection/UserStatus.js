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

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from "../../../../utils/queries";

export default function UserStatus(props) {
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  const user = data?.getUserById || [];

  console.log(user);

  if (loading) return <h1>Loading...</h1>;

  var status;
  if (user.privateRecipes.length === 0) {
    status = "Potato Pealer";
  } else if (user.privateRecipes.length <= 5) {
    status = "Sauce Maker";
  } else if (user.privateRecipes.length <= 10) {
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
