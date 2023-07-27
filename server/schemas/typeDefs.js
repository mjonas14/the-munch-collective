const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type PublicRecipe {
        pubRecId: ID!
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
        pubRecId: String!
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
        getPublicRecipe(mealType: String!): [PublicRecipe]
    }

    type Mutation {
        addPublicRecipe(input: recipeInput!): PublicRecipe
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
