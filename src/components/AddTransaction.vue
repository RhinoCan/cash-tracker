<script lang="ts" setup>
import { ref } from "vue";

import { useTrackerStore } from "@/stores/Tracker";
const storeTracker = useTrackerStore();

import { TransactionType, Transaction } from "@/types/Transaction";
import { SubmitEventPromise } from "vuetify";

const descriptionModel = ref("");
const transactionTypeModel = ref("");
const amountModel = ref("");
const newTransactionForm = ref();

const rules = {
  descriptionRequired: (value: string) => !!value || "Description is required",
  transactionTypeRequired: (value: TransactionType) =>
    !!value || "Transaction Type must be chosen",
  amountValidations: (value: number) =>
    (!!value && value > 0) ||
    "Amount must be supplied and must be greater than zero",
};

async function onSubmit(event: SubmitEventPromise) {
  const { valid } = await event;

  if (valid) {
    /* Get the Id for the new transaction. */
    let newId: number = storeTracker.getNewId;

    /* Bundle the new Id and the data from the form into an object. */
    const newTransaction: Transaction = {
      id: newId,
      description: descriptionModel.value,
      transactionType: transactionTypeModel.value as TransactionType,
      amount: parseFloat(amountModel.value),
    };

    /* Insert the transaction into the transactions array. */
    storeTracker.addTransaction(newTransaction);

    /* Blank out the form fields and clear the error messages. */
    resetForm();
  }
}

function resetForm() {
  newTransactionForm.value.reset();
}
</script>


<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar
          color="teal"
          title="Add New Transaction"
          density="compact"
        ></v-toolbar>
      </v-col>
    </v-row>
    <v-card elevation="8" class="mx-auto">
      <v-form id="form" @submit.prevent="onSubmit" ref="newTransactionForm">
        <v-text-field
          class="mt-2"
          label="Description"
          v-model="descriptionModel"
          placeholder="Enter description..."
          variant="outlined"
          :rules="[rules.descriptionRequired]"
        ></v-text-field>
        <v-chip variant="flat" color="white">Transaction Type?</v-chip>
        <v-radio-group
          v-model="transactionTypeModel"
          inline
          :rules="[rules.transactionTypeRequired]"
        >
          <v-radio label="Income" value="Income"></v-radio>
          <v-radio label="Expense" value="Expense"></v-radio>
        </v-radio-group>
        <v-text-field
          label="Amount"
          v-model="amountModel"
          placeholder="Enter amount..."
          variant="outlined"
          :rules="[rules.amountValidations]"
        ></v-text-field>
        <div class="text-end mb-2">
          <v-btn
            @click="resetForm"
            color="black"
            class="mr-2"
            variant="outlined"
            rounded="lg"
            >Reset</v-btn
          >
          <v-btn
            type="submit"
            @click="onSubmit"
            color="red"
            elevation="8"
            rounded="lg"
            class="mr-2"
            >Add transaction</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

