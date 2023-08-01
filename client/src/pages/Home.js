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
      <h1>Dinners for the week ahead:</h1>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {recipes.map((recipe, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345, height: 320 }}>
              <CardActionArea component={Link} to={`/recipe/${recipe._id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt="green iguana"
                  
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
                <Button size="small" color="primary" style={{ display: "flex", justfiyContent: "center" }}>
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
