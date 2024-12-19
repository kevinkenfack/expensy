import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  icon: z.string().min(1, "L'icône est requise"),
  type: z.enum(["INCOME", "EXPENSE"]),
  color: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>; 