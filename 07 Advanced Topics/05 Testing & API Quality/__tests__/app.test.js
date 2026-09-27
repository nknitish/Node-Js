import request from "supertest";
import app from "../app.js";

describe("User API", () => {
  test("GET /health returns ok", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("GET /api/users returns an array", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/users rejects short name", async () => {
    const response = await request(app).post("/api/users").send({ name: "A" });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
