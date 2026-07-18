/*
 id               Int      @id @default(autoincrement())
  policyNumber     String   @unique
  sumAssured       Int
  dateOfAcceptance DateTime
  nominee          String
  claim            Claim? //A policy can have a claim ID or not
  */

import { prisma } from "../src/config/db.js";
const policies = [
  {
    policyNumber: "EAP-2024-03456",
    sumAssured: 2500000,
    dateOfAcceptance: new Date("2024-05-02"),
    nominee: "Jagadish Sundaram",
  },
  {
    policyNumber: "EAP-2025-14526",
    sumAssured: 1500000,
    dateOfAcceptance: new Date("2025-05-04"),
    nominee: "Ganesh",
  },
  {
    policyNumber: "EAP-2026-15456",
    sumAssured: 50000,
    dateOfAcceptance: new Date("2026-08-02"),
    nominee: "Prema Latha",
  },
  {
    policyNumber: "EAP-2010-00452",
    sumAssured: 5000000,
    dateOfAcceptance: new Date("2010-05-15"),
    nominee: "nominee",
  },
  {
    policyNumber: "EAP-2000-07125",
    sumAssured: 40000,
    dateOfAcceptance: new Date("2000-05-15"),
    nominee: "nominee",
  },
  {
    policyNumber: "EAP-2015-00452",
    sumAssured: 3000000,
    dateOfAcceptance: new Date("2015-11-15"),
    nominee: "nominee",
  },
  {
    policyNumber: "EAP-2001-00452",
    sumAssured: 1500000,
    dateOfAcceptance: new Date("2001-10-15"),
    nominee: "nominee",
  },
];

const main = async () => {
  try {
    for (const policy of policies) {
      await prisma.policy.create({
        data: policy,
      });
    }
  } catch (err) {
    console.error(`Error seeding policies: ${err}`);
    process.exit(1);
  }
};

main().finally(async () => {
  await prisma.$disconnect();
});
