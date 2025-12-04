<script setup lang="ts">
import { useTrackerStore } from "@/stores/TransactionStore";
const storeTracker = useTrackerStore();
import { TransactionType, Transaction } from "@/types/Transaction";
import { SubmitEventPromise } from "vuetify";

type Item = {
  id: number;
  description: string;
  transactionType: string;
  amount: number;
};

const model = defineModel<Item | null>();

const rules = {
  descriptionRequired: (value: string) => !!value || "Description is required",
  transactionTypeRequired: (value: TransactionType) =>
    !!value || "Transaction Type must be chosen",
  amountValidations: (value: number) =>
    (!!value && value > 0) ||
    "Amount must be supplied and must be greater than zero",
};

function closeDialog(value: boolean) {
  if (!value) model.value = null;
}

async function onSubmit(event: SubmitEventPromise) {
  const { valid } = await event;

  if (valid && model.value) {
    // console.log("unchanged id: " + model.value.id);
    // console.log("updated description: " + model.value.description);
    // console.log("updated transactionType: " + model.value.transactionType);
    // console.log("updated amount: " + model.value.amount);

    /* Use the original transaction id, which was read-only. The remaining values are read from the
         form fields. */
    const updatedTransaction: Transaction = {
      id: model.value.id,
      description: model.value.description,
      transactionType: model.value.transactionType as TransactionType,
      amount: model.value.amount,
    };

    /* Replace the old transaction in the transactions array with the new values. */
    storeTracker.updateTransaction(updatedTransaction);

    /* Close the dialog. */
    model.value = null;
  }
}
</script>

<template>
  <v-container>
    <v-dialog
      v-if="model"
      :model-value="true"
      @update:model-value="closeDialog"
      max-width="500"
      persistent
    >
      <template #default>
        <v-card color="surface" variant="elevated" class="mx-auto">
          <v-card-title class="bg-primary text-primary-foreground app-title">Update Transaction</v-card-title>
          <v-form @submit.prevent="onSubmit" ref="updateTransactionForm">
            <v-card-text>
              <p class="mb-4">
                Change any part of the transaction you like, apart from the key
                (which is the ID):
              </p>
              <v-container>
                <v-row dense>
                  <v-col cols="3">
                    <v-text-field
                      label="Id"
                      disabled
                      :model-value="model.id"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      label="Description"
                      v-model="model.description"
                      variant="outlined"
                      :rules="[rules.descriptionRequired]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                    <v-select
                      label="Transaction Type"
                      v-model="model.transactionType"
                      :items="['Income', 'Expense']"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Amount"
                      v-model.number="model.amount"
                      variant="outlined"
                      :rules="[rules.amountValidations]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <p>
                Press the UPDATE TRANSACTION button to update the transaction
                with the values you have changed. Press the CANCEL button to
                quit the update.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Cancel"
                variant="outlined"
                elevated="16"
                color="secondary"
                class="mr-2"
                @click="model = null"
              ></v-btn>
              <v-btn
                text="Update Transaction"
                variant="elevated"
                elevated="8"
                color="primary"
                type="submit"
                @click="onSubmit"
              ></v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* p {
  font-size: smaller;
} */
</style>
