import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import { QUERY_GETALLUSERS } from "../../../utils/queries";

export default function CurrentFriends() {
  const { loading, data } = useQuery(QUERY_GETALLUSERS);
  const userData = data?.getAllUsers || [];

  return (
    <Box
      sx={{
        height: 500,
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "20px 10px 20px 20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          margin: "15px 0px 15px 20px",
        }}
      >
        Friends
      </Typography>
    </Box>
  );
}
