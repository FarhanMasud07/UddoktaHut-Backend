import { z } from "zod";

const subscriptionSchema = z.object({
  userId: z
    .number({ message: "user ID is required" })
    .min(1, { message: "User ID must be a positive integer." }),
});

const subscribedStoreSchema = z.object({
  shopId: z.string({ message: "Store id is required" }),
});

export { subscriptionSchema, subscribedStoreSchema };
