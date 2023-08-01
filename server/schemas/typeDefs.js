const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type PublicRecipe {
        _id: ID!
        name: String!
        comment: String
        ingredients: [String!]
        method: [String!]
        img: String
        source: String
        tips: String
        mealType: String!
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
        getPublicRecipeById(pubRecId: ID!): PublicRecipe
    }

    type Mutation {
        addPublicRecipe(input: recipeInput!): PublicRecipe
        removePublicRecipe(pubRecId: String!): PublicRecipe
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
