const { AuthenticationError } = require("apollo-server-express");
const { User, PublicRecipe } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // getMe: async (parent, args, context) => {
    //   if (context.user) {
    //     console.log(context.user);
    //     const user = await User.findOne({ _id: context.user._id });
    //     return user;
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },
    getAllPublicRecipes: async () => {
      console.log("Hit!");
      const recipeData = await PublicRecipe.find();
      return recipeData;
    },
    getPublicRecipeById: async (parent, { recipeId }) => {
      return PublicRecipe.findOne({ _id: recipeId });
    },
    getPublicRecipeByMealType: async (parent, { mealType }) => {
      return PublicRecipe.find({ mealType: mealType });
    },
  },
  Mutation: {
    addPublicRecipe: async (parent, { input }, context) => {
      const newRecipe = await PublicRecipe.create(input);

      return newRecipe;
    },
    // removePublicRecipe: async (parent, { recipeId }, context) => {
    //   const recipe = await PublicRecipe.findOneAndDelete({
    //     _id: recipeId,
    //   });
    //   return recipe;
    // },
    // addUser: async (parent, { username, email, password }) => {
    //   const user = await User.create({ username, email, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    // login: async (parent, { username, password }) => {
    //   const user = await User.findOne({ username });

    //   if (!user) {
    //     throw new AuthenticationError(
    //       "No profile with this username has been found"
    //     );
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError("Incorrect password!");
    //   }

    //   const token = signToken(user);
    //   return { token, user };
    // },
  },
};

module.exports = resolvers;
