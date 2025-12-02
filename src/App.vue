<script setup lang="ts">
import TrackerHeader from "@/components/TrackerHeader.vue";
import TrackerAbout from "@/components/TrackerAbout.vue";
import AccountBalance from "@/components/AccountBalance.vue";
import IncomeExpense from "@/components/IncomeExpense.vue";
import TransactionHistory from '@/components/TransactionHistory.vue';
import AddTransaction from "@/components/AddTransaction.vue";

import { useToast } from "vue-toastification";

import { ref, onMounted } from "vue";
import { useTrackerStore } from "@/stores/Tracker";

const transactions = ref([]);
const storeTracker = useTrackerStore();

onMounted(() => {
  const savedTransactions: string | null = localStorage.getItem("transactions");
  if (savedTransactions !== null) {
    storeTracker.transactions = JSON.parse(savedTransactions);
  }
});
</script>

<template>
  <v-app>
    <TrackerHeader />
    <v-main class="bg-teal">
      <v-container :max-width="1000" class="bg-grey-lighten-3">
        <TrackerAbout />
        <AccountBalance />
        <IncomeExpense />
        <TransactionHistory />
        <AddTransaction />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-application {
  background-color: #FFCA28 !important;
}
main.v-main {
  background-color: #FFCA28 !important;
}
</style>