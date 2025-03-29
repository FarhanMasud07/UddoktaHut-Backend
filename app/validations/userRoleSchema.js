import { z } from "zod";

const userRolesSchema = z.object({
  userId: z
    .number()
    .int()
    .positive()
    .min(1, { message: "User ID must be a positive integer." }),
  roles: z
    .number()
    .int()
    .positive()
    .min(1, { message: "Role ID must be a positive integer." }),
});

export { userRolesSchema };
