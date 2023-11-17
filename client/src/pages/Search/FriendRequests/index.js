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
import { QUERY_GET_ALL_MY_REQUESTS } from "../../../utils/queries";

import UserDisplay from "../../../components/UserDisplay";

const FriendRequests = (props) => {
  const { loading, data } = useQuery(QUERY_GET_ALL_MY_REQUESTS);

  if (loading) {
    return <></>;
  }

  const requests = data?.getAllMyRequests || [];

  return (
    <Box className="list-box-users">
      <header className="box-header">Friends Requests</header>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {requests.length > 0 ? (
          <>
            {requests.map((request, index) => (
              <div>
                {request.status === "pending" ? (
                  <Container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <UserDisplay key={index} userId={request.fromUserId._id} />
                  </Container>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </>
        ) : (
          <h4 style={{marginLeft: "25px"}}>No requests to show</h4>
        )}
      </TableContainer>
    </Box>
  );
};

export default FriendRequests;
