<script setup lang="ts">
import { computed, ref } from "vue";
import { useTrackerStore } from "@/stores/TransactionStore";
import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter.ts";

import ConfirmDelete from "./ConfirmDelete.vue";
import UpdateTransaction from "./UpdateTransaction.vue";

const storeTracker = useTrackerStore();
const { displayMoney } = useCurrencyFormatter();

type Item = {
  id: number;
  description: string;
  transactionType: string;
  amount: number;
};

const search = ref("");
const selectedItemDelete = ref<Item | null>(null);
const selectedItemUpdate = ref<Item | null>(null);

import type { DataTableHeader } from "vuetify";

const headers = ref<DataTableHeader<Item>[]>([
  { align: "end", key: "id", sortable: true, title: "ID" },
  { align: "start", key: "description", sortable: true, title: "Description" },
  { align: "start", key: "transactionType", sortable: true, title: "Type" },
  { align: "end", key: "amount", sortable: true, title: "Amount" },
  { align: "center", key: "actions", sortable: false, title: "Actions" },
]);

const items = computed(() => storeTracker.transactions);

// Computed function for amount cell class
function amountClass(item: Item) {
  return ["money", item.transactionType === "Income" ? "plus" : "minus", "right"];
}
</script>


<template>
  <v-card elevation="8" color="surface">
    <v-card-title class="bg-primary text-primary-foreground app-title">History</v-card-title>

    <v-card-text>
      <!-- Search Field -->
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="mt-4"
      ></v-text-field>

      <!-- Transactions Table -->
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        items-per-page="10"
        :search="search"
        dense
      >
        <!-- Item Row Template -->
        <template v-slot:item="{ item }">
          <tr>
            <td class="right">{{ item.id }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.transactionType }}</td>
            <td :class="amountClass(item)">
              {{ displayMoney(item.amount) }}
            </td>
            <td class="center">
              <v-btn
                icon="mdi-pencil"
                color="orange"
                size="medium"
                class="me-2"
                variant="elevated"
                elevation="8"
                @click="selectedItemUpdate = item"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                color="red"
                size="medium"
                class="me-2"
                variant="elevated"
                elevation="8"
                @click="selectedItemDelete = item"
              ></v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- Modals / Dialogs -->
      <ConfirmDelete v-model="selectedItemDelete" />
      <UpdateTransaction v-model="selectedItemUpdate" />
    </v-card-text>
  </v-card>
</template>


<style scoped>
/* Bold and slightly larger headers */
:deep(.v-data-table th) {
  font-weight: 700 !important;
  font-size: 1.0rem;
}
.v-card-text {
  padding-bottom: 0;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
</style>
