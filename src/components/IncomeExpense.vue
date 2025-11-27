<template>
<div class="inc-exp-container">
<div>
<h4>Income</h4>
<p id="money-plus" class="money plus">${{ formattedIncome }}</p>
</div>
<div>
<h4>Expense</h4>
<p id="money-minus" class="money minus">${{ formattedExpenses }}</p>
</div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTrackerStore } from '@/stores/Tracker'
const storeTracker = useTrackerStore()

const formattedIncome = computed(() => storeTracker.getIncome);
const formattedExpenses = computed(() => storeTracker.getExpense);

</script>