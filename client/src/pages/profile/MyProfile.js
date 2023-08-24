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
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 400,
                      height: 1000,
                      borderRadius: "16px",
                      backgroundColor: "#EBECF0",
                      margin: "20px",
                    }}
                  >
                    <Container
                      sx={{
                        height: 200,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt={userData.username}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 140, height: 140 }}
                      >
                        <Typography sx={{ fontSize: "50px" }}>
                          {userData.username.charAt(0)}
                        </Typography>
                      </Avatar>
                    </Container>
                    <Container>
                      <Typography sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}>
                        <h1>{userData.username}</h1>
                      </Typography>
                    </Container>
                  </Box>
                </Box>
              </Grid>
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
