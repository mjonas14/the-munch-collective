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
import { QUERY_GET_USER_BY_ID } from "../../../utils/queries";

export default function UserImage({ loading, user }) {

  console.log(loading, "loading");
  console.log(user, "username");

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <Box
      sx={{
        height: 240,
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "20px 10px 20px 20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar
          alt="Profile picture"
          src={user.profilePic}
          sx={{ width: 150, height: 150 }}
        >
          <Typography sx={{ fontSize: "50px" }}>
            {user.username.charAt(0)}
          </Typography>
        </Avatar>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          {user.username}
        </Typography>
      </Container>
    </Box>
  );
}
