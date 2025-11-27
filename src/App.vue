<template>
  <TrackerHeader/>
  <div class="container">
    <AccountBalance/>
    <IncomeExpenses/>
    <TransactionList/>
    <AddTransaction/>
  </div>
</template>

<script setup lang="ts">
import TrackerHeader from './components/TrackerHeader.vue'
import AccountBalance from './components/AccountBalance.vue'
import IncomeExpenses from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

//import { useToast } from 'vue-toastification';

import { ref, onMounted } from 'vue';
import { useTrackerStore } from '@/stores/Tracker'

const transactions = ref([]);
const storeTracker = useTrackerStore();

 onMounted(() => {
      const savedTransactions: string | null = localStorage.getItem("transactions") 
      if (savedTransactions !== null) {
        storeTracker.transactions = JSON.parse(savedTransactions)
      }
    })

</script>