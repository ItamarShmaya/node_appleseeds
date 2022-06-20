import mongoose from "mongoose";

export const outlierCommentsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  comments: {
    type: Array,
  },
});
