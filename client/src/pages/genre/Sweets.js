import React from "react";
import { Container } from "@mui/system";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useQuery } from "@apollo/client";
import { QUERY_GETPUBLICRECIPEBYMEALTYPE } from "../../utils/queries";
import RecipeCardLg from "../../components/RecipeCardLg";
import GenreHeader from "../../components/GenreHeader";

export default function Sweets() {
  const { loading, data } = useQuery(QUERY_GETPUBLICRECIPEBYMEALTYPE, {
    variables: { mealType: "dessert" },
  });

  const recipes = data?.getPublicRecipeByMealType || [];

  console.log(recipes, "recipes");
  console.log(data, "data");

  return (
    <Container>
      <GenreHeader genreName="Sweets" />
      <Grid
        container
        direction="row"
        justifyContent="left"
        alignItems="center"
        color="black"
      >
        {recipes.map((recipe, index) => (
          <RecipeCardLg
            key={index}
            recipe={recipe}
          />
        ))}
      </Grid>
    </Container>
  );
}
