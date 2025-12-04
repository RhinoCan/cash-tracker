<script lang="ts" setup>
import { ref } from "vue";
import { useTrackerStore } from "@/stores/TransactionStore";
import { TransactionType, Transaction } from "@/types/Transaction";
import { SubmitEventPromise } from "vuetify";

const storeTracker = useTrackerStore();

const descriptionModel = ref("");
const transactionTypeModel = ref<TransactionType | "">("");
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
    const newId: number = storeTracker.getNewId;

    const newTransaction: Transaction = {
      id: newId,
      description: descriptionModel.value,
      transactionType: transactionTypeModel.value as TransactionType,
      amount: parseFloat(amountModel.value),
    };

    storeTracker.addTransaction(newTransaction);
    resetForm();
  }
}

function resetForm() {
  newTransactionForm.value.reset();
  transactionTypeModel.value = "";
}
</script>

<template>
  <v-card elevation="8" color="surface">
    <v-card-title class="bg-primary text-primary-foreground app-title" variant="elevated"
      >Add New Transaction</v-card-title
    >
    <v-container>
      <v-form @submit.prevent="onSubmit" ref="newTransactionForm">
        <v-text-field
          class="mt-2"
          label="Description"
          v-model="descriptionModel"
          placeholder="Enter description..."
          variant="outlined"
          :rules="[rules.descriptionRequired]"
        ></v-text-field>

        <!-- Transaction type with radio buttons -->
        <div class="mt-2">
          <v-chip variant="flat" color="white">Transaction type?</v-chip>
          <v-radio-group
            v-model="transactionTypeModel"
            :rules="[rules.transactionTypeRequired]"
          >
            <v-radio label="Income" value="Income" color="green"></v-radio>
            <v-radio label="Expense" value="Expense" color="red"></v-radio>
          </v-radio-group>
        </div>

        <v-text-field
          class="mt-2"
          label="Amount"
          v-model="amountModel"
          placeholder="Enter amount..."
          variant="outlined"
          :rules="[rules.amountValidations]"
        ></v-text-field>

        <div class="text-end mb-2">
          <v-btn
            @click="resetForm"
            color="secondary"
            class="mr-2"
            variant="outlined"
            rounded="lg"
          >
            Reset
          </v-btn>
          <v-btn
            type="submit"
            @click="onSubmit"
            color="primary"
            elevation="8"
            rounded="lg"
            class="mr-2"
          >
            Add transaction
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
