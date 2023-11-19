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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_ALL_MY_REQUESTS } from "../../../utils/queries";
import { APPROVE_FRIEND } from "../../../utils/mutations";

import UserDisplay from "../../../components/UserDisplay";
import Request from "./Request";

const FriendRequests = ({ friendAdded, setFriendAdded, me }) => {
  const [status, setStatus] = useState("");
  const { loading, data } = useQuery(QUERY_GET_ALL_MY_REQUESTS);
  const [approveFriend] = useMutation(APPROVE_FRIEND);

  if (loading) {
    return <></>;
  }

  const requests = data?.getAllMyRequests || [];

  const handleApprove = async (id) => {
    try {
      const { data } = await approveFriend({
        variables: { friendId: id },
      });
      console.log(data);
      if (!data) {
        throw new Error("Something went wrong!");
      }
      setFriendAdded(id);
      setStatus("Accepted");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (id) => {};

  return (
    <Box className="list-box-users">
      <header className="box-header">Friends Requests</header>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {requests.length > 0 ? (
          <>
            {requests.map((request, index) => (
              <>
                <Request request={request} />
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
