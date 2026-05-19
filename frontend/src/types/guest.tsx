export type Guest = {
  token: string;
  title: string;
  status: string;
  budgetTotal: number;
  budgetPaid: number;
  deadline: string | null;
  description: string;
  progress?: number; // % выполнения (опционально)
};