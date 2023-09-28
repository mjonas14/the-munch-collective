import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import UserDisplay from "../../../components/UserDisplay";

export default function PotluckMembers(props) {

    console.log(props.members, "members");

  return (
    <Box
      sx={{
        height: 500,
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "20px 10px 20px 20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          margin: "15px 0px 15px 20px",
        }}
      >
        Members
      </Typography>
      <UserDisplay user={props.members[0]} />
    </Box>
  );
}
