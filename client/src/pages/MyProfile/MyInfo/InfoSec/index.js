import React, { useState } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import HouseIcon from "@mui/icons-material/House";
import Person2Icon from "@mui/icons-material/Person2";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KitchenIcon from "@mui/icons-material/Kitchen";
import StarRateIcon from "@mui/icons-material/StarRate";
import EditIcon from "@mui/icons-material/Edit";

import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../../../utils/queries";

import EditInfoModal from "./Modal/EditInfoModal.js";

const InfoSec = () => {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <></>;
  }

  const handleEdit = (event) => {
    event.preventDefault();
    console.log("Edit info");
    setShowModal(true);
  };

  return (
    <Box
      sx={{
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
        <Typography
          sx={{
            margin: "15px 0px 15px 0px",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Info
        </Typography>
        <IconButton
          aria-label="edit"
          onClick={handleEdit}
          sx={{ margin: "15px" }}
        >
          <EditIcon />
        </IconButton>
      </Container>
      {userData.cityLive ? (
        <Container
          sx={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <PublicIcon sx={{ marginRight: "10px" }} /> Lives in{" "}
          {userData.cityLive}
        </Container>
      ) : (
        <></>
      )}
      {userData.cityBorn ? (
        <Container
          sx={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HouseIcon sx={{ marginRight: "10px" }} /> Born in {userData.cityBorn}
        </Container>
      ) : (
        <></>
      )}
      {userData.yob ? (
        <Container
          sx={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Person2Icon sx={{ marginRight: "10px" }} /> Entered this earth in{" "}
          {userData.yob}
        </Container>
      ) : (
        <></>
      )}
      <Container>
        <Typography
          sx={{
            margin: "20px 0px 20px 0px",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Munch
        </Typography>
      </Container>
      {userData.favCuisine ? (
        <Container
          sx={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalDiningIcon sx={{ marginRight: "10px" }} /> Loves to cook{" "}
          {userData.favCuisine}
        </Container>
      ) : (
        <></>
      )}
      {userData.signatureDish ? (
        <Container
          sx={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <KitchenIcon sx={{ marginRight: "10px" }} /> Loves to eat{" "}
          {userData.signatureDish}
        </Container>
      ) : (
        <></>
      )}
      {userData.signatureDish ? (
        <Container
          sx={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarRateIcon sx={{ marginRight: "10px" }} /> Signature dish:{" "}
          {userData.signatureDish}
        </Container>
      ) : (
        <></>
      )}
      <EditInfoModal show={showModal} set={setShowModal} />
    </Box>
  );
};

export default InfoSec;
