<template>
<h3>History</h3>
<ul id="list" class="list">
    <li v-for="transaction in transactions" 
    :key="transaction.id" 
    :class="transaction.transactionType === 'Expense' ? 'minus' : 'plus'">
        {{ transaction.description }}
        <span>{{ transaction.transactionType === 'Expense' ? '-' : '+' }}${{ transaction.amount.toFixed(2) }}</span>
        <button @click="storeTracker.deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
</ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTrackerStore } from '@/stores/Tracker';
const storeTracker = useTrackerStore();

const transactions = computed(() => storeTracker.transactions);
</script>