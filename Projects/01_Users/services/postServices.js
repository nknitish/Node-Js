import { postRepository } from "../repository/postRepository.js";
import { AppError } from "../errors/AppError.js";
import { userRepository } from "../repository/userRepository.js";

export const PostServices = {
  createPost: async (data) => {
    const user = await userRepository.findById(data.author);

    if (!user) {
      throw new AppError("Invalid Author ID", 404);
    }
    return postRepository.create(data);
  },
  getPosts: () => {
    return postRepository.getPosts();
  },
  getPost: async (postId) => {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return post;
  },
  updatePost: async (postId, data) => {
    const post = await postRepository.updatePost(postId, data);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    return post;
  },
  deletePost: async (postId) => {
    const post = await postRepository.deletePost(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return post;
  },
};
