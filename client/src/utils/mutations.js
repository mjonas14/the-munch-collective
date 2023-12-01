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
  mutation addPrivateRecipe($input: publicRecipeInput!) {
    addPrivateRecipe(input: $input) {
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

export const ADD_USER_TO_POTLUCK = gql`
  mutation addUserToPotluck($userId: String!, $potluckId: String!) {
    addUserToPotluck(userId: $userId, potluckId: $potluckId) {
      _id
      members
      title
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: String!) {
    addFriend(toUserId: $userId) {
      message
      success
    }
  }
`;

export const APPROVE_FRIEND = gql`
  mutation approveFriend($friendId: String!) {
    approveFriend(friendId: $friendId) {
      message
      success
    }
  }
`;

export const DECLINE_FRIEND = gql`
  mutation sayNoToFriend($friendId: String!) {
    sayNoToFriend(friendId: $friendId) {
      message
      success
    }
  }
`;

export const ADD_FRIEND_TO_POTLUCK = gql`
  mutation addFriendToPotluck($potluckId: String!, $friendId: String!) {
    addFriendToPotluck(potluckId: $potluckId, friendId: $friendId) {
      message
      success
    }
  }
`;

export const ADD_RECIPE_TO_POTLUCK = gql`
  mutation addRecipeToPotluck($potluckId: String!, $recId: String!) {
    addRecipeToPotluck(potluckId: $potluckId, recId: $recId) {
      message
      success
    }
  }
`;

export const REMOVE_RECIPE_FROM_POTLUCK = gql`
  mutation removeRecipeFromPotluck($potluckId: String!, $recId: String!) {
    removeRecipeFromPotluck(potluckId: $potluckId, recId: $recId) {
      message
      success
    }
  }
`;
