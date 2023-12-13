import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../../../utils/queries";

import EditProfileModal from "./Modal/EditProfileModal.js";

const ProfileSec = () => {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(userData, "data of user");

  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleEdit = (event) => {
    event.preventDefault();
    console.log("Edit info");
    setShowModal(true);
  };

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
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3></h3>
        <IconButton
          aria-label="edit"
          onClick={handleEdit}
          sx={{ marginTop: "15px", marginRight: "15px" }}
        >
          <EditIcon />
        </IconButton>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar
          alt="Profile picture"
          src={userData.profilePic}
          sx={{ width: 150, height: 150 }}
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
            marginTop: "15px",
          }}
        >
          {userData.username}
        </Typography>
      </Container>
      <EditProfileModal show={showModal} set={setShowModal} />
    </Box>
  );
};

export default ProfileSec;
