import React, { userState } from "react";
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
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../../../utils/mutations";

const IsFriend = (props) => {
    const [addFriend, { loading, data }] = useMutation(ADD_FRIEND);

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

  if (props.me.friendsNew.includes(props.userId)) {
    return (
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "16px",
          margin: "10px",
          width: "150px",
          justifyContent: "center",
          color: "green"
        }}
      >
        Befriended
      </Button>
    );
  } else if (props.me.friendsNew.includes(props.userId)) {
    return (
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "16px",
          margin: "10px",
          width: "150px",
          justifyContent: "center",
          color: "red"
        }}
      >
        Requested
      </Button>
    );
  } else {
    return (
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
    );
  }
};

export default IsFriend;
