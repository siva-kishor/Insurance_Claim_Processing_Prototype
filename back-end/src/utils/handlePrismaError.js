import AppError from "./AppError.js";
// Prisma Database Errors
export const handlePrismaError = (err) => {
  // P2002: Unique constraint failed
  if (err.code === "P2002") {
    const target = err.meta?.target || "field";
    return new AppError(
      `Duplicate field value entered for ${target}. Please use another value.`,
      409,
    );
  }
  // P2025: Record to update/delete not found
  if (err.code === "P2025") {
    return new AppError("Record not found in the database.", 404);
  }
  return new AppError("Database error occurred.", 500);
};
