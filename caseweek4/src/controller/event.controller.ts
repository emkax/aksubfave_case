import { Request, Response, NextFunction } from "express";
import EventService from "../services/event.service.js";
import {
  createEventSchema,
  updateEventSchema,
  assignRoleSchema,
} from "../validation/event.validation.js";

export class EventController {
  static async publishedEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.getEvents(req.user);
      return res.status(200).json({
        message: "successfully retrieved events",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async event(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await EventService.getEventById(id);
      return res.status(200).json({
        message: "successfully retrieved event details",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createEventSchema.parse(req.body);
      const organizerId = req.user!.id;

      const result = await EventService.createEvent(parsed, organizerId);
      return res.status(201).json({
        message: "successfully created event",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const parsed = updateEventSchema.parse(req.body);
      const organizerId = req.user!.id;

      const result = await EventService.updateEvent(id, parsed, organizerId);
      return res.status(200).json({
        message: "successfully updated event",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const organizerId = req.user!.id;

      await EventService.deleteEvent(id, organizerId);
      return res.status(200).json({
        message: "successfully deleted event",
      });
    } catch (error) {
      next(error);
    }
  }

  static async publishEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const organizerId = req.user!.id;

      const result = await EventService.togglePublishEvent(id, organizerId);
      return res.status(200).json({
        message: `successfully toggled publish status. isPublished is now ${result.isPublished}`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminGetEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.getEventsForAdmin();
      return res.status(200).json({
        message: "successfully retrieved events",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminEditEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const parsed = updateEventSchema.parse(req.body);

      const result = await EventService.updateEventForAdmin(id, parsed);
      return res.status(200).json({
        message: "successfully updated event",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminDeleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      await EventService.deleteEventForAdmin(id);
      return res.status(200).json({
        message: "successfully deleted event",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.getAllUsers();
      return res.status(200).json({
        message: "successfully retrieved all users",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async assignRole(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = assignRoleSchema.parse(req.body);

      const result = await EventService.assignUserRole(parsed.userId, parsed.role);
      return res.status(200).json({
        message: `successfully assigned role ${parsed.role} to user`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default EventController;
