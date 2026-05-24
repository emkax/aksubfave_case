import { z } from "zod";

export const EventCategoryEnum = z.enum([
  "CONFERENCE",
  "WORKSHOP",
  "SEMINAR",
  "CONCERT",
  "SPORT",
  "CHARITY",
  "CULTURAL",
]);

export const RoleEnum = z.enum([
  "ORGANIZER",
  "ATTENDEE",
  "ADMIN",
]);

export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be at most 100 characters.")
    .trim(),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .trim(),

  location: z
    .string()
    .min(3, "Location must be at least 3 characters.")
    .trim(),

  date: z
    .coerce
    .date(),

  price: z
    .coerce
    .number()
    .min(0, "Price must be a non-negative number."),

  maxAttendees: z
    .coerce
    .number()
    .int()
    .positive("Max attendees must be a positive integer."),

  category: EventCategoryEnum,
});

export const updateEventSchema = createEventSchema.partial();

export const assignRoleSchema = z.object({
  userId: z
    .string()
    .uuid("Invalid User ID format (UUID required).")
    .trim(),

  role: RoleEnum,
});
