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
    $cityBorn: String
    $cityLive: String
    $favCuisine: String
    $signatureDish: String
    $yob: Int
    $bio: String
  ) {
    addUserDetails(
      cityBorn: $cityBorn
      cityLive: $cityLive
      favCuisine: $favCuisine
      signatureDish: $signatureDish
      yob: $yob
      bio: $bio
    ) {
      username
      _id
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
