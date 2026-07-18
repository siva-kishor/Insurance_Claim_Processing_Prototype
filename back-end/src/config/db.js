import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("Databse connected Successfully");
  } catch (err) {
    console.log(`Failure to connect to DB, error: ${err.message}`);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDb, disconnectDb };
