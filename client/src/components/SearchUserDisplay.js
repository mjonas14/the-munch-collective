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
import { QUERY_GET_USER_BY_ID } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";

import CurrentUser from "../functions/currentUser";
import UserDisplay from "../components/UserDisplay";

export default function SearchUserDisplay(props) {
  const [addFriend, { loading1, data1 }] = useMutation(ADD_FRIEND);
  const [Count, setCount] = useState(0);

  const handleClick = async (event) => {
    setCount(Count + 1);
    console.log(Count, "count");
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

  if (loading) {
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
        <UserDisplay userId={props.userId} />
      </Container>
    );
  }
  if (userData._id === props.me._id) {
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
          <UserDisplay userId={props.userId} />
        </CardActionArea>
        {!props.me.friends.includes(userData._id) ? (
          <Button
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
        ) : (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "16px",
              margin: "10px",
              width: "150px",
              justifyContent: "center",
              color: "green",
            }}
          >
            Befriended
          </Typography>
        )}
      </Card>
    );
  }
  return;
}
