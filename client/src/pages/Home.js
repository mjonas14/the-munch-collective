import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_GETALLPUBLICRECIPES } from "../utils/queries";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GETALLPUBLICRECIPES);
  const recipes = data?.getAllPublicRecipes || [];
  console.log(loading, "loading");
  console.log(recipes, "data");

  return (
    <div>
      <h6></h6>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        color="black"
      >
        {recipes.map((recipe, index) => (
          <RecipeCard
            name={recipe.name}
            comment={recipe.comment}
            image={recipe.img}
            id={recipe._id}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Home;
