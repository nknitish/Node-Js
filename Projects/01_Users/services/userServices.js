import { AppError } from "../errors/AppError.js";
import { postRepository } from "../repository/postRepository.js";
import { userRepository } from "../repository/userRepository.js";
import { buildUserFilter } from "../utils/userQuery.js";
import mongoose from "mongoose";

export const UserServices = {
  createNewUser: (data) => {
    return userRepository.create(data);
  },

  getUsers: async ({ name, email, page, limit, sort, order }) => {
    const filter = buildUserFilter({ name, email });

    const skip = (page - 1) * limit;

    const sortQuery = sort ? { [sort]: order === "desc" ? -1 : 1 } : {};

    const [users, total] = await userRepository.getUsers({
      skip,
      limit,
      sortQuery,
      filter,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  getUser: async (id) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  deleteUser: async (id) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await postRepository.deleteByAuthor(id, session);
      const deletedUser = await userRepository.deleteUser(id, session);

      await session.commitTransaction();

      return deletedUser;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  },

  updateUser: async (id, data) => {
    const user = await userRepository.updateUser(id, data);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  patchUser: async (id, updateData) => {
    const response = await userRepository.patchUser(id, updateData);

    if (!response) {
      throw new AppError("User not found", 404);
    }

    return response;
  },
  getUserPosts: async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return postRepository.findByAuthor(userId);
  },
};
