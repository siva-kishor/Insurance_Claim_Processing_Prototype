//Purpose: To seed default user roles to DB
import { prisma } from "../src/config/db.js";

const userRoles = [
  {
    roleName: "Index Clerk",
    approvalLimit: 0,
  },
  {
    roleName: "Data Entry Operator",
    approvalLimit: 0,
  },
  {
    roleName: "Claim Inspector",
    approvalLimit: 0,
  },
  {
    roleName: "Quality Checker",
    approvalLimit: 0,
  },
  {
    roleName: "Head of the Office",
    approvalLimit: 2000000,
  },
  {
    roleName: "Head of the Division",
    approvalLimit: 5000000,
  },
  {
    roleName: "Head of the Region",
    approvalLimit: 999999999,
  },
];

const main = async () => {
  console.log("seeding user roles");
  for (const userRole of userRoles) {
    const roleCreated = await prisma.userRole.create({
      data: userRole,
    });
    console.log(`${roleCreated.roleName} role is created.`);
  }
  console.log(`completed creating ${userRoles.length} roles`);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
