import { prisma } from "../config/prisma.instantiate.js";

class UserRepository{
    static async findByEmail(email) {
        return await prisma.users.findUnique({
            where: { email }
        });
    }

    static async registerUser(data){
        const registeredUser = await prisma.users.create({
            data: data
        });

        return registeredUser;
    }

    static async loginUser(email){
        const user = await prisma.users.findUnique({
            where : {email}
        });
        return user;
    }

    static async assignRole(email,newRole){
        const assignedRoleUser = await prisma.users.update({
            where : {email},
            data : {role: newRole}
        });
        
        return assignedRoleUser;        
    }
}

export default UserRepository;