export interface NumberFormat {
    minPrecision: number | undefined;
    maxPrecision: number;
    thousandsSeparator: boolean;
    useBankersRounding: boolean;
    negativeZero: boolean;
    currency: string | undefined;
    currencyDisplay: CurrencyDisplay;
    currencySign: CurrencySign;
}
export type CurrencySign = "standard" | "accounting";
export type CurrencyDisplay = "symbol" | "narrowSymbol" | "code" | "name";
