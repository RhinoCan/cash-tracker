<script setup lang="ts">
import { computed, ref } from "vue";
import { useTrackerStore } from "@/stores/Tracker.ts";
let storeTracker = useTrackerStore();

import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter.ts";

import ConfirmDelete from "./ConfirmDelete.vue";
import UpdateTransaction from "./UpdateTransaction.vue";

//Call the composable function, which returns an object.
//Destructure the 'displayMoney' property from that return
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
  {
    align: "end",
    key: "id",
    sortable: true,
    title: "ID",
  },
  {
    align: "start",
    key: "description",
    sortable: true,
    title: "Description",
  },
  {
    align: "start",
    key: "transactionType",
    sortable: true,
    title: "Type",
  },
  {
    align: "end",
    key: "amount",
    sortable: true,
    title: "Amount",
  },
  {
    align: "center",
    key: "actions",
    sortable: false,
    title: "Actions",
  },
]);

const items = computed(() => storeTracker.transactions);
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar title="History" color="pink" density="compact"></v-toolbar>
      </v-col>
    </v-row>
    <v-card elevation="8">
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        items-per-page="10"
        :search="search"
      >
        <!-- <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
                <tr style="font-weight: 700">
                  <template v-for="column in columns" :key="column.key">
                    <td v-if="column.title === 'ID' || column.title === 'Amount'" class="right">
                      <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{ column.title }}</span>
                      <template v-if="isSorted(column)">
                        <v-icon :icon="getSortIcon(column)"></v-icon>
                      </template>
                    </td>
                    <td v-else-if="column.title === 'Description' || column.title === 'Type'" class="left">
                      <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{ column.title }}</span>
                      <template v-if="isSorted(column)">
                        <v-icon :icon="getSortIcon(column)"></v-icon>
                      </template>
                    </td>
                    <td v-else-if="column.title === 'Actions'" class="center">{{ column.title }}</td>
                    <td v-else>Non-existent column title is being passed to the headers slot. Notify developer.</td>
                  </template>
                </tr>
              </template> -->

        <template v-slot:header.id="{ column }">
          <span class="header">{{ column.title }}</span>
        </template>
        <template v-slot:header.description="{ column }">
          <span class="header">{{ column.title }}</span>
        </template>
        <template v-slot:header.transactionType="{ column }">
          <span class="header">{{ column.title }}</span>
        </template>
        <template v-slot:header.amount="{ column }">
          <span class="header">{{ column.title }}</span>
        </template>
        <template v-slot:header.actions="{ column }">
          <span class="header">{{ column.title }}</span>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td class="right">{{ item.id }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.transactionType }}</td>
            <td
              v-if="item.transactionType === 'Income'"
              class="money plus right"
            >
              {{ displayMoney(item.amount) }}
            </td>
            <td v-else class="money minus right">
              {{ displayMoney(item.amount) }}
            </td>
            <!-- <td class="center"><v-icon color="red" size="large"
                        @click="storeTracker.deleteTransaction(item.id)"> mdi-delete </v-icon></td> -->
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
      <ConfirmDelete v-model="selectedItemDelete" />
      <UpdateTransaction v-model="selectedItemUpdate" />
    </v-card>
  </v-container>
</template>

<style scoped>
span.header {
  font-weight: 700;
  font-size: larger;
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
