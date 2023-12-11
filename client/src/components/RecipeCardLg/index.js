import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/styles.css";

// components
import image from "../../utils/assets/images/Home_Image.png";
import ShareRecipeModal from "../ShareRecipeModal";

const RecipeCardLg = ({ name, comment, id, img }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div>
      <Card sx={{ width: 250, height: 320, margin: "10px" }}>
        <CardActionArea
          component={Link}
          to={`/recipe/${id}`}
          sx={{ height: 270 }}
        >
          <CardMedia
            component="img"
            height="150px"
            image={img || image}
            alt={name}
            sx={{ border: "20px solid white", boxSizing: "border-box" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment && comment.length > 100
                ? comment.substring(0, 100) + "..."
                : comment}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleSubmit}
            style={{ display: "flex", justfiyContent: "center" }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
      <ShareRecipeModal show={showModal} set={setShowModal} recipeId={id} />
    </div>
  );
};

export default RecipeCardLg;
