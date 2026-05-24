import EventRepository from "../repositories/event.repository.js";
import { AppError } from "../middlewares/error-handler.middleware.js";
import { z } from "zod";
import { createEventSchema, updateEventSchema } from "../validation/event.validation.js";

type CreateEventPayload = z.infer<typeof createEventSchema>;
type UpdateEventPayload = z.infer<typeof updateEventSchema>;

export class EventService {
  static async getEvents(user?: { id: string; role?: string }) {
    if (!user || user.role === "ATTENDEE") {
      return EventRepository.findAll({ isPublished: true });
    }

    if (user.role === "ORGANIZER") {
      return EventRepository.findAll({});
    }

    return EventRepository.findAll({ isPublished: true });
  }

  static async getEventsForAdmin() {
    return EventRepository.findAll({});
  }

  static async getEventById(id: string) {
    const event = await EventRepository.findById(id);
    if (!event) {
      throw new AppError("Event not found", 404);
    }
    return event;
  }

  static async createEvent(payload: CreateEventPayload, organizerId: string) {
    return EventRepository.create({ ...payload, organizerId });
  }

  static async updateEvent(
    id: string,
    payload: UpdateEventPayload,
    organizerId: string
  ) {
    const event = await this.getEventById(id);

    if (event.organizerId !== organizerId) {
      throw new AppError("Forbidden: You can only edit your own events", 403);
    }

    return EventRepository.update(id, payload);
  }

  static async updateEventForAdmin(
    id: string,
    payload: UpdateEventPayload
  ) {
    await this.getEventById(id);
    return EventRepository.update(id, payload);
  }

  static async deleteEvent(id: string, organizerId: string) {
    const event = await this.getEventById(id);

    if (event.organizerId !== organizerId) {
      throw new AppError("Forbidden: You can only delete your own events", 403);
    }

    return EventRepository.delete(id);
  }

  static async deleteEventForAdmin(id: string) {
    await this.getEventById(id);
    return EventRepository.delete(id);
  }

  static async togglePublishEvent(id: string, organizerId: string) {
    const event = await this.getEventById(id);

    if (event.organizerId !== organizerId) {
      throw new AppError("Forbidden: You can only publish or unpublish your own events", 403);
    }

    return EventRepository.update(id, {
      isPublished: !event.isPublished,
    });
  }

  static async getAllUsers() {
    return EventRepository.findAllUsers();
  }

  static async assignUserRole(userId: string, role: "ORGANIZER" | "ATTENDEE" | "ADMIN") {
    const users = await EventRepository.findAllUsers();
    const exists = users.some((u) => u.id === userId);
    if (!exists) {
      throw new AppError("User not found", 404);
    }

    return EventRepository.updateRole(userId, role);
  }
}

export default EventService;
