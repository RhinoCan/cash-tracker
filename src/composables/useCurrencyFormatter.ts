import { computed, type ComputedRef } from "vue";
import { useLocaleStore } from "@/stores/LocaleStore.ts";
import { useCurrencyStore } from "@/stores/CurrencyStore.ts";

/**
 * Defines the type for the money formatting function.
 */
type DisplayMoneyFunction = (amount: number | null | undefined) => string;

/**
 * Maps common locales to their typical currency codes to provide a sensible
 * default when the user changes locale but hasn't explicitly set a currency.
 * Expanded to cover more common global locales.
 */
const LOCALE_TO_CURRENCY_MAP: Record<string, string> = {
    // North America
    'en-US': 'USD',
    'en-CA': 'CAD',
    'es-MX': 'MXN',

    // Europe
    'fr-FR': 'EUR',
    'de-DE': 'EUR',
    'es-ES': 'EUR',
    'it-IT': 'EUR',
    'nl-NL': 'EUR',
    'en-GB': 'GBP',
    'ru-RU': 'RUB',

    // Asia/Pacific
    'ja-JP': 'JPY',
    'zh-CN': 'CNY', // China (Yuan)
    'ko-KR': 'KRW',
    'en-IN': 'INR', // India (Rupee)
    'hi-IN': 'INR', // India Hindi (Rupee)
    'id-ID': 'IDR',
    'en-AU': 'AUD',
    'zh-TW': 'TWD', // Taiwan (New Taiwan Dollar)
    'th-TH': 'THB', // Thailand (Baht)

    // Middle East / Africa / South America
    'ar-SA': 'SAR', // Saudi Arabia (Riyal)
    'ar-EG': 'EGP', // Egypt (Pound)
    'pt-BR': 'BRL',
    'es-AR': 'ARS',
};

/**
 * Composable function to provide a reactive money formatting utility using the native
 * Intl.NumberFormat API.
 * * It automatically reacts to changes in the current locale and currency settings
 * from the Pinia stores.
 * * @returns An object containing the reactive function `displayMoney`.
 */
export function useCurrencyFormatter() {
    // 1. Retrieve stores inside the function (MANDATORY for context)
    const localeStore = useLocaleStore();
    const currencyStore = useCurrencyStore();

    // ----------------------------------------------------------------------
    // FIX: reactiveFormatter is a COMPUTED that returns the formatting FUNCTION.
    // ----------------------------------------------------------------------
    const reactiveFormatter: ComputedRef<DisplayMoneyFunction> = computed(() => {
        // Accessing these reactive dependencies inside computed forces a rebuild on change.
        const locale = localeStore.currentLocale;
        const formatOptions = currencyStore.numberFormat;

        // --- LOGIC: DETERMINE EFFECTIVE CURRENCY ---
        const storeCurrency = formatOptions.currency;
        let effectiveCurrency = storeCurrency;

        // FIX: Canonicalize the locale string (e.g., 'hi-in' -> 'hi-IN')
        // to ensure it correctly matches the keys in LOCALE_TO_CURRENCY_MAP,
        // as object lookups are case-sensitive.
        const [lang, region] = locale.split('-');
        // Example: 'hi-in' becomes 'hi-IN'. If only 'hi' is present, it remains 'hi'.
        const canonicalLocale = region ? `${lang.toLowerCase()}-${region.toUpperCase()}` : lang.toLowerCase();


        // Determine if the user has implicitly chosen a currency (i.e., by changing locale
        // while the currency store is still at its default).
        // Assuming 'USD' is the default currency in the store.
        // We only infer a currency if the stored currency is still the default 'USD'.
        if (storeCurrency === 'USD') {

             // 1. Try to match the full canonical locale code (e.g., 'en-IN')
             let inferredCurrency = LOCALE_TO_CURRENCY_MAP[canonicalLocale];

             if (!inferredCurrency) {
                // 2. If no match, try to match the language code (e.g., 'hi')
                // Note: the `lang` variable is always the lowercased language code, which is correct for lookup.
                inferredCurrency = LOCALE_TO_CURRENCY_MAP[lang];
             }

             // 3. Update the effective currency, falling back to USD if no match found.
             effectiveCurrency = inferredCurrency || storeCurrency;
        }

        // If the user has explicitly changed the currency via the Currency Dialog,
        // storeCurrency will not be 'USD', and effectiveCurrency will correctly remain the user's choice.
        // --- END LOGIC ---

        // Map custom store properties to standard Intl.NumberFormatOptions
        const options: Intl.NumberFormatOptions = {
            style: "currency",
            // CRITICAL FIX: Use the effectiveCurrency determined by locale/store
            currency: effectiveCurrency,
            currencyDisplay: formatOptions.currencyDisplay,
            currencySign: formatOptions.currencySign,

            minimumFractionDigits: formatOptions.minPrecision,
            maximumFractionDigits: formatOptions.maxPrecision,
            useGrouping: formatOptions.thousandsSeparator,
        };

        try {
            // 2. CREATE the formatter object HERE. (Cached by computed)
            // Use the original (possibly non-canonical) locale for Intl.NumberFormat
            // as this is what the browser expects.
            const formatter = new Intl.NumberFormat(locale, options);

            // 3. RETURN a lightweight function (closure) that uses the cached formatter
            // This entire function is the .value of reactiveFormatter.
            return (amount: number | null | undefined): string => {
                if (amount === null || amount === undefined) return '';
                // 4. Use the cached formatter (FAST operation)
                return formatter.format(amount);
            };

        } catch (e) {
            console.error(
                `[Currency Formatter] Failed to create formatter for locale ${locale}:`,
                e
            );
            // On failure, return a safe fallback function
            return (amount: number | null | undefined): string => {
                if (amount === null || amount === undefined) return '';
                const precision = formatOptions.maxPrecision;
                // Fallback: Currency Code + number rounded
                return `${effectiveCurrency} ${amount.toFixed(precision)}`;
            };
        }
    });

    // ----------------------------------------------------------------------
    // THE CRITICAL CHANGE:
    // We return the computed property itself, but alias it to 'displayMoney'.
    // This allows components to use 'displayMoney.value(amount)'.
    // ----------------------------------------------------------------------
    return {
        displayMoney: reactiveFormatter,
    };
}