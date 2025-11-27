export type TransactionType = "Income" | "Expense";
export type Transaction = {
    id: number;
    description: string;
    transactionType: TransactionType;
    amount: number;
};
