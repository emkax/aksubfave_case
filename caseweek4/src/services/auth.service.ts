import { loginSchema, registerSchema } from '../validation/auth.validation.js';
import { signToken } from '../utils/jwt.js';
import bcrypt from "bcryptjs";
import AuthRepository from '../repositories/auth.repository.js';
import { AppError } from '../middlewares/error-handler.middleware.js';
import { z } from 'zod';

type LoginPayload = z.infer<typeof loginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;

class AuthService {
    static async login(payload: LoginPayload) {
        const user = await AuthRepository.findByEmail(payload.email);
        if (!user) {
            throw new AppError('email does not exist', 401);
        }

        const isValidPassword = await bcrypt.compare(payload.password, user.password);

        if (!isValidPassword) {
            throw new AppError('Incorrect Password', 401);
        }

        const token = signToken(
            { id: user.id, email: user.email, role: user.role },
            { expiresIn: '1d' }
        );

        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }

    static async register(payload: RegisterPayload) {
        const check = await AuthRepository.findByEmail(payload.email);
        if (check) {
            throw new AppError('email already exists', 409);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);

        const user = await AuthRepository.register({
            ...payload,
            password: hashedPassword,
        });

        if (!user) {
            throw new AppError('failed registering user', 404);
        }

        const token = signToken(
            { id: user.id, email: user.email, role: user.role },
            { expiresIn: '1d' }
        );

        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }
}

export default AuthService;