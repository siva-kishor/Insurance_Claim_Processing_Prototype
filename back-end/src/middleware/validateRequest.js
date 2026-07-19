import { z } from "zod";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const pretty = z.prettifyError(result.error);
      console.log(`Error validating user input: ${pretty}`);

      return res.status(400).json({
        error: pretty,
      });
    }
    req.body = result.data;
    next();
  };
};

export default validateRequest;
