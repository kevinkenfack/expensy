import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive("Le montant doit être positif"),
  description: z.string().optional(),
  date: z.date(),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.string().min(1, "La catégorie est requise"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>; 