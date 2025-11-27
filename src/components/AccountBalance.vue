<template> 
<h4>Your Balance</h4>
<h1 id="balance">${{ formattedTotal }}</h1>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTrackerStore } from '@/stores/Tracker'
const storeTracker = useTrackerStore()

const formattedTotal = computed(() => storeTracker.getBalance);
console.log("Account balance - balance: " + formattedTotal);

</script>