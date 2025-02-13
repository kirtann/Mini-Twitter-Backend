import mongoose, { Schema, Types, model } from "mongoose";

const tweetSchema = new Schema(
  {
    content: {
      type: String,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Tweet = mongoose.models.Tweet || model("Tweet", tweetSchema);
