import React, { useState } from "react";
import { Box, Typography, TableContainer } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_GET_ALL_MY_REQUESTS } from "../../../utils/queries";

// components
import Request from "./Request";

const FriendRequests = () => {
  const { loading, data } = useQuery(QUERY_GET_ALL_MY_REQUESTS);

  if (loading) {
    return <></>;
  }

  // Get requests and filter for only those pending
  const requests = data?.getAllMyRequests || [];
  const pendingReqs = requests.filter((req) => req.status != "accepted");

  return (
    <Box className="list-box-users">
      <header className="box-header">Friends Requests</header>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {pendingReqs.length > 0 ? (
          <>
            {pendingReqs.map((request, index) => (
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
