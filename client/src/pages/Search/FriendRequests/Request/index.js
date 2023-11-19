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
import { useMutation } from "@apollo/client";
import { APPROVE_FRIEND, DECLINE_FRIEND } from "../../../../utils/mutations";

// components
import UserDisplay from "../../../../components/UserDisplay";

const Request = ({ request }) => {
  const [status, setStatus] = useState("");
  const [approveFriend] = useMutation(APPROVE_FRIEND);
  const [sayNoToFriend] = useMutation(DECLINE_FRIEND);
  const handleApprove = async (id) => {
    try {
      const { data } = await approveFriend({
        variables: { friendId: id },
      });
      console.log(data);
      if (!data) {
        throw new Error("Something went wrong!");
      }
      setStatus("Accepted");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (id) => {
    try {
      const { data } = await sayNoToFriend({
        variables: { friendId: id },
      });
      console.log(data);
      if (!data) {
        throw new Error("Something went wrong!");
      }
      setStatus("Declined");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {request.status === "pending" ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <UserDisplay userId={request.fromUserId._id} />
          <Container
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            {status === "" ? (
              <>
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    handleApprove(request.fromUserId._id);
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDecline(request.fromUserId._id)}
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <Typography sx={{ color: "green", fontSize: "14px" }}>
                {status}
              </Typography>
            )}
          </Container>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Request;
