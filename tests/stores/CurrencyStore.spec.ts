import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCurrencyStore } from '@/stores/CurrencyStore.ts';

// Get the return type of the store for type safety
type CurrencyStoreInstance = ReturnType<typeof useCurrencyStore>;

describe('CurrencyStore', () => {
    let store: CurrencyStoreInstance;

    beforeEach(() => {
        // Setup Pinia instance and create a fresh store instance for each test
        setActivePinia(createPinia());
        store = useCurrencyStore();
    });

    it('should initialize with default formatting settings (derived from system defaults)', () => {
        // Note: The actual default values are imported by the store itself,
        // we check against common expected defaults or initial values.
        expect(store.minPrecision).toBe(2); // defaultMinPrecision
        expect(store.maxPrecision).toBe(2); // defaultMaxPrecision
        expect(store.thousandsSeparator).toBe(true); // defaultThousandsSeparator
        expect(store.useBankersRounding).toBe(false); // defaultUseBankersRounding
        expect(store.currencyDisplay).toBe('symbol'); // defaultCurrencyDisplay
        expect(store.currencySign).toBe('standard'); // defaultCurrencySign

        // The currency code will default to the system's resolved currency (usually USD or EUR)
        // We will assert that it's a non-empty string.
        expect(store.currency).toBeTypeOf('string');
        expect(store.currency.length).toBeGreaterThanOrEqual(3);
    });

    it('should correctly expose the numberFormat computed property', () => {
        const format = store.numberFormat;

        // Check structure and some values
        expect(format).toBeTypeOf('object');
        expect(format.currency).toBe(store.currency);
        expect(format.maxPrecision).toBe(2);
        expect(format.thousandsSeparator).toBe(true);
    });

    it('should update multiple formatting properties via updateNumberFormat action', () => {
        const newPayload = {
            maxPrecision: 4,
            thousandsSeparator: false,
            currency: 'JPY',
            currencyDisplay: 'code' as const, // Use 'as const' to satisfy type for literals
        };

        store.updateNumberFormat(newPayload);

        // Verify direct state updates
        expect(store.maxPrecision).toBe(4);
        expect(store.thousandsSeparator).toBe(false);
        expect(store.currency).toBe('JPY');
        expect(store.currencyDisplay).toBe('code');

        // Verify computed property reflects the updates
        expect(store.numberFormat.maxPrecision).toBe(4);
        expect(store.numberFormat.currency).toBe('JPY');
    });

    it('should handle optional properties like minPrecision and not mutate others', () => {
        const initialCurrency = store.currency;

        // Update only minPrecision
        store.updateNumberFormat({ minPrecision: 1 });

        // Verify minPrecision updated
        expect(store.minPrecision).toBe(1);

        // Verify other properties remained unchanged (using currency as a sample)
        expect(store.currency).toBe(initialCurrency);
    });
});