import AppError from "./AppError.js";

export const handleZodError = (zodError) => {
  const message = zodError.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");

  return new AppError(message, 400);
};
