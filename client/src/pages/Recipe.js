import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_GETPUBLICRECIPEBYID } from "../utils/queries";

const Recipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_GETPUBLICRECIPEBYID, {
    variables: { pubRecId: recipeId },
  });

  const recipe = data?.getPublicRecipeById || [];

  console.log(recipe, "recipe");
  console.log(data, "data");

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Recipe</h1>
    </div>
  );
};

export default Recipe;
