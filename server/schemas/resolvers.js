const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  PublicRecipe,
  PrivateRecipe,
  Potluck,
  FriendRequests,
} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
          .populate("privateRecipes")
          .populate("potlucks")
          .populate("friends");
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
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
      const potluck = await Potluck.findOne({ _id: potluckId })
        .populate("members")
        .populate("recipes");
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
    getFriendRequest: async (parents, { toUserId }, context) => {
      if (context.user) {
        const fromUserId = context.user._id;

        const friendRequest = await FriendRequests.findOne({
          fromUserId: fromUserId,
          toUserId: toUserId,
        });

        console.log(friendRequest);

        return friendRequest;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getAllMyRequests: async (parents, args, context) => {
      if (context.user) {
        return await FriendRequests.find({ toUserId: context.user._id })
          .populate("fromUserId")
          .populate("toUserId");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addPublicRecipe: async (parent, { input }, context) => {
      const newRecipe = await PublicRecipe.create(input);

      return newRecipe;
    },
    addPrivateRecipe: async (parent, { input }, context) => {
      if (context.user) {
        input.userId = context.user._id;
        input.createdBy = context.user;
        const newRecipe1 = await PrivateRecipe.create(input);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { privateRecipes: newRecipe1._id } }
        );

        return newRecipe1;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    addFriend: async (parents, { toUserId }, context) => {
      if (context.user) {
        const fromUserId = context.user._id;

        const doesExist = await FriendRequests.findOne({
          fromUserId,
          toUserId,
        });

        if (doesExist) {
          return {
            success: false,
            message: "Friend request already sent",
          };
        }

        const friendRequest = await FriendRequests.create({
          fromUserId,
          toUserId,
          status: "pending",
        });

        return {
          success: true,
          message: "Friend request sent!",
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    approveFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const userId = context.user._id;

        // find the request we want to approve
        const request = await FriendRequests.findOne({
          fromUserId: friendId,
          toUserId: userId,
          status: "pending",
        });

        // if it doesnt exist, post message
        if (!request) {
          return {
            success: false,
            message: "Invalid friend request approved",
          };
        }

        // change and save
        request.status = "accepted";
        await request.save();

        // update users with friend
        const user = await User.findOne({ _id: context.user._id });
        const friend = await User.findOne({ _id: request.fromUserId });
        user.friends.push(friend);
        friend.friends.push(user);
        await user.save();
        await friend.save();

        return {
          success: true,
          message: "Friend request approved",
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    sayNoToFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const userId = context.user._id;

        // find the request we want to approve
        const request = await FriendRequests.findOne({
          fromUserId: friendId,
          toUserId: userId,
        });

        // if it doesnt exist, post message
        if (!request) {
          return {
            success: false,
            message: "Invalid friend request approved",
          };
        }

        // change and save
        request.status = "noThankYou";
        await request.save();

        return {
          success: true,
          message: "Denied friend request",
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriendToPotluck: async (parent, { potluckId, friendId }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: friendId });
        const potluck = await Potluck.findOne({ _id: potluckId });

        if (!user) {
          return {
            success: false,
            message: "User doesn't exist.",
          };
        }

        if (!potluck) {
          return {
            success: false,
            message: "Potluck doesn't exist.",
          };
        }

        if (
          potluck.members.some(
            (member) => member._id.toString() === friendId.toString()
          )
        ) {
          return {
            success: false,
            message: `${user.username} is already a member`,
          };
        }

        potluck.members.push(user);
        await potluck.save();

        // Add the potluck to the user's list of potlucks
        await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { potlucks: potluck } }
        );

        return {
          success: true,
          message: `${user.username} successfully added to Potluck!`,
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addRecipeToPotluck: async (parent, { potluckId, recId }, context) => {
      if (context.user) {
        const recipe = await PrivateRecipe.findOne({ _id: recId });
        const potluck = await Potluck.findOneAndUpdate(
          { _id: potluckId },
          { $addToSet: { recipes: recipe } }
        );

        if (!potluck) {
          return {
            success: false,
            message: "Potluck does not exist",
          };
        }
        if (!recipe) {
          return {
            success: false,
            message: "Recipe does not exist",
          };
        }
        return {
          success: true,
          message: "Recipe successfully added to potluck",
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeRecipeFromPotluck: async (parent, { potluckId, recId }, context) => {
      if (context.user) {
        const potluck = await Potluck.findOneAndUpdate(
          { _id: potluckId },
          { $pull: { recipes: recId } }
        );

        if (!potluck) {
          return {
            success: false,
            message: "Potluck does not exist",
          };
        }

        return {
          success: true,
          message: "Recipe successfully removed to potluck",
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
