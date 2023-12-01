const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    cityBorn: {
      type: String,
    },
    cityLive: {
      type: String,
    },
    favCuisine: {
      type: String,
    },
    signatureDish: {
      type: String,
    },
    yob: {
      type: Number,
    },
    profilePic: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    privateRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "PrivateRecipe",
      },
    ],
    friendsNew: [
      {
        friend: {
          type: String,
          ref: "User",
        },
        status: {
          type: Number,
        },
      },
    ],
    potlucks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Potluck",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
