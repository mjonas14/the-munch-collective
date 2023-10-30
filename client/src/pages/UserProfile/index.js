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
import { QUERY_GET_USER_BY_ID } from "../../utils/queries";

import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserRecipes from './UserRecipes';

export default function UserProfile() {
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  const user = data?.getUserById || [];

  if (!Auth.loggedIn()) {
    window.location.assign("/");
  }

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        <UserImage />
      </Grid>
      <Grid item xs={8}>
        <UserInfo />
      </Grid>
      <Grid item xs={12}>
        <UserRecipes />
      </Grid>
    </Grid>
  );
}
