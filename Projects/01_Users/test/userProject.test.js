import assert from "node:assert/strict";
import test from "node:test";
import { postController } from "../controller/postController.js";
import { PostServices } from "../services/postServices.js";
import { userController } from "../controller/userController.js";
import { UserServices } from "../services/userServices.js";
import {
  createUserSchema,
  userQuerySchema,
} from "../validation/userValidation.js";
import { buildUserFilter } from "../utils/userQuery.js";
import { createPostSchema } from "../validation/postValidation.js";

test("create user validation trims values and rejects a blank name", () => {
  assert.deepEqual(
    createUserSchema.parse({ name: "  Ada Lovelace  ", email: " ada@example.com " }),
    { name: "Ada Lovelace", email: "ada@example.com" },
  );

  assert.equal(
    createUserSchema.safeParse({ name: "   ", email: "ada@example.com" }).success,
    false,
  );
});

test("user search filters use escaped, case-insensitive prefix patterns", () => {
  assert.deepEqual(buildUserFilter({ name: "A.+", email: "ada@example.com" }), {
    name: { $regex: "^A\\.\\+", $options: "i" },
    email: { $regex: "^ada@example\\.com", $options: "i" },
  });
});

test("user list response uses one data envelope for pagination and users", async () => {
  const originalGetUsers = UserServices.getUsers;
  const users = [{ name: "Ada", email: "ada@example.com" }];
  let response;

  UserServices.getUsers = async () => ({
    users,
    pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
  });

  try {
    await userController().getUsers(
      { validated: { query: {} } },
      {
        status(statusCode) {
          response = { statusCode };
          return this;
        },
        json(body) {
          response.body = body;
          return body;
        },
      },
    );
  } finally {
    UserServices.getUsers = originalGetUsers;
  }

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    success: true,
    message: "Users fetched successfully",
    data: {
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
      users,
    },
  });
});

test("user query parameters reject empty search strings", () => {
  assert.equal(userQuerySchema.safeParse({ name: "   " }).success, false);
  assert.equal(userQuerySchema.parse({}).page, 1);
});

test("create post validation trims text and requires a valid author ID", () => {
  assert.deepEqual(
    createPostSchema.parse({
      title: "  First post  ",
      content: "  Post content  ",
      author: "507f1f77bcf86cd799439011",
    }),
    {
      title: "First post",
      content: "Post content",
      author: "507f1f77bcf86cd799439011",
    },
  );

  assert.equal(
    createPostSchema.safeParse({
      title: "  ",
      content: "Post content",
      author: "not-an-object-id",
    }).success,
    false,
  );
});

test("delete post returns a response body with status 200", async () => {
  const originalDeletePost = PostServices.deletePost;
  const deletedPost = { _id: "507f1f77bcf86cd799439011", title: "First post" };
  let response;

  PostServices.deletePost = async () => deletedPost;

  try {
    await postController().deletePost(
      { validated: { params: { id: deletedPost._id } } },
      {
        status(statusCode) {
          response = { statusCode };
          return this;
        },
        json(body) {
          response.body = body;
          return body;
        },
      },
    );
  } finally {
    PostServices.deletePost = originalDeletePost;
  }

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    success: true,
    message: "Post Deleted successfully",
    data: deletedPost,
  });
});
