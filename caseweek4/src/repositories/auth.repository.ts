import { z } from 'zod';
import prisma from '../config/database.js';
import { registerSchema } from '../validation/auth.validation.js';

type RegisterPayload = z.infer<typeof registerSchema>;

export class AuthRepository {
    static async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    static async register(data: RegisterPayload) {
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            }
        });
    }
}

export default AuthRepository;