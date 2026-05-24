import prisma from "../config/database.js";
import { z } from "zod";
import { createEventSchema, updateEventSchema } from "../validation/event.validation.js";

type CreateEventPayload = z.infer<typeof createEventSchema>;
type UpdateEventPayload = z.infer<typeof updateEventSchema>;

export class EventRepository {
  static async findAll(where: { isPublished?: boolean; organizerId?: string } = {}) {
    return prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  static async create(data: CreateEventPayload & { organizerId: string }) {
    return prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        date: data.date,
        price: data.price,
        maxAttendees: data.maxAttendees,
        category: data.category,
        organizer: {
          connect: { id: data.organizerId },
        },
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  static async update(id: string, data: UpdateEventPayload & { isPublished?: boolean }) {
    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }

    return prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  static async delete(id: string) {
    return prisma.event.delete({
      where: { id },
    });
  }

  static async findAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async updateRole(userId: string, role: "ORGANIZER" | "ATTENDEE" | "ADMIN") {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}

export default EventRepository;
