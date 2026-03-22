import jwt from "jsonwebtoken";

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

    static async authorize(allowedRoles){
        return (req,res,next) => {
            if (!req.user()){
                return res.status(401).json({message : "unathorized"})
            }

            if (!allowedRoles)
        }
    }
}

export default authMiddleware;