import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    /*
    taken token if token is passed through headers. but in this project, token is passed through only cookies, so this step not required
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    } */

    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    //check generateToken file, token payload conatins user id and role.
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        employeeId: true,
        name: true,
        email: true,
        role: true,
        officeName: true,
      },
    });

    //verify if user exists
    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    //when all validations passed
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
