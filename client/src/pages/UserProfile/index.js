import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import Auth from "../../utils/auth";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GETME, QUERY_GET_USER_BY_ID } from "../../utils/queries";

import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserRecipes from "./UserRecipes";

export default function UserProfile() {
  const { userId } = useParams();
  const { loading: userLoading, data: userData } = useQuery(
    QUERY_GET_USER_BY_ID,
    {
      variables: { userId: userId },
    }
  );
  const { loading: loadingMe, data: meData } = useQuery(QUERY_GETME);
  const user = userData?.getUserById || [];
  const me = meData?.getMe || [];

  if (!Auth.loggedIn()) {
    window.location.assign("/");
  }

  if (userLoading || loadingMe) {
    <h1>Loading...</h1>;
  }

  const isFriend = me.friends.some((friend) => friend._id === user._id);
  console.log(isFriend, "friend");

  return (
    <Grid container>
      <Grid item xs={4}>
        <UserImage loading={userLoading} user={user} />
      </Grid>
      <Grid item xs={8}>
        <UserInfo loading={userLoading} user={user} isFriend={isFriend} />
      </Grid>
      <Grid item xs={12}>
        <UserRecipes loading={userLoading} user={user} isFriend={isFriend} />
      </Grid>
    </Grid>
  );
}
