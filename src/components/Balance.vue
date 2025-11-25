<template> 
<h4>Your Balance</h4>
<h1 id="balance">${{ formattedTotal }}</h1>
</template>

<script setup>
//import {defineProps} from 'vue';
const props = defineProps({
    total: {
        type: Number, 
        required: true,
    },
});

// Format to 2 decimal places
const formattedTotal = props.total.toFixed(2);

</script>