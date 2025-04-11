import z from "zod";

const storeSchema = z.object({
  storeName: z.string({ message: "Store name is required" }),
});

export { storeSchema };
