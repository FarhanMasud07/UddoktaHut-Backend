import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  image: z.string().url().optional(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  status: z.enum(["Active", "Inactive"]),
  category: z.string().min(1),
  sku: z.string().min(1),
  storeName: z.string().min(1),
});
