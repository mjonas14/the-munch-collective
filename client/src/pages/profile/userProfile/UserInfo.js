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

import UserStatus from './UserInfoSection/UserStatus'
import Munch from './UserInfoSection/Munch';
import Info from './UserInfoSection/Info'

export default function UserInfo() {
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  const user = data?.getUserById || [];

  return (
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
      <UserStatus user={user} />
    </Box>
  );
}
