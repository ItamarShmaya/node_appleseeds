import mongoose from "mongoose";

export const blogPostSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: new Date(),
  },

  content: {
    type: String,
    required: true,
    minLength: 10,
  },

  comments: {
    type: Array,
  },
});
