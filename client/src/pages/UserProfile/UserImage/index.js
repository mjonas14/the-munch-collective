import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

export default function UserImage({ loading, user }) {
  if (loading) return <h1>Loading...</h1>;

  return (
    <Box
      className={"list-box-recipes"}
      sx={{
        margin: "20px 10px 20px 20px",
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
            fontSize: "25px",
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
