import React, { useState } from "react";
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

const FriendRequests = () => {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(userData.friendsNew);

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
        Friend Requests
      </Typography>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {userData.friendsNew ? (
          <>
            {userData.friendsNew.map((friends, index) => (
              <div>
                {friends.status === 2 ? (
                  <Container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <UserDisplay key={index} userId={friends.friend} />
                  </Container>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </TableContainer>
    </Box>
  );
};

export default FriendRequests;
