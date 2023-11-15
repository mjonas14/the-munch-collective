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
    <Box className="list-box-users">
      <header className="box-header">
        Friends Requests
      </header>
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
