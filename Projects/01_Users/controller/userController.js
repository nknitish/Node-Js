import User from "../models/usersModel.js";
import { UserServices } from "../services/userServices.js";

export const userController = () => {
  const getUsers = async (req, res) => {
    const { name, email, page, limit, sort, order } = req.query;

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name.trim(),
        $options: "i",
      };
    }

    if (email) {
      filter.email = {
        $regex: email.trim(),
        $options: "i",
      };
    }

    const skip = (page - 1) * limit;
    const sortQuery = sort ? { [sort]: order === "desc" ? -1 : 1 } : {};

    const [users, total] = await UserServices.getUsers({
      skip,
      limit,
      sortQuery,
      filter,
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      data: users,
    });
  };

  const getUser = async (req, res) => {
    const { id } = req.params;
    const response = await User.findById(id);

    if (!response) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(response);
  };

  const createUser = async (req, res, next) => {
    const { name, email } = req.body;

    const response = await UserServices.createNewUser({ name, email });

    res.status(201).json({
      message: "User created",
      data: response,
    });
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ message: "User Deleted", deletedUser });
  };

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not found" });
    }

    res.status(200).json({ message: "User Updated", data: updatedUser });
  };

  const patchUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateData = {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
    };
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    res.status(200).json({ message: "User Updated", data: user });
  };

  return {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    patchUser,
  };
};
