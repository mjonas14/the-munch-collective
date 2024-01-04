import React from "react";
import { Grid, Box } from "@mui/material";

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../utils/queries";

// components
import MyInfo from "./MyInfo";
import MyRecipes from "./MyRecipes";
import ErrorPage from "../../components/Error";
import Loading from "../../components/Loading";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {Auth.loggedIn() ? (
            <Grid container>
              <Grid item xs={4}>
                <Box sx={{ height: 1000 }}>
                  <MyInfo />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <MyRecipes data={userData.privateRecipes} />
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
