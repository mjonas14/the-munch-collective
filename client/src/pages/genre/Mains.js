import React from "react";

import { Card, CardMedia, Container } from "@mui/material";

import image from "../../utils/assets/images/Home_Image.png";
import GenreHeader from "../../components/GenreHeader";

const Mains = () => {
  const styles = {
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    card: {
      position: "relative",
    },
    overlay: {
      position: "absolute",
      color: "black",
      backgroundColor: "white",
    },
  };

  return (
    <Container>
      <GenreHeader genreName="Mains" />
      <Card>
        <CardMedia image={image} style={styles.media} />
        <div style={styles.overlay}>this text should overlay the image</div>
      </Card>
    </Container>
  );
};

export default Mains;
