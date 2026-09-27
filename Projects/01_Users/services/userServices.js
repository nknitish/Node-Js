import { userRepository } from "../repository/userRepository.js";

export const UserServices = {
  createNewUser: (data) => {
    return userRepository.create(data);
  },

  getUsers: ({ skip, limit, sortQuery, filter }) => {
    return userRepository.getUsers({ skip, limit, sortQuery, filter });
  },
};
