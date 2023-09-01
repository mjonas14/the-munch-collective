import React from "react";
import { Grid, Box, Container, Avatar, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../utils/queries";

export default function SideBar() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  return (
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
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>{userData.username}</h1>
            </Typography>
          </Container>
        </Box>
      </Box>
    </Grid>
  );
}
