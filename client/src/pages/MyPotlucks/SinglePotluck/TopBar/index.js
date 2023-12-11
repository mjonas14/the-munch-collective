import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

export default function TopBar({ title, img }) {
  return (
    <Box className="list-box-users" sx={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar
        alt="Potluck cover photo"
        src={img}
        sx={{ width: 75, height: 75, margin: "20px" }}
      >
        <Typography sx={{ fontSize: "35px" }}>{title.charAt(0)}</Typography>
      </Avatar>
        <header className="title">{title}</header>
    </Box>
  );
}
