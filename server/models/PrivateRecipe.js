const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const privateRecipeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  method: [
    {
      type: String,
      required: true,
    },
  ],
  img: {
    type: String,
  },
  source: {
    type: String,
  },
  tips: [
    {
      type: String,
    },
  ],
  mealType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const PrivateRecipe = model("PrivateRecipe", privateRecipeSchema);

module.exports = PrivateRecipe;
