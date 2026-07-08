import { z } from "zod";
import { IdSchema } from "../../common";

export const ProductVariantSchema = z.object({
  id: IdSchema,
  sku: z.string(),
  title: z.string(),
  price: z.number(),
  inventory: z.number().int().nonnegative(),
});

export const ProductSchema = z.object({
  id: IdSchema,
  title: z.string().min(1),
  handle: z.string(),
  variants: z.array(ProductVariantSchema),
  categories: z.array(z.string()),
  collections: z.array(z.string()),
  createdAt: z.number(),
});

export const OrderSchema = z.object({
  id: IdSchema,
  customerId: IdSchema,
  items: z.array(z.object({
    productId: IdSchema,
    variantId: IdSchema,
    quantity: z.number().int().positive(),
    price: z.number(),
  })),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    postalCode: z.string(),
  }),
  taxAmount: z.number(),
  shippingAmount: z.number(),
  discountAmount: z.number(),
  total: z.number(),
});
