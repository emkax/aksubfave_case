import request from "supertest";
import app from "../app.js";


describe("Auth API", () => {
    const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "Password123",
        role: "ATTENDEE"
    };

    describe("Register", () => {
        test("Register (Valid): Register new user -> 201", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("message");
        });

        test("Register (Invalid): Duplicate email -> 409", async () => {
            await request(app).post("/auth/register").send(userData);

            const res = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(res.statusCode).toBe(409);
        });

        test("Register (Invalid): Validation errors -> 400", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "A",
                    email: "invalid-email",
                    password: "123",
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe("Login", () => {
        beforeAll(async () => {
            await request(app).post("/auth/register").send({
                name: "Login User",
                email: "login@example.com",
                password: "Password123",
                role: "ATTENDEE"
            });
        });

        test("Login (Valid): Correct credentials -> 200", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "login@example.com",
                    password: "Password123",
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty("token");
        });

        test("Login (Invalid): Wrong credentials -> 401", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "login@example.com",
                    password: "Wrongpassword123",
                });

            expect(res.statusCode).toBe(401);
        });

        test("Login (Invalid): Unregistered email -> 401", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "unknown@example.com",
                    password: "Password123",
                });

            expect(res.statusCode).toBe(401);
        });
    });
});