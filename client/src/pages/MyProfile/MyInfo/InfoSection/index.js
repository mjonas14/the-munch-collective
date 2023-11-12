import React, { useState } from "react";
import style from "../style.js";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import HouseIcon from "@mui/icons-material/House";
import Person2Icon from "@mui/icons-material/Person2";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KitchenIcon from "@mui/icons-material/Kitchen";
import StarRateIcon from "@mui/icons-material/StarRate";
import EditIcon from "@mui/icons-material/Edit";

import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../../../utils/queries";

import EditProileInfo from "./EditInfoModal";

const InfoSec = () => {
  const styles = {
    post: {
      backgroundColor: "black",
      height: "420px"
    },
  };

  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(userData);

  const [showModal, setShowModal] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    console.log("Edit info");
    setShowModal(true);
  };

  return (
    <Box
      // sx={{
      //   backgroundColor: "black",
      //   height: 420,
      // }}
      sx={style.verticalBox}
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
      <Container
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PublicIcon sx={{ marginRight: "10px" }} /> Lives in{" "}
        {userData.cityLive ? userData.cityLive : "..."}
      </Container>
      <Container
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HouseIcon sx={{ marginRight: "10px" }} /> Born in{" "}
        {userData.cityBorn ? userData.cityBorn : "..."}
      </Container>
      <Container
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Person2Icon sx={{ marginRight: "10px" }} /> Entered this earth in{" "}
        {userData.yob ? userData.yob : "..."}
      </Container>
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
      <Container
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LocalDiningIcon sx={{ marginRight: "10px" }} /> Loves to cook{" "}
        {userData.favCuisine ? userData.favCuisine : "..."}
      </Container>
      <Container
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <KitchenIcon sx={{ marginRight: "10px" }} /> Loves to eat{" "}
        {userData.signatureDish ? userData.signatureDish : "..."}
      </Container>
      <Container
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StarRateIcon sx={{ marginRight: "10px" }} /> Signature dish:{" "}
        {userData.signatureDish ? userData.signatureDish : "..."}
      </Container>
      <EditProileInfo show={showModal} set={setShowModal} />
    </Box>
  );
};

export default InfoSec;
