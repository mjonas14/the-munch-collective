import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from "../../utils/queries";
import { REQUEST_FRIEND } from "../../utils/mutations";
import Auth from "../../utils/auth";

import UserDisplay from "../UserDisplay";
import IsFriend from "./IsFriend";

export default function SearchUserDisplay(props) {
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: props.userId },
  });
  const userData = data?.getUserById || [];

  if (loading) {
    return <div></div>;
  }

  if (props.userId === props.me._id) {
    return;
  }

  if (props.userId) {
    return (
      <Card
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
        <CardActionArea component={Link} to={`/user/${props.userId}`}>
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
        <IsFriend me={props.me} userId={props.userId} />
      </Card>
    );
  }
  return;
}
