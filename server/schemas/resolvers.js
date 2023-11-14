const { AuthenticationError } = require("apollo-server-express");
const { User, PublicRecipe, PrivateRecipe, Potluck } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        const user = await User.findOne({ _id: context.user._id })
          .populate("privateRecipes")
          .populate("potlucks");
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    getMyPotlucks: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "potlucks"
        );
        return user;
      }
    },
    getPotluckById: async (parent, { potluckId }) => {
      const potluck = await Potluck.findOne({ _id: potluckId }).populate(
        "members"
      );
      return potluck;
    },
    getAllPublicRecipes: async () => {
      console.log("Hit Public!");
      const recipeData = await PublicRecipe.find();
      return recipeData;
    },
    getAllPrivateRecipes: async (parent, { userId }, context) => {
      console.log("Hit Private!");
      if (context.user) {
        const recipeData = await PrivateRecipe.find({ _id: context.user._id });
        return recipeData;
      }
    },
    getPublicRecipeById: async (parent, { recipeId }) => {
      return PublicRecipe.findOne({ _id: recipeId });
    },
    getPrivateRecipeById: async (parent, { recipeId }) => {
      return PrivateRecipe.findOne({ _id: recipeId });
    },
    getPublicRecipeByMealType: async (parent, { mealType }) => {
      return PublicRecipe.find({ mealType: mealType });
    },
    getAllUsers: async () => {
      return User.find();
    },
    getUserById: async (parent, { userId }, context) => {
      return User.findOne({ _id: userId }).populate("privateRecipes");
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
      { bio, cityBorn, cityLive, favCuisine, signatureDish, yob, profilePic },
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
            profilePic: profilePic,
          }
        );
        return User;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createPotluck: async (parent, { title }, context) => {
      if (context.user) {
        const createdBy = context.user;
        const potluck = await Potluck.create({ title, createdBy });

        // Add the user to the potluck's list of members
        await Potluck.findOneAndUpdate(
          { _id: potluck._id },
          { $addToSet: { members: context.user._id } }
        );

        // Add the potluck to the user's list of potlucks
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { potlucks: potluck } }
        );

        return potluck;
      }
    },
    addUserToPotluck: async (parent, { potluckId, userId }, context) => {
      const potluck = await Potluck.findOneAndUpdate(
        { _id: potluckId },
        { $addToSet: { members: userId } }
      );
      return potluck;
    },
    addFriend: async (parents, { userId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friendsNew: { friend: userId, status: 1 } } }
        );

        user = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { friendsNew: { friend: context.user._id, status: 2 } } }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    acceptFriendReq: async (parents, { requestId, friendId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { friendsNew: { $set: { _id: requestId, status: 3 } } }
        );

        user = await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { friendsNew: { friend: friendId, status: 1 } } }
        );

        user = await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { friendsNew: { friend: context.user._id, status: 1 } } }
        );
        return user;
      }
    },
    removeFriend: async (parents, { userId }, context) => {
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { friends: userId } }
      );
      return user;
    },
  },
};

module.exports = resolvers;
