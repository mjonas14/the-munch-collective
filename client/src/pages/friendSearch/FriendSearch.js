import React from "react";
import {
    Grid,
    Box,
    Container,
    Avatar,
    Typography,
    IconButton,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";

  import CurrentFriends from "./leftSide/CurrentFriends";
  import UserSearch from "./rightSide/UserSearch";

export default function FriendSearch() {
  return (
    <Grid container>
      <Grid item xs={4}>
        <CurrentFriends />
      </Grid>
      <Grid item xs={8}>
        <UserSearch />
      </Grid>
    </Grid>
  );
};
