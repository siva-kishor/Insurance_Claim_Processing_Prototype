import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const login = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    //verify if employee exists
    const user = await prisma.user.findUnique({
      where: { employeeId },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid Employee ID or Password" });
    }

    //validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Employee ID or Password" });
    }

    //get jwt token
    const token = generateToken(user.employeeId, user.roleId, res);

    //return resoponse with token
    res.status(200).json({
      status: "Success",
      user: {
        employeeId: user.employeeId,
        role: user.roleId,
      },
      token,
    });
  } catch (err) {
    console.error(`Error while login: ${err}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { login };
//const logout;
