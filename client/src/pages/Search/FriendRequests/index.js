import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_GET_ALL_MY_REQUESTS } from "../../../utils/queries";

// components
import Request from "./Request";

const FriendRequests = () => {
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
              <>
                <Request key={index} request={request} />
              </>
            ))}
          </>
        ) : (
          <Typography sx={{ marginLeft: "20px" }}>
            No requests to show
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
};

export default FriendRequests;
