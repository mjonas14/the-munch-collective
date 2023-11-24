import React from "react";
import Grid from "@mui/material/Grid";

import { useQuery } from "@apollo/client";
import { QUERY_GETALLPUBLICRECIPES } from "../utils/queries";
import RecipeCardLg from "../components/RecipeCardLg";

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
          <RecipeCardLg
            key={index}
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
