import mongoose from "mongoose";
import Post from "../models/postModel.js";

export const postRepository = {
  create: async (data) => {
    const post = await Post.create(data);
    return post.populate("author", "name email");
  },

  getPosts: () => Post.find().populate("author", "name email"),

  findById: (postId) => Post.findById(postId).populate("author", "name email"),

  updatePost: (postId, data) =>
    Post.findByIdAndUpdate(postId, data, {
      returnDocument: "after",
      runValidators: true,
    }).populate("author", "name email"),

  deletePost: (postId) =>
    Post.findByIdAndDelete(postId).populate("author", "name email"),
  findByAuthor: (authorId) => {
    return Post.find({ author: authorId }).populate("author", "name email");
  },
  deleteByAuthor: (authorId, session) => {
    return Post.deleteMany({ author: authorId }, { session });
  },

  getPostCountByAuthor: (authorId) => {
    return Post.aggregate([
      {
        $match: {
          author: new mongoose.Types.ObjectId(authorId),
        },
      },
      {
        $group: {
          _id: "$author",
          postCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          authorId: "$_id",
          postCount: 1,
        },
      },
    ]);
  },
  getPostStatsByAuthor: () => {
    return Post.aggregate([
      // 1. Group posts by author
      {
        $group: {
          _id: "$author",
          postCount: { $sum: 1 },
        },
      },

      // 2. Join with users collection
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "authorDetails",
        },
      },

      // 3. Convert [user] → user
      {
        $unwind: "$authorDetails",
      },

      // 4. Shape the final response
      {
        $project: {
          _id: 0,
          authorId: "$_id",
          authorName: "$authorDetails.name",
          authorEmail: "$authorDetails.email",
          postCount: 1,
        },
      },

      // 5. Highest number of posts first
      {
        $sort: {
          postCount: -1,
        },
      },
    ]);
  },
};
