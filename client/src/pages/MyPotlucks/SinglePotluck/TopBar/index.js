import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import image from "../../../../utils/assets/images/Potluck_Img.jpeg";

export default function TopBar({ title, img }) {
  return (
    <Box className="list-box-users" sx={{ flexDirection: "row", alignItems: "center" }}>
      <img
        alt="Potluck cover photo"
        src={img || image}
        style={{ width: 180, height: 130, margin: "0px 20px 0px 10px", borderRadius: "16px" }}
      />
        {/* <Typography sx={{ fontSize: "35px" }}>{title.charAt(0)}</Typography> */}
      {/* </img> */}
        <header className="title">{title}</header>
    </Box>
  );
}
