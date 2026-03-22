import UserServices from "../services/user.service.js";


class UserController{
    static async registerUser(req,res,next){
        try{
            const userRegistration = await UserServices.userRegister(req.body);

            return res.status(201).json({message : "succesfuly registered user",data : userRegistration.data,token:userRegistration.token});
        }catch (err){
            next(err);
        }
    }
    static async loginUser(req,res,next){
        try{
            const userLogin = await UserServices.userLogin(req.body);
            
            return res.status(200).json({message : "succesfully login",data : userLogin});
        }catch (err){
            next(err);
        }
    
    }

    static async assignRole(req,res,next){
        try{
            const assginedRole = await UserServices.assignRole(req.body.email,req.body.role);

            return res.status(201).json({message : "succesfully assigned role",data : assginedRole});
        }catch(err){
            next(err);
        }
    } 
}

export default UserController;