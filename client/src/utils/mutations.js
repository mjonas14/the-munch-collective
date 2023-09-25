import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
        password
        _id
      }
    }
  }
`;

export const ADD_USER_DETAILS = gql`
  mutation addUserDetails(
    $bio: String
    $cityBorn: String
    $cityLive: String
    $favCuisine: String
    $signatureDish: String
    $yob: Float
    $profilePic: String
  ) {
    addUserDetails(
      bio: $bio
      cityBorn: $cityBorn
      cityLive: $cityLive
      favCuisine: $favCuisine
      signatureDish: $signatureDish
      yob: $yob
      profilePic: $profilePic
    ) {
      username
      yob
      signatureDish
      favCuisine
      email
      cityLive
      createdAt
      cityBorn
      bio
      _id
      profilePic
    }
  }
`;

export const ADD_PUBLIC_RECIPE = gql`
  mutation addPublicRecipe($input: recipeInput!) {
    addPublicRecipe(input: $input) {
      comment
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

export const ADD_PRIVATE_RECIPE = gql`
  mutation addPrivateRecipe($userId: String!, $input: publicRecipeInput!) {
    addPrivateRecipe(userId: $userId, input: $input) {
      name
      userId
      _id
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

export const CREATE_POTLUCK = gql`
  mutation createPotluck($title: String!) {
    createPotluck(title: $title) {
      _id
      createdAt
      title
      createdBy {
        _id
      }
    }
  }
`;
