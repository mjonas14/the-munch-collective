import React from "react";
import { Grid, Box, Container, Avatar, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../../utils/queries";

export default function UsernameSec() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  return (
    <Box
      sx={{
        height: 290,
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "20px 10px 20px 20px",
        display: "flex",
        flexDirection: "column",
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
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {userData.username}
        </Typography>
      </Container>
    </Box>
  );
}
