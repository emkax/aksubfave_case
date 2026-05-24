import { Router } from "express";
import EventController from "../controller/event.controller.js";
import {
    authenticateToken,
    optionalAuthenticateToken,
    requireRoles,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/events", optionalAuthenticateToken, EventController.publishedEvents);

router.get("/events/:id", optionalAuthenticateToken, EventController.event);

router.post(
    "/events",
    authenticateToken,
    requireRoles("ORGANIZER"),
    EventController.addEvent
);

router.put(
    "/events/:id",
    authenticateToken,
    requireRoles("ORGANIZER"),
    EventController.editEvent
);

router.delete(
    "/events/:id",
    authenticateToken,
    requireRoles("ORGANIZER"),
    EventController.deleteEvent
);

router.patch(
    "/events/:id/publish",
    authenticateToken,
    requireRoles("ORGANIZER"),
    EventController.publishEvent
);

export default router;