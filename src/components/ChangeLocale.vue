<script setup lang="ts">
import { ref, computed } from "vue";
import { useLocaleStore } from "@/stores/LocaleStore.ts";

const emit = defineEmits(["saved", "cancel"]);

const localeStore = useLocaleStore();

const selectedLocale = ref(localeStore.currentLocale);

const locales = computed(() =>
  localeStore.availableLocales.map((loc) => ({
    label: loc.label,
    value: loc.code,
  }))
);

function updateLocale() {
  localeStore.updateLocale(selectedLocale.value);
  emit("saved");
}
</script>

<template>
  <v-card color="indigo">
    <v-card-title>Update Current Locale</v-card-title>

    <v-card-text>
      <v-form>
        <v-select
          label="Locale"
          :items="locales"
          v-model="selectedLocale"
          item-title="label"
          item-value="value"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="grey" variant="outlined" @click="$emit('cancel')"> Cancel </v-btn>
      <v-btn color="red" variant="elevated" @click="updateLocale"> Update Locale </v-btn>
    </v-card-actions>
  </v-card>
</template>
