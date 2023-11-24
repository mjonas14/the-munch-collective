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

export const QUERY_GETPRIVATERECIPEBYID = gql`
  query getPrivateRecipeById($recipeId: ID!) {
    getPrivateRecipeById(recipeId: $recipeId) {
      _id
      name
      comment
      createdAt
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
      potlucks {
        _id
        title
      }
      privateRecipes {
        _id
        comment
        createdAt
        ingredients
        mealType
        method
        name
        source
        tips
        userId
      }
      friends {
        _id
        username
      }
      profilePic
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

export const QUERY_GET_MY_POTLUCKS = gql`
  query getMyPotlucks {
    getMyPotlucks {
      _id
      username
      potlucks {
        _id
        title
      }
    }
  }
`;

export const QUERY_GET_POTLUCK_BY_ID = gql`
  query getPotluckById($potluckId: ID!) {
    getPotluckById(potluckId: $potluckId) {
      _id
      title
      createdAt
      createdBy {
        _id
        username
        profilePic
      }
      img
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
      members {
        _id
        username
        email
        profilePic
      }
    }
  }
`;

export const QUERY_GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
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
      privateRecipes {
        _id
        name
        comment
        createdAt
        img
        ingredients
        mealType
        method
        source
        tips
        userId
      }
    }
  }
`;

export const QUERY_GET_FRIEND_REQUEST = gql`
  query getFriendRequest($toUserId: String!) {
    getFriendRequest(toUserId: $toUserId) {
      _id
      status
    }
  }
`;

export const QUERY_GET_ALL_MY_REQUESTS = gql`
  query getAllMyRequests {
    getAllMyRequests {
      _id
      fromUserId {
        _id
      }
      status
      toUserId {
        _id
      }
    }
  }
`;
