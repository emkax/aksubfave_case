import request from "supertest";
import app from "../app.js";

describe("Admin API", () => {
    let adminToken;
    let userToken;
    let organizerToken;
    let eventId;
    let userId;

    beforeAll(async () => {
        await request(app).post("/auth/register").send({
            name: "Admin",
            email: "admin@example.com",
            password: "Password123",
            role: "ADMIN",
        });

        await request(app).post("/auth/register").send({
            name: "User",
            email: "user@example.com",
            password: "Password123",
            role: "ATTENDEE",
        });

        await request(app).post("/auth/register").send({
            name: "Organizer Admin Test",
            email: "organizer_admin@example.com",
            password: "Password123",
            role: "ORGANIZER",
        });

        const adminLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "admin@example.com",
                password: "Password123",
            });

        adminToken = adminLogin.body.data.token;

        const userLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "user@example.com",
                password: "Password123",
            });

        userToken = userLogin.body.data.token;

        const organizerLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "organizer_admin@example.com",
                password: "Password123",
            });

        organizerToken = organizerLogin.body.data.token;

        const createEvent = await request(app)
            .post("/events")
            .set("Authorization", `Bearer ${organizerToken}`)
            .send({
                title: "Admin Event",
                description: "Event by admin test organizer",
                location: "Test Location",
                date: new Date().toISOString(),
                price: 100,
                maxAttendees: 50,
                category: "SEMINAR"
            });

        eventId = createEvent.body.data.id;
    });

    test("Admin Get Events (Valid): Retrieve all -> 200", async () => {
        const res = await request(app)
            .get("/admin/events")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    test("Admin Edit Event (Valid): Admin edits any event -> 200", async () => {
        const res = await request(app)
            .put(`/admin/events/${eventId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                title: "Edited By Admin",
            });

        expect(res.statusCode).toBe(200);
    });

    test("Admin Delete Event (Valid): Admin deletes any event -> 200", async () => {
        const res = await request(app)
            .delete(`/admin/events/${eventId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    test("Admin Get Users (Valid): Retrieve all users -> 200", async () => {
        const res = await request(app)
            .get("/admin/users")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);

        userId = res.body.data?.[0]?.id || res.body.data?.users?.[0]?.id;
    });

    test("Admin Assign Role (Valid): Promote user -> 200", async () => {
        const res = await request(app)
            .patch(`/admin/users/role`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                userId: userId,
                role: "ORGANIZER",
            });

        expect(res.statusCode).toBe(200);
    });

    test("Admin Endpoints (Invalid): Access by non-admin -> 403", async () => {
        const res = await request(app)
            .get("/admin/users")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(403);
    });

    test("Admin Endpoints (Invalid): Access by guest -> 401", async () => {
        const res = await request(app)
            .get("/admin/users");

        expect(res.statusCode).toBe(401);
    });
});