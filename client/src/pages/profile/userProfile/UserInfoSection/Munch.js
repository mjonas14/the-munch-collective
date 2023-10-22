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
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KitchenIcon from "@mui/icons-material/Kitchen";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function Munch(props) {
  return (
    <Container>
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Munch
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          marginTop: "10px",
        }}
      >
        <KitchenIcon /> {props.user.favCuisine}
        <br />
        <LocalDiningIcon /> {props.user.signatureDish}
      </Typography>
    </Container>
  );
}
