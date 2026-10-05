import { UserServices } from "../services/userServices.js";
import { successResponse } from "../utils/apiResponse.js";

export const userController = () => {
  const getUsers = async (req, res) => {
    const result = await UserServices.getUsers(req.validated.query);

    return successResponse(
      res,
      200,
      {
        pagination: result.pagination,
        data: result.users,
      },
      "Users fetched successfully",
    );
  };

  const getUser = async (req, res) => {
    const { id } = req.validated.params;
    const user = await UserServices.getUser(id);
    return successResponse(res, 200, user, "Users fetched successfully");
  };

  const createUser = async (req, res) => {
    const { name, email } = req.validated.body;

    const response = await UserServices.createNewUser({ name, email });

    return successResponse(res, 201, response, "User created");
  };

  const deleteUser = async (req, res) => {
    const { id } = req.validated.params;
    const deletedUser = await UserServices.deleteUser(id);

    return successResponse(res, 200, deletedUser, "User Deleted");
  };

  const updateUser = async (req, res) => {
    const { id } = req.validated.params;
    const { email, name } = req.validated.body;

    const updatedUser = await UserServices.updateUser(id, { name, email });

    return successResponse(res, 200, updatedUser, "User Updated");
  };

  const patchUser = async (req, res) => {
    const { id } = req.validated.params;

    const user = await UserServices.patchUser(id, req.validated.body);
    return successResponse(res, 200, user, "User Updated");
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
