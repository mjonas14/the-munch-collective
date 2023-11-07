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
        {!props.user.cityLive && !props.user.cityBorn ? (
          <Typography>No munch added</Typography>
        ) : (
          <div>
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <KitchenIcon sx={{ marginRight: "8px" }} /> {props.user.favCuisine}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalDiningIcon sx={{ marginRight: "8px" }} /> {props.user.signatureDish}
            </Box>
          </div>
        )}
      </Typography>
    </Container>
  );
}
