import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { blogPostSchema } from "./blogPost.Schema.js";
import { commentSchema } from "./comment.Schema.js";
import { outlierCommentsSchema } from "./outliers.Schema.js";
import { userSchema } from "./User.Schema.js";

mongoose.connect("mongodb://127.0.0.1:27017/blog");

const User = mongoose.model("users", userSchema);
const BlogPost = mongoose.model("blogPosts", blogPostSchema);
const Comment = mongoose.model("comments", commentSchema);
const OutlierUserComments = mongoose.model(
  "outliersComments",
  outlierCommentsSchema
);

const user1 = new User({
  name: "avi",
  email: "avihagibor@gmail.com",
});

const user2 = new User({
  name: "shuli",
  email: "shulihagibor@gmail.com",
});

const user1BlogPost = new BlogPost({
  authorId: user1._id,
  content: "this is a blog post",
});

const user2BlogPost = new BlogPost({
  authorId: user2._id,
  content: "this is a blog post2",
});

const user1Comment = new Comment({
  authorId: user1._id,
  content: "this is a comment 1",
});

const user2Comment = new Comment({
  authorId: user2._id,
  content: "this is a comment 2",
});

const func = async () => {
  await user1.save();
  await user2.save();
  await user1BlogPost.save();
  await user2BlogPost.save();
  await user1Comment.save();
  await user2Comment.save();
  User.findOneAndUpdate(
    { _id: user1._id },
    { $push: { comments: user1Comment._id, blogPosts: user1BlogPost._id } },
    { upsert: true, rawResult: true },
    (err, res) => {
      if (err) return console.log(err);
      console.log("updated1");
    }
  );
  User.findOneAndUpdate(
    { _id: user2._id },
    { $push: { comments: user2Comment._id, blogPosts: user2BlogPost._id } },
    { upsert: true, rawResult: true },
    (err, res) => {
      if (err) return console.log(err);
      console.log("updated2");
    }
  );
};

func();

// if (!user1.has_extra_comments) {
//   User.findOneAndUpdate(
//     { _id: new ObjectId("62b0d518e56efe3edc1cbd2c") },
//     { $push: { comments: user1Comment._id, blogPosts: user1BlogPost._id } },
//     { upsert: true, rawResult: true },
//     (err, res) => {
//       if (err) return console.log(err);
//       console.log("updated");
//     }
//   );
// } else {
//   (async function () {
//     console.log("asd");
//     const doc = await OutlierUserComments.findOne({ _id: user1._id });
//     if (doc) doc.comments.push(user1Comment);
//     else {
//       const user1OutlierComments = new OutlierUserComments({
//         userId: user1._id,
//         comments: [user1Comment],
//       });
//       user1OutlierComments.save();
//     }
//   })();
// }
// console.log(user1._id);
// User.findOneAndUpdate(
//   { _id: user1._id },
//   {
//     $push: { comments: user1Comment._id },
//   },
//   (err, res) => {
//     if (err) return console.log(err);
//     console.log("updated");
//   }
// );
