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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

import { QUERY_GETME } from "../../utils/queries";

import UsernameSec from "./UsernameSec";
import InfoSec from "./InfoSec";
import AddPrivateRecipe from "./AddPrivateRecipe";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(loading, "loading");
  console.log(data, "data");

  const handleEdit = (event) => {
    event.preventDefault();
    console.log("Hi");
  }

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {Auth.loggedIn() ? (
            <Grid container spacing={2}>
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
                <Container sx={{
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                <Item></Item>
                <IconButton
                  aria-label="edit"
                  onClick={handleEdit}
                  sx={{ margin: "15px" }}
                >
                  <AddCircleIcon fontSize="large" />
                </IconButton>
                </Container>
                <AddPrivateRecipe />
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
