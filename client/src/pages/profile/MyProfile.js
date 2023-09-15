import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { QUERY_GETME } from "../../utils/queries";

import UsernameSec from "./leftSide/UsernameSec";
import InfoSec from "./leftSide/InfoSec";
import AddPrivateRecipe from "./rightSide/AddPrivateRecipe";
import RightSideSection from "./RightSideSection";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(loading, "loading");
  console.log(data, "datasdfasdf");

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
