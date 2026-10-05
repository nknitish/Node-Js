import { AppError } from "../errors/AppError.js";
import { userRepository } from "../repository/userRepository.js";

export const UserServices = {
  createNewUser: (data) => {
    return userRepository.create(data);
  },

  getUsers: ({ skip, limit, sortQuery, filter }) => {
    return userRepository.getUsers({ skip, limit, sortQuery, filter });
  },

  getUser: async (id) => {
    const user = await userRepository.getUser(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  deleteUser: async (id) => {
    const user = await userRepository.deleteUser(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
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
};
