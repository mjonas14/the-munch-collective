import React from "react";
import {
  Typography,
  Grid,
  Item,
  Box,
  Container,
  Avatar
} from "@mui/material";

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../utils/queries";

import UsernameSec from "./leftSide/UsernameSec";
import InfoSec from "./leftSide/InfoSec";
import RightSideSection from "./rightSide/RightSideSection";

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
            <div>
              <Typography
                variant="h2"
                style={{
                  color: "black",
                  textAlign: "center",
                  marginTop: "40px",
                }}
              >
                404
              </Typography>
              <Typography
                variant="h5"
                style={{ color: "gray", textAlign: "center" }}
              >
                Aaarghhhh, I simply cannot find the page...
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
