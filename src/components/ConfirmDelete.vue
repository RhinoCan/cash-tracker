<script setup lang="ts">
import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter.ts";
import { useTrackerStore } from "@/stores/TransactionStore";
import { computed } from "vue";

//Call the composable function, which returns an object.
//Destructure the 'displayMoney' property from that return
const { displayMoney } = useCurrencyFormatter();

type Item = {
  id: number;
  description: string;
  transactionType: string;
  amount: number;
};

const model = defineModel<Item | null>();

const dialogOpen = computed({
  get: () => !!model.value, // returns boolean
  set: (val: boolean) => {
    // accepts boolean
    if (!val) model.value = null; // safely updates model
  },
});

const deleteTransaction = () => {
  const item = model.value;
  let storeTracker = useTrackerStore();
  if (!item || !item.id) {
    console.log(
      "ConfirmDelete.deleteTransaction() - Transaction id was undefined so nothing was deleted"
    );
  } else {
    storeTracker.deleteTransaction(item.id);
    console.log(
      "ConfirmDelete.deleteTransaction() - Transaction with id " +
        item.id +
        " deleted"
    );
  }
  model.value = null;
};
</script>

<template>
  <v-container>
    <v-dialog v-if="model" v-model="dialogOpen" max-width="500" persistent>
      <template #default>
        <v-card color="surface" variant="elevated" class="mx-auto">
          <v-card-title class="bg-primary text-primary-foreground app-title">Confirm or Cancel Delete</v-card-title>
          <v-card-text>
            <p>This is the transaction that you are about to delete:</p>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="Id"
                  disabled
                  variant="outlined"
                  :model-value="model.id"
                ></v-text-field>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  label="Description"
                  disabled
                  variant="outlined"
                  :model-value="model.description"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Transaction Type"
                  disabled
                  variant="outlined"
                  :model-value="model.transactionType"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Amount"
                  disabled
                  variant="outlined"
                  :model-value="displayMoney(model.amount)"
                ></v-text-field>
              </v-col>
            </v-row>
            <p>
              Press the DELETE TRANSACTION button to delete the transaction.
              Press the CANCEL button to keep the transaction.
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
              text="Delete Transaction"
              variant="elevated"
              elevated="8"
              color="primary"
              @click="deleteTransaction"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<style scoped>

</style>
