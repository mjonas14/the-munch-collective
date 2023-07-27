const { AuthenticationError } = require("apollo-server-express");
const { User, PublicRecipe } = require("../models");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    getAllPublicRecipes: async () => {
      return PublicRecipe.find();
    },
    getPublicRecipe: async (parent, { mealType }) => {
      const recipeData = await PublicRecipe.find({ mealType: mealType });
      return recipeData;
    },
  },
  Mutation: {
    addPublicRecipe: async (parent, args) => {
        const newRecipe = await PublicRecipe.create(args);
  
        return newRecipe;
    },
  },
};

module.exports = resolvers;
