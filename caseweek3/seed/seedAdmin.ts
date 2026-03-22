import { prisma } from "../src/config/prisma.instantiate.js";
import { Role } from "../src/generated/prisma/client/index.js";
import bcrypt from "bcrypt";


async function main() {
  const rootAccount = {
    username : "Admin",
    email : "sawitwowo@gmail.com",
    password: "adminsukasawit@123",
    role: Role.ADMIN,
    dateOfBirth : new Date("2000-01-10"), 
  }

  const hashedPassword =  await bcrypt.hash(rootAccount.password,10);

  rootAccount.password = hashedPassword;

  const result = await prisma.users.upsert({
    where: { email: rootAccount.email },
    update: rootAccount,
    create: rootAccount
  });

    console.log(result);
  }


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });