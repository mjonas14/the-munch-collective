const { Schema, model } = require("mongoose");

const friendRequestsSchema = new Schema({
  fromUserId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  toUserId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: [
    {
      type: String,
      enum: ['pending', 'accepted', 'noThankYou', 'blocked']
    },
  ],
});

const FriendRequests = model("FriendRequests", friendRequestsSchema);

module.exports = FriendRequests;
