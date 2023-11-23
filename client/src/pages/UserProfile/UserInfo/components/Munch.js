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
import LockIcon from '@mui/icons-material/Lock';

export default function Munch({ user, isFriend }) {
  return (
    <Container>
      <div className={"box-subheader"}>Munch</div>
      {isFriend ? (
      <Typography
        sx={{
          fontSize: "18px",
          marginTop: "10px",
        }}
      >
        {!user.cityLive && !user.cityBorn ? (
          <Typography>No munch added</Typography>
        ) : (
          <div>
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <KitchenIcon sx={{ marginRight: "8px" }} /> {user.favCuisine}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalDiningIcon sx={{ marginRight: "8px" }} /> {user.signatureDish}
            </Box>
          </div>
        )}
      </Typography>
      ) : (
        <LockIcon />
      )}
    </Container>
  );
}
