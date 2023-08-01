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
query getPublicRecipeById($pubRecId: ID!) {
  getPublicRecipeById(pubRecId: $pubRecId) {
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


