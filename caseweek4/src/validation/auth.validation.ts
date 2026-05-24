import { z } from "zod";

export const loginSchema= z.object({
    email: z.string().email('Format email tidak valid').toLowerCase().trim(),

    password: z
    .string()
    .min(8, 'Wajib diisi. Minimal 8 karakter, harus mengandung setidaknya 1 huruf kapital dan 1 angka.')
    .regex(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        'Wajib diisi. Minimal 8 karakter, harus mengandung setidaknya 1 huruf kapital dan 1 angka.'
    ),
});

export const RoleEnum = z.enum([
  'ORGANIZER',
  'ATTENDEE',
  'ADMIN',
]);

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, 'Wajib diisi. Minimal 3 karakter.')
    .max(100, 'Maksimal 100 karakter.')
    .trim(),

  email: z
    .string()
    .email('Format email tidak valid.')
    .trim()
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(
      8,
      'Wajib diisi. Minimal 8 karakter, harus mengandung setidaknya 1 huruf kapital dan 1 angka.'
    )
    .regex(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      'Wajib diisi. Minimal 8 karakter, harus mengandung setidaknya 1 huruf kapital dan 1 angka.'
    ),

  role: RoleEnum.default('ATTENDEE'),
});