import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository.js";

class authMiddleware{
    static async authJWT (req,res,next) {
        try{
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({
                    message : "unauthorized",
                })
            }
            const token = authHeader.split(" ")[1];


            const JWT_SECRET = process.env.JWT_SECRET;
            const decoded = jwt.verify(token,JWT_SECRET);

            req.user = decoded;

            next();
        } catch(err){
            return res.status(401).json({
                message : "Invalid or expired token",
            })
        }
    }

    static authorize(allowedRoles = []){
        return async (req,res,next) => {
            try{
                if (!req.user){
                    return res.status(401).json({message : "unathorized"})
                }

                
                const {email} = req.user;
                const getUserRole = await UserRepository.findByEmail(email);
                
                if (!getUserRole) {
                    return res.status(401).json({message: "User not found",});
                }

                if (!allowedRoles.includes(getUserRole.role)){
                    res.status(403).json({message : "Forbidden : role not allowed"});
                }

                next();
            }catch(err){
                next(err);
            }
            
        }
    }
}

export default authMiddleware;