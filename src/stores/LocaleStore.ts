import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { defaultLocale, LocaleOption } from "@/utils/SystemDefaults.ts";
import { localeList } from "@/utils/localeList.ts";

export const useLocaleStore = defineStore("locale", () => {
  // Initialize with the system-derived default locale
  const currentLocale = ref(defaultLocale);

  // FIX: Add the required state property that the tests are expecting
  const isLocaleReady = ref(false);

  const currentLocaleOption = computed<LocaleOption | undefined>(() => {
    // Look up the current code in the full list
    return availableLocales.value.find(
      (loc) => loc.code === currentLocale.value
    );
  });

  // The store relies on the external `localeList` which needs mapping.
  const availableLocales = ref<LocaleOption[]>(localeList.map(item => ({
    code: item.code,
    label: (item as any).name, // transform `name` -> `label`
  })));

  function updateLocale(newLocale: string) {
    currentLocale.value = newLocale;
    // FIX: Set the readiness status when the locale is updated
    isLocaleReady.value = true;
  }

  return {
    currentLocale,
    isLocaleReady, // FIX: Now correctly exposed for use and testing
    currentLocaleOption,
    availableLocales,
    updateLocale,
  };
});