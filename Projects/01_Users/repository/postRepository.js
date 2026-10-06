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
};
