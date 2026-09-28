import User from "../models/usersModel.js";

export const userRepository = {
  create: (data) => {
    return User.create(data);
  },

  getUsers: ({ skip, limit, sortQuery, filter }) => {
    const query = User.find(filter).sort(sortQuery).skip(skip).limit(limit);
    return Promise.all([query, User.countDocuments(filter)]);
  },

  getUser: (id) => {
    return User.findById(id);
  },

  deleteUser: (id) => {
    return User.findByIdAndDelete(id);
  },

  updateUser: (id, data) => {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  patchUser: (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  },
};
