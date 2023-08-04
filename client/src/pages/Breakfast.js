import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";
import { Card } from "@mui/material";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_GETPUBLICRECIPEBYMEALTYPE } from "../utils/queries";

export default function Breakfast() {

  const { loading, data } = useQuery(QUERY_GETPUBLICRECIPEBYMEALTYPE, {
    variables: { mealType: "breakfast" },
  });

  const recipes = data?.getPublicRecipeByMealType || [];

  console.log(recipes, "recipes");
  console.log(data, "data");

  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: 120, marginTop: 3 }}
        backgroundColor="#e0e0e0"
      >
        <Typography variant="h3" component="div">
          Breakfast
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        sx={{ minHeight: 800, marginTop: 3 }}
        backgroundColor="#e0e0e0"
      >
        {recipes.map((recipe, index) => (
        <Card sx={{ width: 300, height: 320, margin: "10px" }}>
               <CardActionArea
                sx={{ height: 270 }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.img}
                  alt={recipe.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.name}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     {recipe.comment}
                   </Typography>
                 </CardContent>
               </CardActionArea>
            </Card>
        ))}
      </Grid>
    </Container>
  );
}
