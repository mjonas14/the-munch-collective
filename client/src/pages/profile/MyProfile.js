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

import { QUERY_GETME } from "../../utils/queries";

import SideBar from "./SideBar";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(loading, "loading");
  console.log(data, "data");

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {Auth.loggedIn() ? (
            <Grid container spacing={2}>
              <SideBar />
              <Grid item xs={8}>
                <Item>xs=8</Item>
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
