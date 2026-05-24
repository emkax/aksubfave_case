import request from "supertest";
import app from "../app.js";

describe("Event API", () => {
    let organizerToken;
    let attendeeToken;
    let secondOrganizerToken;
    let eventId;

    beforeAll(async () => {
        await request(app).post("/auth/register").send({
            name: "Organizer",
            email: "organizer@example.com",
            password: "Password123",
            role: "ORGANIZER",
        });

        await request(app).post("/auth/register").send({
            name: "Attendee",
            email: "attendee@example.com",
            password: "Password123",
            role: "ATTENDEE",
        });

        await request(app).post("/auth/register").send({
            name: "Organizer2",
            email: "organizer2@example.com",
            password: "Password123",
            role: "ORGANIZER",
        });

        const organizerLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "organizer@example.com",
                password: "Password123",
            });

        organizerToken = organizerLogin.body.data.token;

        const attendeeLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "attendee@example.com",
                password: "Password123",
            });

        attendeeToken = attendeeLogin.body.data.token;

        const secondOrganizerLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "organizer2@example.com",
                password: "Password123",
            });

        secondOrganizerToken = secondOrganizerLogin.body.data.token;
    });

    test("Get Events (Valid): Public retrieval -> 200", async () => {
        const res = await request(app).get("/events");

        expect(res.statusCode).toBe(200);
    });

    test("Create Event (Valid): Organizer creates event -> 201", async () => {
        const res = await request(app)
            .post("/events")
            .set("Authorization", `Bearer ${organizerToken}`)
            .send({
                title: "Music Festival",
                description: "Annual music event",
                location: "Jakarta",
                date: new Date().toISOString(),
                price: 150,
                maxAttendees: 500,
                category: "CONCERT"
            });

        expect(res.statusCode).toBe(201);

        eventId = res.body.data.id;
    });

    test("Create Event (Invalid): Attendee tries to create event -> 403", async () => {
        const res = await request(app)
            .post("/events")
            .set("Authorization", `Bearer ${attendeeToken}`)
            .send({
                title: "Hackathon",
                description: "Hacking event",
                location: "Jakarta",
                date: new Date().toISOString(),
                price: 0,
                maxAttendees: 200,
                category: "CONFERENCE"
            });

        expect(res.statusCode).toBe(403);
    });

    test("Update Event (Valid): Organizer edits own event -> 200", async () => {
        const res = await request(app)
            .put(`/events/${eventId}`)
            .set("Authorization", `Bearer ${organizerToken}`)
            .send({
                title: "Updated Festival",
            });

        expect(res.statusCode).toBe(200);
    });

    test("Update Event (Invalid): Organizer edits another's event -> 403", async () => {
        const res = await request(app)
            .put(`/events/${eventId}`)
            .set("Authorization", `Bearer ${secondOrganizerToken}`)
            .send({
                title: "Hacked Event",
            });

        expect(res.statusCode).toBe(403);
    });

    test("Delete Event (Invalid): Organizer deletes another's event -> 403", async () => {
        const res = await request(app)
            .delete(`/events/${eventId}`)
            .set("Authorization", `Bearer ${secondOrganizerToken}`);

        expect(res.statusCode).toBe(403);
    });

    test("Publish Event (Valid): Organizer toggles publish -> 200", async () => {
        const res = await request(app)
            .patch(`/events/${eventId}/publish`)
            .set("Authorization", `Bearer ${organizerToken}`);

        expect(res.statusCode).toBe(200);
    });
});