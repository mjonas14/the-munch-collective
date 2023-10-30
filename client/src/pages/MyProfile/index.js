import React from "react";
import { Typography, Grid, Item, Box, Container, Avatar } from "@mui/material";

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../utils/queries";

import UsernameSec from "./MyInfo/ProfileSection";
import InfoSec from "./MyInfo/InfoSection";
import RightSideSection from "./MyRecipes";
import ErrorPage from "../../components/Error";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {Auth.loggedIn() ? (
            <Grid container>
              <Grid item xs={4}>
                <Box
                  sx={{
                    height: 1000,
                  }}
                >
                  <UsernameSec />
                  <InfoSec />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <RightSideSection data={userData.privateRecipes} />
              </Grid>
            </Grid>
          ) : (
            <ErrorPage />
          )}
        </div>
      )}
    </div>
  );
}
