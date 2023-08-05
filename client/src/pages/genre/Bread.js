import React from "react";
import { 
    Container,
    Grid
} from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_GETPUBLICRECIPEBYMEALTYPE } from "../../utils/queries";

import RecipeCard from '../../components/RecipeCard';
import GenreHeader from "../../components/GenreHeader";

const Bread = () => {
  const { loading, data } = useQuery(QUERY_GETPUBLICRECIPEBYMEALTYPE, {
    variables: { mealType: "bread" },
  });

  const recipes = data?.getPublicRecipeByMealType || [];

  return (
    <Container>
      <GenreHeader genreName="Bread" />
      <Grid
        container
        direction="row"
        justifyContent="left"
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
    </Container>
  );
};

export default Bread;
