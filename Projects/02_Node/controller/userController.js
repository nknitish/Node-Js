import User from "../models/usersModel.js";
export const userController = () => {
  const getUsers = async (req, res) => {
    const { name, email } = req.query;

    let filter = {};

    if (name) filter.name = name;
    if (email) filter.email = email;

    const response = await User.find(filter);
    res.status(200).json(response);
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

  const createUser = async (req, res) => {
    const { name, email } = req.body;

    const response = await User.create({ name, email });

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
