const { AuthenticationError } = require("apollo-server-express");
const { User, PublicRecipe } = require("../models");
const { signToken } = require("../utils/auth");

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
    addPublicRecipe: async (parent, { input }, context) => {
      const newRecipe = await PublicRecipe.create(input);

      return newRecipe;
    },
    removePublicRecipe: async (parent, { pubRecId }, context) => {
      const recipe = await PublicRecipe.findOneAndDelete({
        pubRecId: pubRecId,
      });
      return recipe;
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError(
          "No profile with this username has been found"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
