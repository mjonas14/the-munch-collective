const { Schema, model } = require("mongoose");

const publicRecipeSchema = new Schema({
  pubRecId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  comment: {
    type: String,
  },
  ingredients: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  source: {
    type: String,
  },
  tips: {
    type: String,
  },
});

const PublicRecipe = model('PublicRecipe', publicRecipeSchema);

module.exports = PublicRecipe;
