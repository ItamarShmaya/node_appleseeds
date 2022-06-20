import mongoose from "mongoose";
import validator from "validator";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid email");
    },
  },
  blogPosts: {
    type: Array,
    default: [],
  },

  comments: {
    type: Array,
    default: [],
  },

  has_extra_comments: {
    type: Boolean,
    default: false,
  },
});

userSchema.post("findOneAndUpdate", async function (docs, next) {
  const updatedDoc = await this.model.findOne({ _id: this._conditions._id });
  if (updatedDoc.comments.length > 1) updatedDoc.has_extra_comments = true;
  updatedDoc.save();
  next();
});
