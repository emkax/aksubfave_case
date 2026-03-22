import InputValidation from "../validation/joi.validation.js";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

class UserServices{
    static generateJWT(payload){
        const JWT_SECRET = process.env.JWT_SECRET;  
        const jwt_token = jwt.sign(payload,JWT_SECRET,{
            expiresIn:"1h",
        });

        return jwt_token;
    }

    static async userRegister(data){
        const {username,email,password,dateOfBirth} = InputValidation.userRegistrationValidator(data);

        const existingUser = await UserRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const body = {
            username,
            email,
            role:"READER",
            password : hashedPassword,
            dateOfBirth,
        }

        const registeredUser = await UserRepository.registerUser(body);

        const { password: _, ...safeUser } = registeredUser;
        
        const payload = {
            id : registeredUser.id,
            email:registeredUser.email,
        }

        const jwt_token = this.generateJWT(payload); 
        

        return {data : safeUser,token:jwt_token};
    }

    static async userLogin(data){
        const {email,password} = InputValidation.userLoginValidator(data);

        if (!email || !password){
            throw new Error("missing required fields enter email and password");
        }
        const loginedUser = await UserRepository.loginUser(email,password);

        
        if (!loginedUser){
            throw new Error("email not found");
        }

        const isMatch = await bcrypt.compare(password, loginedUser.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const payload = {
            id : loginedUser.id,
            email:loginedUser.email,
        }

    
        const jwt_token = this.generateJWT(payload);

        const { password: _, ...safeUser } = loginedUser;

        return {user : safeUser,token : jwt_token};
    }
    static async assignRole(email,role){

        const modifiedRole = await UserRepository.assignRole(email,role);
        if (!modifiedRole){
            throw new Error("failed to modify role");
        }

        const { password: _, ...safeUser } = modifiedRole;

        return safeUser;
    }
}

export default UserServices;