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

import image from "../utils/assets/images/Home_Image.png";

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
            <Card sx={{ width: 300, height: 320, margin: "10px" }}>
               <CardActionArea
                component={Link}
                to={`/recipe/${recipe._id}`}
                sx={{ height: 270 }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
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
               <CardActions>
                 <Button
                  size="small"
                  color="primary"
                  style={{ display: "flex", justfiyContent: "center" }}
                >
                  Share
                </Button>
              </CardActions>
            </Card>
            ))}
      </Grid>
    </div>
  );
};

export default Home;
