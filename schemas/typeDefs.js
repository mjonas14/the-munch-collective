const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bio: String
        cityBorn: String
        cityLive: String
        favCuisine: String
        signatureDish: String
        yob: Float
        profilePic: String
        createdAt: String
        privateRecipes: [PrivateRecipe]
        potlucks: [Potluck]
        friends: [User]
    }

    type FriendRequests {
        _id: ID
        fromUserId: User
        toUserId: User
        status: String
    }

    type PublicRecipe {
        _id: ID
        name: String!
        comment: String
        ingredients: [String!]
        method: [String!]
        img: String
        source: String
        tips: String
        mealType: String!
        createdAt: String
    }

    type PrivateRecipe {
        _id: ID
        userId: String!
        createdBy: User
        name: String!
        comment: String
        ingredients: [String!]
        method: [String!]
        img: String
        source: String
        tips: [String]
        mealType: String!
        createdAt: String
    }

    type Potluck {
        _id: ID
        title: String!
        createdBy: User!
        createdAt: String
        members: [User]
        recipes: [PrivateRecipe]
        img: String
    }

    input publicRecipeInput {
        name: String!
        comment: String
        ingredients: [String!]
        method: [String!]
        img: String
        source: String
        tips: [String]
        mealType: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getMe: User
        getMyPotlucks: User
        getPotluckById(potluckId: ID!): Potluck
        getAllPublicRecipes: [PublicRecipe]
        getAllPrivateRecipes: [PrivateRecipe]
        getPublicRecipeById(recipeId: ID!): PublicRecipe
        getPrivateRecipeById(recipeId: ID!): PrivateRecipe
        getPublicRecipeByMealType(mealType: String!): [PublicRecipe]
        getAllUsers: [User]
        getUserById(userId: String!): User
        getFriendRequest(toUserId: String!): FriendRequests
        getAllMyRequests: [FriendRequests]
    }

    type Mutation {
        addPublicRecipe(input: publicRecipeInput!): PublicRecipe
        addPrivateRecipe(input: publicRecipeInput!): PrivateRecipe
        removePublicRecipe(recipeId: String!): PublicRecipe
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addUserDetails(bio: String, cityBorn: String, cityLive: String, favCuisine: String, signatureDish: String, yob: Float, profilePic: String): User
        createPotluck(title: String!): Potluck
        addUserToPotluck(userId: String!, potluckId: String!): Potluck
        addFriend(toUserId: String!): Response
        removeFriend(friendId: String!): Response
        approveFriend(friendId: String!): Response
        sayNoToFriend(friendId: String!): Response
        addFriendToPotluck(potluckId: String!, friendId: String!): Response
        addRecipeToPotluck(potluckId: String!, recId: String!): Response
        removeRecipeFromPotluck(potluckId: String!, recId: String!): Response
    }

    type Response {
        success: Boolean,
        message: String,
    }
`;

module.exports = typeDefs;
