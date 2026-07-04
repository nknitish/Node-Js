import { Router } from "express";

const router = Router();

let todos = [
  { id: "1", task: "Buy an Apple" },
  { id: "2", task: "Complete Node JS" },
  { id: "3", task: "Complete React JS" },
  { id: "4", task: "Complete Leetcode JS" },
];

/**
 * GET /todos
 * Get all todos or search by task
 * Example:
 * /todos
 * /todos?task=Buy an Apple
 */
router.get("/", (req, res) => {
  const { task } = req.query;

  if (task) {
    const todo = todos.find((todo) => todo.task === task);

    if (!todo) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json(todo);
  }

  res.json(todos);
});

/**
 * GET /todos/:id
 * Get todo by ID
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  res.json(todo);
});

/**
 * POST /todos
 * Create a new todo
 */
router.post("/", (req, res) => {
  const { id, task } = req.body;

  if (!id || !task) {
    return res.status(400).json({
      message: "Both id and task are required.",
    });
  }

  const existingTodo = todos.find((todo) => todo.id === id);

  if (existingTodo) {
    return res.status(409).json({
      message: "Todo with this ID already exists.",
    });
  }

  const newTodo = { id, task };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo created successfully.",
    data: newTodo,
  });
});

/**
 * PATCH /todos/:id
 * Update only the task
 */
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      message: "Task is required.",
    });
  }

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found.",
    });
  }

  todo.task = task;

  res.json({
    message: "Todo updated successfully.",
    data: todo,
  });
});

/**
 * DELETE /todos/:id
 * Delete a todo
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo not found.",
    });
  }

  const deletedTodo = todos[index];

  todos.splice(index, 1);

  res.json({
    message: "Todo deleted successfully.",
    data: deletedTodo,
  });
});

export default router;
