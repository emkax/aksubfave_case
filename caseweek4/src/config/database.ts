import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client/client.js";

const host = process.env.DATABASE_HOST!;
const user = process.env.DATABASE_USER!;
const password = process.env.DATABASE_PASSWORD!;
const database = process.env.DATABASE_NAME!;

const adapter = new PrismaMariaDb({
  host,
  user,
  password,
  database,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export default prisma;