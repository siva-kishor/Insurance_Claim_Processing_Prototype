import { z } from "zod";

//Creating Password variable as it is reusable
const passwordSchema = z
  .string()
  .min(8, "Password is too short")
  .max(128, "Password is too long")
  .regex(/[a-z]/, "Password must contain at least one lower case")
  .regex(/[A-Z]/, "Password must  contain at least one upper case")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain a special character");

//Writing Schemas for login and change password
const loginSchema = z.object({
  employeeId: z.coerce
    .number()
    .int()
    .min(10000, "Employee ID is too short")
    .max(9999999, "Employee ID is too long"),
  password: passwordSchema,
});

const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { loginSchema, changePasswordSchema };
