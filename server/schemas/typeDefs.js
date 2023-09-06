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
        yob: Int
        createdAt: String
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

    input recipeInput {
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
        getAllPublicRecipes: [PublicRecipe]
        getPublicRecipeById(recipeId: ID!): PublicRecipe
        getPublicRecipeByMealType(mealType: String!): [PublicRecipe]
    }

    type Mutation {
        addPublicRecipe(input: recipeInput!): PublicRecipe
        removePublicRecipe(recipeId: String!): PublicRecipe
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addUserDetails(bio: String, cityBorn: String, cityLive: String, favCuisine: String, signatureDish: String, yob: Int): User
    }
`;

module.exports = typeDefs;
