import React, { useState } from "react";
import moment from "moment";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CribIcon from "@mui/icons-material/Crib";
import HouseIcon from "@mui/icons-material/House";

export default function Munch(props) {
  console.log(props.user);

  let d = new Date(props.user.createdAt);
  console.log(d.toString());
  console.log(d.toDateString());
  var formatted_date = moment(props.user.createdAt).format("YYYY-MM-DD");
  console.log(formatted_date);

  return (
    <Container>
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Info
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          marginTop: "10px",
        }}
      >
        {!props.user.cityLive && !props.user.cityBorn ? (
          <Typography>No info added</Typography>
        ) : (
          <div>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <HouseIcon sx={{ marginRight: "8px" }} />
              {props.user.cityLive}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CribIcon sx={{ marginRight: "8px" }} /> {props.user.cityBorn}
            </Box>
          </div>
        )}
      </Typography>
    </Container>
  );
}
