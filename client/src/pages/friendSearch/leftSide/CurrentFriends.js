import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../../utils/queries";

import UserDisplay from "../../../components/UserDisplay";

export default function CurrentFriends() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  if (loading) {
    return (
      <Container
        sx={{
          backgroundColor: "#EBECF0",
          borderRadius: "16px",
          margin: "20px 10px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
          padding: "0px",
        }}
      >
      </Container>
    );
  }
  return (
    <Box
      sx={{
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
        Friends ({userData.friends.length})
      </Typography>
      <TableContainer sx={{ maxHeight: 395 }}>
        {userData.friends.map((friend) => (
          <Container sx={{
            display: "flex",
            justifyContent: "space-between"
          }}>
          <UserDisplay userId={friend} />
          <h4>Hi</h4>
          </Container>
        ))}
      </TableContainer>
    </Box>
  );
}
