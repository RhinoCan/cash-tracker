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
  <v-card elevation="8" color="surface">
    <v-card-title class="bg-primary text-primary-foreground app-title">Account Balance</v-card-title>
    <v-card-text>
      <p v-if="storeTracker.getBalance >= 0" class="money plus">
        {{ displayMoney(storeTracker.getBalance) }}
      </p>
      <p v-else class="money minus">
        {{ displayMoney(storeTracker.getBalance) }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
h2 {
  margin: 0;
  font-size: 2rem;
}
</style>
