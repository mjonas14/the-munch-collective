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
      createdAt
    }
  }
`;

export const QUERY_GETALLPRIVATERECIPES = gql`
  query getAllPrivateRecipes {
    getAllPrivateRecipes {
      name
      comment
      img
      ingredients
      mealType
      method
      _id
      tips
      source
      createdAt
    }
  }
`;

export const QUERY_GETPUBLICRECIPEBYID = gql`
  query getPublicRecipeById($recipeId: ID!) {
    getPublicRecipeById(recipeId: $recipeId) {
      _id
      comment
      createdAt
      img
      ingredients
      mealType
      method
      name
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
      email
      _id
      password
      bio
      cityBorn
      cityLive
      createdAt
      favCuisine
      signatureDish
      yob
      profilePic
      privateRecipes {
        name
        comment
        img
        ingredients
        mealType
        method
        _id
        tips
        source
        createdAt
      }
    }
  }
`;

export const QUERY_GETALLUSERS = gql`
  query getAllUsers {
    getAllUsers {
      _id
      username
      bio
      cityBorn
      cityLive
      createdAt
      email
      favCuisine
      password
      profilePic
      signatureDish
      yob
    }
  }
`;

export const QUERY_GETMYPOTLUCKS = gql`
  query getMyPotlucks {
    getMyPotlucks {
      potlucks {
        title
        _id
        createdAt
        img
        members {
          _id
          username
          profilePic
        }
      }
    }
  }
`;

export const QUERY_GETPOTLUCKBYID = gql`
  query getPotluckById($potluckId: ID!) {
    getPotluckById(potluckId: $potluckId) {
      _id
      title
      createdAt
      createdBy {
        username
        profilePic
      }
      img
      members {
        username
        profilePic
        _id
      }
      recipes {
        _id
        comment
        createdAt
        img
        ingredients
        mealType
        method
        name
        source
        tips
        userId
      }
    }
  }
`;
