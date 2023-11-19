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

import UserExpertise from "./components/UserExpertise";
import Munch from "./components/Munch";
import Info from "./components/Info";

export default function UserInfo({ loading, user, isFriend }) {
  return (
    <>
      {isFriend ? (
        <Box
          sx={{
            height: 240,
            backgroundColor: "#EBECF0",
            borderRadius: "16px",
            margin: "20px 20px 20px 10px",
            display: "flex",
          }}
        >
          <Info user={user} />
          <Munch user={user} />
          <UserExpertise user={user} />
        </Box>
      ) : (
        <Box
          sx={{
            height: 240,
            backgroundColor: "#EBECF0",
            borderRadius: "16px",
            margin: "20px 20px 20px 10px",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              margin: "20px",
              fontSize: "25px",
            }}
          >
            You must be friends to view
          </Typography>
        </Box>
      )}
    </>
  );
}
