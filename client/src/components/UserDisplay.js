import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

export default function UserDisplay(props) {
  return (
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Avatar
          alt="Profile picture"
          src={props.user.profilePic}
          sx={{ width: 45, height: 45, margin: "10px 0px 10px 0px" }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {props.user.username.charAt(0)}
          </Typography>
        </Avatar>
        <Typography sx={{ fontSize: "15px", marginLeft: "20px" }}>
            {props.user.username}
          </Typography>
      </Container>
  );
}
