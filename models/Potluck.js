const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const potlockSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "PrivateRecipe",
    },
  ],
  img: {
    type: String,
  },
});

const Potluck = model("Potluck", potlockSchema);

module.exports = Potluck;
