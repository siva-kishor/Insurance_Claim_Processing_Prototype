import { prisma } from "../config/db.js";
import bcrypt, { compare } from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";

const login = async (req, res) => {
  const { employeeId, password } = req.body;

  //verify if employee exists
  const user = await prisma.user.findUnique({
    where: { employeeId },
  });

  if (!user) {
    throw new AppError("Invalid Employee ID or Password", 401);
    //return res.status(401).json({ error: "Invalid Employee ID or Password" });
  }

  //validate password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid Employee ID or Password", 401);
    //return res.status(401).json({ error: "Invalid Employee ID or Password" });
  }

  //get jwt token
  generateToken(user.id, user.roleId, res);

  //return resoponse with token
  res.status(200).json({
    status: "success",
    data: {
      employeeId: user.employeeId,
      roleId: user.roleId,
      name: user.name,
    },
  });
};

const logout = (req, res) => {
  //reset cookie to empty
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};

const getProfile = (req, res) => {
  const { name, email, employeeId, role, officeName } = req.user;

  res.status(200).json({
    status: "success",
    data: {
      name,
      email,
      employeeId,
      role: role.roleName,
      officeName,
    },
  });
};

const changePassord = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  //1. Verify newPassword is not same as currentPassword
  if (currentPassword === newPassword)
    throw new AppError(
      "New password must be different from the current password.",
      403,
    );

  //2. Verify User is not removed
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) throw new AppError("User not found. Contact System Admin", 401);

  //3. Verify  current Password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.passwordHash,
  );
  if (!isCurrentPasswordValid) throw new AppError("Invalid Password", 401);

  //4. Hash the password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  //5. Update the Password
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
    },
  });

  //6. Issue new JWT
  generateToken(user.id, user.roleId, res);

  // Return the success response
  res.status(200).json({
    status: "success",
    message: "Password Changed Successfully",
  });
};

export { login, logout, getProfile, changePassord };
