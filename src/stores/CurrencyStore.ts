import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  NumberFormat,
  CurrencyDisplay,
  CurrencySign,
} from "@/types/CommonTypes.ts";
import {
  defaultCurrencyCode,
  defaultMinPrecision,
  defaultMaxPrecision,
  defaultThousandsSeparator,
  defaultUseBankersRounding,
  defaultNegativeZero,
  defaultCurrencyDisplay,
  defaultCurrencySign,
} from "@/utils/SystemDefaults.ts";

export const useCurrencyStore = defineStore("currency", () => {
  // ------------------------------
  // Reactive state - Initialized with system defaults
  // ------------------------------
  const minPrecision = ref<number | undefined>(defaultMinPrecision);
  const maxPrecision = ref<number>(defaultMaxPrecision);
  const thousandsSeparator = ref<boolean>(defaultThousandsSeparator);
  const useBankersRounding = ref<boolean>(defaultUseBankersRounding);
  const negativeZero = ref<boolean>(defaultNegativeZero);
  const currency = ref<string>(defaultCurrencyCode);
  const currencyDisplay = ref<CurrencyDisplay>(
    defaultCurrencyDisplay as CurrencyDisplay
  );
  const currencySign = ref<CurrencySign>(defaultCurrencySign as CurrencySign);

  // ------------------------------
  // Computed: Current number format object
  // ------------------------------
  const numberFormat = computed<NumberFormat>(() => ({
    minPrecision: minPrecision.value,
    maxPrecision: maxPrecision.value,
    thousandsSeparator: thousandsSeparator.value,
    useBankersRounding: useBankersRounding.value,
    negativeZero: negativeZero.value,
    currency: currency.value,
    currencyDisplay: currencyDisplay.value,
    currencySign: currencySign.value,
  }));

  // ------------------------------
  // Action: Update number format
  // ------------------------------
  function updateNumberFormat(payload: Partial<NumberFormat>) {
    if (payload.minPrecision !== undefined)
      minPrecision.value = payload.minPrecision;
    if (payload.maxPrecision !== undefined)
      maxPrecision.value = payload.maxPrecision;
    if (payload.thousandsSeparator !== undefined)
      thousandsSeparator.value = payload.thousandsSeparator;
    if (payload.useBankersRounding !== undefined)
      useBankersRounding.value = payload.useBankersRounding;
    if (payload.negativeZero !== undefined)
      negativeZero.value = payload.negativeZero;
    if (payload.currency !== undefined) currency.value = payload.currency;
    if (payload.currencyDisplay !== undefined)
      currencyDisplay.value = payload.currencyDisplay;
    if (payload.currencySign !== undefined)
      currencySign.value = payload.currencySign;
  }

  // ------------------------------
  // Expose state, computed, actions
  // ------------------------------
  return {
    minPrecision,
    maxPrecision,
    thousandsSeparator,
    useBankersRounding,
    negativeZero,
    currency,
    currencyDisplay,
    currencySign,
    numberFormat,
    updateNumberFormat,
  };
});
