import { z } from "zod";
import { handleZodError } from "../utils/handleZodError.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(result.error);
    }
    req.body = result.data;
    next();
  };
};

export default validateRequest;
