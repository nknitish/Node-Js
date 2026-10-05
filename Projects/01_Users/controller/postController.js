import { PostServices } from "../services/postServices.js";
import { successResponse } from "../utils/apiResponse.js";

export const postController = () => {
  const createPost = async (req, res) => {
    const post = await PostServices.createPost(req.validated.body);
    return successResponse(res, 201, post, "Post created");
  };

  const getPosts = async (req, res) => {
    const posts = await PostServices.getPosts();
    return successResponse(res, 200, posts, "Posts fetched successfully");
  };

  const getPost = async (req, res) => {
    const { id } = req.validated.params;
    const post = await PostServices.getPost(id);
    return successResponse(res, 200, post, "Post fetched successfully");
  };

  const updatePost = async (req, res) => {
    const { id } = req.validated.params;
    const post = await PostServices.updatePost(id, req.validated.body);

    return successResponse(res, 200, post, "Post Updated successfully");
  };

  const deletePost = async (req, res) => {
    const { id } = req.validated.params;
    const post = await PostServices.deletePost(id);
    return successResponse(res, 200, post, "Post Deleted successfully");
  };

  return { createPost, getPosts, getPost, updatePost, deletePost };
};
