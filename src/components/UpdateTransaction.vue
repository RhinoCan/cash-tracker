<script setup lang="ts">
import { ref, computed } from "vue";
import { useTrackerStore } from "@/stores/Tracker";
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

async function onSubmit(event: SubmitEventPromise) {
  const { valid } = await event;

  if (valid && model.value) {
    console.log("unchanged id: " + model.value.id);
    console.log("updated description: " + model.value.description);
    console.log("updated transactionType: " + model.value.transactionType);
    console.log("updated amount: " + model.value.amount);

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
      @update:model-value="(v: string) => v && (model = null)"
      max-width="500"
      persistent
    >
      <template #default>
        <v-card color="white" variant="elevated" class="mx-auto">
          <v-card-title class="bg-yellow">Update Transaction</v-card-title>
          <v-form @submit.prevent="onSubmit" ref="updateTransactionForm">
            <v-card-text>
              <p>
                Change any part of the transaction you like, apart from the key
                (which is the ID):
              </p>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    label="Id"
                    readonly
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
              <v-row>
                <v-col cols="6">
                  <v-select
                    label="Transaction Type"
                    v-model="model.transactionType"
                    :items="['Income', 'Expense']"
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
                  color="black"
                  class="mr-2"
                  @click="model = null"
                ></v-btn>                
                <v-btn
                  text="Update Transaction"
                  variant="elevated"
                  elevated="8"
                  color="red"
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
p {
  font-size: smaller;
}
</style>
