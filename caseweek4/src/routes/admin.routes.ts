import { Router } from "express";
import EventController from "../controller/event.controller.js";
import { authenticateToken, requireRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticateToken, requireRoles("ADMIN"));

router.get("/events", EventController.adminGetEvents);
router.put("/events/:id", EventController.adminEditEvent);
router.delete("/events/:id", EventController.adminDeleteEvent);

router.get("/users", EventController.getAllUser);
router.patch("/users/role", EventController.assignRole);

export default router;
