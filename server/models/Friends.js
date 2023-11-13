const { Schema, model } = require("mongoose");

const friendSchema = new Schema({
  activeFriends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reqFriends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendReqs: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Friends = model("Friends", friendSchema);

module.exports = Friends;
