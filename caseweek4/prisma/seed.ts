import prisma from "../src/config/database.js";
import bcrypt from "bcryptjs";

async function main() {
  try {
    const email = "admin@evently.com";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`User already exists: ${email}`);
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user successfully seeded");
    console.log({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

  } catch (error) {
    console.error("Seed failed:");
    console.error(error);

    process.exit(1);
  } finally {
    await prisma.$disconnect();

    console.log("Prisma disconnected");
  }
}

main();