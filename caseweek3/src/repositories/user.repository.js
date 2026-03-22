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
}

export default UserRepository;