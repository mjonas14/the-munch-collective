import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from '../utils/queries';

export default function UserDisplay(props) {

  console.log(props, "props");

  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: props.userId }
  });
  const userData = data?.getUserById || [];
  console.log(userData, "data for all a single user");

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Avatar
          alt="Profile picture"
          src={userData.profilePic}
          sx={{ width: 45, height: 45, margin: "10px 0px 10px 0px" }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {userData.username.charAt(0)}
          </Typography>
        </Avatar>
        <Typography sx={{ fontSize: "15px", marginLeft: "20px" }}>
            {userData.username}
          </Typography>
      </Container>
  );
}
