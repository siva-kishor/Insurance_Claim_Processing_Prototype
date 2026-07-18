//Purpose: To seed user data into database
import { prisma } from "../src/config/db.js";
import bcrypt from "bcrypt";

const defaultPasswordHash = await bcrypt.hash("Password@123", 10);
const users = [
  {
    employeeId: 10143,
    name: "siva kishor",
    email: "sivakishor@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 1,
  },
  {
    employeeId: 10567,
    name: "ravi",
    email: "ravi@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 2,
  },
  {
    employeeId: 12456,
    name: "chandra",
    email: "chandra@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 3,
  },
  {
    employeeId: 24156,
    name: "geetha",
    email: "geetha@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 4,
  },
  {
    employeeId: 25673,
    name: "suresh",
    email: "suresh@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 5,
  },
  {
    employeeId: 34356,
    name: "mathew",
    email: "mathew@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 6,
  },
  {
    employeeId: 35858,
    name: "gokarna",
    email: "gokarna@gmail.com",
    passwordHash: defaultPasswordHash,
    officeName: "Bengaluru GPO",
    roleId: 7,
  },
];

const main = async () => {
  console.log(`seeding user data`);
  try {
    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }
    console.log(`seeded ${users.length} users to the database`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main().finally(async () => {
  await prisma.$disconnect();
});
