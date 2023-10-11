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
  import { useQuery } from "@apollo/client";
  import { QUERY_GETME } from "../../utils/queries";


  import CurrentFriends from "./leftSide/CurrentFriends";
  import UserSearch from "./rightSide/UserSearch";

export default function FriendSearch() {

  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  const friends = userData.friends;

  return (
    <Grid container>
      <Grid item xs={4}>
        <CurrentFriends />
      </Grid>
      <Grid item xs={8}>
        <UserSearch me={userData} />
      </Grid>
    </Grid>
  );
};
