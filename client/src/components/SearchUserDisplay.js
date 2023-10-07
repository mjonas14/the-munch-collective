import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";

export default function SearchUserDisplay(props) {
  console.log(props, "props");

  const [addFriend, { loading1, data1 }] = useMutation(ADD_FRIEND);

  const handleClick = async (event) => {

    try {
    const { data } = await addFriend({
      variables: { userId: props.userId },
    });
    if (!data) {
        throw new Error("Something went wrong!");
      }
} catch (err) {
    console.log(err);
}
  };

  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: props.userId },
  });
  const userData = data?.getUserById || [];
  console.log(userData, "data for all a single user");

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container
      sx={{
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "20px 0px 20px 0px",
        display: "flex",
        justifyContent: "space-between",
        width: "75%",
        padding: "0px",
      }}
    >
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
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "16px",
          margin: "10px",
          width: "150px",
          justifyContent: "center",
        }}
        onClick={() => {
          handleClick();
        }}
      >
        Add Friend
      </Button>
    </Container>
  );
}
