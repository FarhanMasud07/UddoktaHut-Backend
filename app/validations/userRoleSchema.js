import { z } from "zod";

const userRolesSchema = z.object({
  token: z.string({ message: "token is required" }),
  roles: z
    .array(
      z
        .number()
        .int()
        .positive()
        .min(1, { message: "Role ID must be a positive integer." })
    )
    .nonempty({ message: "Atleast one role needed" }),
});

export { userRolesSchema };
