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
import LockIcon from '@mui/icons-material/Lock';

export default function Munch({ user, isFriend }) {
  console.log(user);

  return (
    <>
      <Container>
        <Typography className={"box-subheader"}>Info</Typography>
        {isFriend ? (
          <Typography
            sx={{
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            {!user.cityLive && !user.cityBorn ? (
              <Typography>No info added</Typography>
            ) : (
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <HouseIcon sx={{ marginRight: "8px" }} />
                  {user.cityLive}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CribIcon sx={{ marginRight: "8px" }} /> {user.cityBorn}
                </Box>
              </div>
            )}
          </Typography>
        ) : (
          <LockIcon />
        )}
      </Container>
    </>
  );
}
