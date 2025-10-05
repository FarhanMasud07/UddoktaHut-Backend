import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val, 10) || 1),
  pageSize: z
    .string()
    .optional()
    .transform((val) => parseInt(val, 10) || 10),
  search: z.string().optional().default(""),
  sortBy: z.string().optional().default("id"),
  sortOrder: z.string().optional().default("asc"),
});

export const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
  category: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
});
