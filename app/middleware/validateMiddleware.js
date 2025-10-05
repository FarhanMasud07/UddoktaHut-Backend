import { ZodError } from "zod";

const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
        return res.status(400).json({
          error: "ValidationError",
          details: err.errors,
        });
      }
    }
  };
export { validate };
