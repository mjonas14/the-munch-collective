import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Box,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/styles.css";

// components
import image from "../../utils/assets/images/Home_Image.png";
import ShareRecipeModal from "../ShareRecipeModal";

const RecipeCardLg = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(recipe);
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div>
      <Card sx={{ width: 250, height: 320, margin: "10px" }}>
        <CardActionArea
          component={Link}
          to={`/recipe/${recipe._id}`}
          sx={{ height: 270 }}
        >
          <CardMedia
            component="img"
            height="150px"
            image={recipe.img || image}
            alt={recipe.name}
            sx={{ border: "20px solid white", boxSizing: "border-box" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {recipe.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.comment && recipe.comment.length > 100
                ? recipe.comment.substring(0, 100) + "..."
                : recipe.comment}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          <Avatar
            alt="Profile picture"
            src={recipe.createdBy ? recipe.createdBy.profilePic : ""}
            sx={{ width: 20, height: 20, mr: "20px", textDecoration: "none" }}
            component={Link}
            to={`/user/${recipe.createdBy ? recipe.createdBy._id : ""}`}
          >
            <Typography sx={{ fontSize: "10px", mt: "2px" }}>
              {recipe.createdBy ? recipe.createdBy.username.charAt(0) : ""}
            </Typography>
          </Avatar>
        </Box>
      </Card>
      <ShareRecipeModal
        show={showModal}
        set={setShowModal}
        recipeId={recipe._id}
      />
    </div>
  );
};

export default RecipeCardLg;
