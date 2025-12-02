<script setup lang="ts">
import { useTrackerStore } from "@/stores/Tracker.ts";
const storeTracker = useTrackerStore();

import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter.ts";
//Call the composable function, which returns an object.
//Destructure the 'displayMoney' property from that return
const { displayMoney } = useCurrencyFormatter();

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title class="bg-green"> Income </v-card-title>
          <v-card-text class="money plus">
            {{ displayMoney(storeTracker.getIncome) }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="bg-red"> Expense </v-card-title>
          <v-card-text class="money minus">
            {{ displayMoney(storeTracker.getExpense) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
