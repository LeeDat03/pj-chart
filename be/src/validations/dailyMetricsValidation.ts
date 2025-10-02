import { z } from "zod";

export const createDailyMetricsSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    pos_revenue: z
      .number({ message: "POS revenue is required" })
      .min(0, "POS revenue cannot be negative"),
    eatclub_revenue: z
      .number({ message: "EatClub revenue is required" })
      .min(0, "EatClub revenue cannot be negative"),
    labour_cost: z
      .number({ message: "Labour cost is required" })
      .min(0, "Labour cost cannot be negative"),
  }),
});

export const getAllMetricsSchema = z.object({
  query: z.object({
    startDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date format",
      })
      .optional(),
    endDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date format",
      })
      .optional(),
  }),
});

export const updateDailyMetricsSchema = z.object({
  body: z.object({
    pos_revenue: z.number().min(0, "POS revenue cannot be negative").optional(),
    eatclub_revenue: z
      .number()
      .min(0, "EatClub revenue cannot be negative")
      .optional(),
    labour_cost: z.number().min(0, "Labour cost cannot be negative").optional(),
  }),
});

export type CreateDailyMetricsInput = z.infer<
  typeof createDailyMetricsSchema
>["body"];
export type UpdateDailyMetricsInput = z.infer<
  typeof updateDailyMetricsSchema
>["body"];
