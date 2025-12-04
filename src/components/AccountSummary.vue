<script setup lang="ts">
import { computed } from "vue";
import { useTrackerStore } from "@/stores/TransactionStore";
import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter.ts";

// Pinia store for transactions
const storeTracker = useTrackerStore();

// Compute total balance
const totalBalance = computed(() => {
  return storeTracker.getBalance;
});

//Call the composable function, which returns an object.
//Destructure the 'displayMoney' property from that return
const { displayMoney } = useCurrencyFormatter();
</script>

<template>
<v-card elevation="6" class="pa-4 text-center" style="max-width: 400px; margin: auto;">
    <v-card-title class="bg-primary text-primary-foreground app-title">Account Summary</v-card-title>
  <!-- Income -->
  <div class="summary-line d-flex justify-content-end text-success">
    <span class="amount">{{ displayMoney(storeTracker.getIncome) }}</span>
    <span class="label ms-2">Income</span>
  </div>

  <!-- Expense -->
  <div class="summary-line d-flex justify-content-end text-error">
    <span class="amount">{{ displayMoney(storeTracker.getExpense) }}</span>
    <span class="label ms-2">Expense</span>
  </div>

  <!-- Divider -->
  <v-divider class="my-2 dark-divider"></v-divider>

  <!-- Balance -->
  <div class="summary-line d-flex justify-content-end fw-bold"
  :class="storeTracker.getBalance >= 0 ? 'text-success' : 'text-error'">
    <span class="amount">{{ displayMoney(storeTracker.getBalance) }}</span>
    <span class="label ms-2">Balance</span>
  </div>
</v-card>

</template>

<style scoped>
.summary-line {
  font-size: 1.2rem;
  margin-bottom: 4px;
  width: 100%;
}

.amount {
  min-width: 100px; /* aligns numbers neatly */
  text-align: right;
  display: inline-block;
}

.label {
  white-space: nowrap;
}
.dark-divider {
    background-color: rgba(0, 0, 0, 0.3); /* darker than default */
    height: 2px;
}

</style>
