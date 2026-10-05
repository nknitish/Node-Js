import { UserServices } from "../services/userServices.js";
import { buildUserFilter } from "../utils/userQuery.js";

export const userController = () => {
  const getUsers = async (req, res) => {
    const { name, email, page, limit, sort, order } = req.validated.query;
    const filter = buildUserFilter({ name, email });
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
    const { id } = req.validated.params;
    const user = await UserServices.getUser(id);
    res.status(200).json(user);
  };

  const createUser = async (req, res) => {
    const { name, email } = req.validated.body;

    const response = await UserServices.createNewUser({ name, email });

    res.status(201).json({
      message: "User created",
      data: response,
    });
  };

  const deleteUser = async (req, res) => {
    const { id } = req.validated.params;
    const deletedUser = await UserServices.deleteUser(id);

    res.status(200).json({ message: "User Deleted", deletedUser });
  };

  const updateUser = async (req, res) => {
    const { id } = req.validated.params;
    const { email, name } = req.validated.body;

    const updatedUser = await UserServices.updateUser(id, { name, email });

    res.status(200).json({
      message: "User Updated",
      data: updatedUser,
    });
  };

  const patchUser = async (req, res) => {
    const { id } = req.validated.params;

    console.log(req);

    const user = await UserServices.patchUser(id, req.validated.body);
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
