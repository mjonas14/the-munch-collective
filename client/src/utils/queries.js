import { gql } from "@apollo/client";

export const QUERY_GETALLPUBLICRECIPES = gql`
  query getPublicRecipes {
    getAllPublicRecipes {
      name
      comment
      img
      ingredients
      mealType
      method
      _id
      tips
      source
    }
  }
`;

export const QUERY_GETPUBLICRECIPEBYID = gql`
  query getPublicRecipeById($recipeId: ID!) {
    getPublicRecipeById(recipeId: $recipeId) {
      _id
      name
      comment
      img
      ingredients
      mealType
      method
      source
      tips
    }
  }
`;

export const QUERY_GETPUBLICRECIPEBYMEALTYPE = gql`
  query getPublicRecipeByMealType($mealType: String!) {
    getPublicRecipeByMealType(mealType: $mealType) {
      name
      _id
      comment
      img
      ingredients
      mealType
      method
      source
      tips
    }
  }
`;

export const QUERY_GETME = gql`
  query getMe {
    getMe {
      username
      password
      email
      _id
    }
  }
`;
