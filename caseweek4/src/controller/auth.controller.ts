import { NextFunction, Request, Response } from 'express';
import { loginSchema,registerSchema } from '../validation/auth.validation.js';
import AuthService from '../services/auth.service.js';

class AuthController {
    static async login(req: Request,res : Response,next: NextFunction){
        try{
            const parsed = loginSchema.parse(req.body);

            const result = await AuthService.login(parsed);

            return res.status(200).json({
                message : "succesfully login",
                data : result,
            });
        }catch (error){
            next(error);
        }
    }
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = registerSchema.parse(req.body);

            const result = await AuthService.register(parsed);

            return res.status(201).json({
                message: "successfully registered user",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;