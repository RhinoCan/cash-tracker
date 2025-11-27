<template> 
<h3>Add new transaction</h3>
<form id="form" @submit.prevent="onSubmit">
<div class="form-control">
<label for="text">Text</label>
<input type="text" id="text" v-model="text" placeholder="Enter text..." />
</div>
<div class="form-control">
<label for="amount">Amount <br/>(negative - expense, positive - income)</label>
<input type="text" id="amount" v-model="amount" placeholder="Enter amount..." />
</div>
<button class="btn">Add transaction</button>
</form>    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Transaction } from '@/types/Transaction';
import type { Ref } from 'vue'; // Needed for type assertion
import { useToast } from 'vue-toastification';
import { useTrackerStore } from '@/stores/Tracker';

const storeTracker = useTrackerStore();
const text = ref('');
const amount = ref('');
const emit = defineEmits(['transactionSubmitted']);
const toast = useToast();

const onSubmit = () => {
    if (!text.value || !amount.value) {
        toast.error('Both fields must be filled');
        return;
    }
    
    // 🎯 FIX: Access the getter and use a type assertion to safely get the number value.
    // This resolves the runtime error where the Ref object was passed instead of the number.
    const newIdValue = (storeTracker.getNewId as unknown as Ref<number>).value; 
    
    const transactionData: Transaction = {
        // Use the extracted number value
        id: newIdValue, 
        description: text.value,
        transactionType: parseFloat(amount.value) > 0 ? "Income" : "Expense",
        amount: Math.abs(parseFloat(amount.value))
    }
    
    storeTracker.addTransaction(transactionData) //Call store directly
    text.value = '';
    amount.value = '';
}
</script>