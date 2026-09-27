import User from "../models/usersModel.js";
export const userRepository = {
  create: (data) => {
    return User.create(data);
  },
  getUsers: ({ skip, limit, sortQuery, filter }) => {
    const query = User.find(filter).sort(sortQuery).skip(skip).limit(limit);
    return Promise.all([query, User.countDocuments(filter)]);
  },
};
