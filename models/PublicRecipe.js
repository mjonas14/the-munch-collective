const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const publicRecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  tips: {
    type: String,
  },
  mealType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, 
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const PublicRecipe = model("PublicRecipe", publicRecipeSchema);

module.exports = PublicRecipe;
