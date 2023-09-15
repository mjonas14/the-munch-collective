const { AuthenticationError } = require("apollo-server-express");
const { User, PublicRecipe, PrivateRecipe } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        const user = await User.findOne({ _id: context.user._id }).populate('privateRecipes');
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    getAllPublicRecipes: async () => {
      console.log("Hit Public!");
      const recipeData = await PublicRecipe.find();
      return recipeData;
    },
    getAllPrivateRecipes: async (parent, { userId }, context) => {
      console.log("Hit Private!");
      if (context.user) {
      const recipeData = await PrivateRecipe.find({_id: context.user._id});
      return recipeData;
      }
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
    addPrivateRecipe: async (parent, { userId, input }, context) => {
      if (context.user) {
      input.userId = context.user._id;
      const newRecipe1 = await PrivateRecipe.create(input);

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { privateRecipes: newRecipe1._id } }
      );

      return newRecipe1;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // removePublicRecipe: async (parent, { recipeId }, context) => {
    //   const recipe = await PublicRecipe.findOneAndDelete({
    //     _id: recipeId,
    //   });
    //   return recipe;
    // },
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
    addUserDetails: async (
      parent,
      { bio, cityBorn, cityLive, favCuisine, signatureDish, yob },
      context
    ) => {
      if (context.user) {
        console.log(context.user._id);
        console.log(cityBorn);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            bio: bio,
            cityBorn: cityBorn,
            cityLive: cityLive,
            favCuisine: favCuisine,
            signatureDish: signatureDish,
            yob: yob,
          }
        );
        return User;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
