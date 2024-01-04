import React from "react";
import {
  Container,
  Avatar,
  Typography,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from "../../utils/queries";

export default function UserDisplay(props) {
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: props.userId },
  });
  const userData = data?.getUserById || [];

  if (loading) {
    return (
      <CircularProgress />
      //   <Container 
      //   sx={{
      //     backgroundColor: "#EBECF0",
      //     borderRadius: "16px",
      //     margin: "10px 0px 10px 0px",
      //     display: "flex",
      //     justifyContent: "space-between",
      //     width: "75%",
      //     padding: "0px",
      //   }}
      // >
      //   <Container
      //     sx={{
      //       display: "flex",
      //       alignItems: "center",
      //     }}
      //   >
      //     <Avatar
      //       alt="Profile picture"
      //       sx={{ width: 45, height: 45, margin: "10px 0px 10px 0px" }}
      //     >
      //     </Avatar>
      //   </Container>
      // </Container>
    );
  }

  return (
    <CardActionArea disabled={props.isDisabled} component={Link} to={`/user/${props.userId}`}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Profile picture"
          src={userData.profilePic}
          sx={{ width: 45, height: 45, margin: "10px 0px 10px 0px" }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {userData.username.charAt(0)}
          </Typography>
        </Avatar>
        <Typography sx={{ fontSize: "15px", marginLeft: "20px" }}>
          {userData.username}
        </Typography>
      </Container>
    </CardActionArea>
  );
}
