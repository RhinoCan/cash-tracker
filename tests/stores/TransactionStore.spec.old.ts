// tests/stores/Tracker.spec.ts
import { describe, test, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTrackerStore } from "@/stores/TransactionStore.ts";
import type { Transaction } from "@/types/Transaction.ts";

// Optional: stub toast to prevent real popups
vi.mock("vue-toastification", () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
  }),
}));

describe("Tracker Store", () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia());

    // Stub localStorage with a memory-based object
    const memoryStorage: Record<string, string> = {};

    vi.stubGlobal("localStorage", {
      getItem(key: string) {
        return memoryStorage[key] ?? null;
      },
      setItem(key: string, value: string) {
        memoryStorage[key] = value;
      },
      removeItem(key: string) {
        delete memoryStorage[key];
      },
      clear() {
        for (const key in memoryStorage) delete memoryStorage[key];
      },
    });
  });

  test("initializes with empty transactions array", () => {
    const store = useTrackerStore();
    expect(store.transactions).toEqual([]);
  });

  test("addTransaction adds a transaction to store and localStorage", () => {
    const store = useTrackerStore();

    const newTransaction: Transaction = {
      id: 1,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };

    store.addTransaction(newTransaction);

    // Transaction is in the store
    expect(store.transactions).toContainEqual(newTransaction);

    // Transaction is in localStorage
    const stored = JSON.parse(localStorage.getItem("transactions")!);
    expect(stored).toContainEqual(newTransaction);
  });

  test("updateTransaction revises an existing transaction in the store and in localStorage", () => {
    const store = useTrackerStore();

    //Create a new transaction and add it to the array and local storage, both of which are empty as we begin.
    const newTransaction: Transaction = {
      id: 1,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);

    //Update the new transaction by changing the amount and replacing the old transaction in the array and local storage.
    const updatedTransaction: Transaction = {
      id: 1,
      description: "Salary",
      transactionType: "Income",
      amount: 2000,
    };
    store.updateTransaction(updatedTransaction);

    //Verify that the array and the local storage have been updated.
    expect(store.transactions).toContainEqual(updatedTransaction);
    const stored = JSON.parse(localStorage.getItem("transactions")!);
    expect(stored).toContainEqual(updatedTransaction);
  });

  test("deleteTransaction removes an existing transaction from the store and localStorage", () => {
    const store = useTrackerStore();

    //Create a new transaction and add it to the array and local storage, both of which are empty as we begin.
    const newTransaction: Transaction = {
      id: 1,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);

    //Delete the transaction that was just added from both the array and local storage.
    const idOfTransactionToBeDeleted: number = 1;
    store.deleteTransaction(idOfTransactionToBeDeleted);

    // Should be removed from store
    expect(store.transactions).toEqual([]);

    // Should be removed from localStorage
    const stored = JSON.parse(localStorage.getItem("transactions")!);
    expect(stored).toEqual([]);
  });

  test("getNewId returns 1 when there are no transactions", () => {
    const store = useTrackerStore();

    //There are no transactions presently so getNewId() should return 1
    const result = store.getNewId;

    expect(result).toEqual(1);
  });

  test("getNewId returns 100 when highest existing transaction id is 99", () => {
    const store = useTrackerStore();

    //Add some transactions so that the highest id is 99.
    let newTransaction: Transaction = {
      id: 37,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 99,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);

    //The current highest transaction id is 99.
    const result = store.getNewId;

    expect(result).toEqual(100);
  });

  test("getIncome should return the sum of the incomes in the array of transactions", () => {
    const store = useTrackerStore();

    //Add some transactions, some of which should be on type Income
    let newTransaction: Transaction = {
      id: 37,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 99,
      description: "Bonus",
      transactionType: "Income",
      amount: 2000.1,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 22,
      description: "Movie",
      transactionType: "Expense",
      amount: 15.5,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 73,
      description: "Haircut",
      transactionType: "Expense",
      amount: 25.99,
    };
    store.addTransaction(newTransaction);

    const result = store.getIncome;

    expect(result).toEqual(3000.1);
  });

  test("getExpense should return the sum of the expenses in the array of transactions", () => {
    const store = useTrackerStore();

    //Add some transactions, some of which should be on type Income
    let newTransaction: Transaction = {
      id: 37,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 99,
      description: "Bonus",
      transactionType: "Income",
      amount: 2000.1,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 22,
      description: "Movie",
      transactionType: "Expense",
      amount: 15.5,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 73,
      description: "Haircut",
      transactionType: "Expense",
      amount: 25.99,
    };
    store.addTransaction(newTransaction);

    const result = store.getExpense;

    expect(result).toEqual(41.49);
  });

  test("getBalance should return the difference between the sums of the incomes and expenses in the array of transactions", () => {
    const store = useTrackerStore();

    //Add some transactions, some of which should be on type Income
    let newTransaction: Transaction = {
      id: 37,
      description: "Salary",
      transactionType: "Income",
      amount: 1000,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 99,
      description: "Bonus",
      transactionType: "Income",
      amount: 2000.1,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 22,
      description: "Movie",
      transactionType: "Expense",
      amount: 15.5,
    };
    store.addTransaction(newTransaction);
    newTransaction = {
      id: 73,
      description: "Haircut",
      transactionType: "Expense",
      amount: 25.99,
    };
    store.addTransaction(newTransaction);

    const result = store.getBalance;

    expect(result).toEqual(2958.61);
  });
});
