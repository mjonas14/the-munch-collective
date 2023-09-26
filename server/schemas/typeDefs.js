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
        tips: String
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
        getPublicRecipeByMealType(mealType: String!): [PublicRecipe]
        getAllUsers: [User]
    }

    type Mutation {
        addPublicRecipe(input: publicRecipeInput!): PublicRecipe
        addPrivateRecipe(userId: String!, input: publicRecipeInput!): PrivateRecipe
        removePublicRecipe(recipeId: String!): PublicRecipe
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addUserDetails(bio: String, cityBorn: String, cityLive: String, favCuisine: String, signatureDish: String, yob: Float, profilePic: String): User
        createPotluck(title: String!): Potluck
    }
`;

module.exports = typeDefs;
