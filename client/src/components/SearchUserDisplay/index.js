import React from "react";
import {
  Container,
  Avatar,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from "../../utils/queries";

// components
import AddBtn from "./AddBtn";

export default function SearchUserDisplay({ userId, me }) {
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  const userData = data?.getUserById || [];

  if (loading) {
    return <></>;
  }

  if (userId === me._id) {
    return;
  }

  for (let i = 0; i < me.friends.length; i++) {
    if (userId === me.friends[i]._id) {
      return;
    }
  }

  if (userId) {
    return (
      <Card
        sx={{
          backgroundColor: "#EBECF0",
          borderRadius: "16px",
          margin: "20px 0px 20px 0px",
          display: "flex",
          justifyContent: "space-between",
          width: "97%",
          padding: "0px",
        }}
      >
        <CardActionArea component={Link} to={`/user/${userId}`}>
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
        </CardActionArea>
        <AddBtn userData={userData} />
      </Card>
    );
  }
  return;
}
