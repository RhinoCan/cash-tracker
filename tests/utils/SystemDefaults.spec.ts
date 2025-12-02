import { describe, it, expect } from 'vitest'
// NOTE: We are testing the exports from `src/util/SystemDefaults.ts`, which are the system defaults.
import * as SystemDefaults from '@/utils/SystemDefaults.ts'

describe('System Defaults (SystemDefaults.ts) Configuration', () => {

  // 1. Test basic locale and country exports
  it('should export defaultLocale and defaultCountry as strings', () => {
    expect(typeof SystemDefaults.defaultLocale).toBe('string')
    expect(SystemDefaults.defaultLocale.length).toBeGreaterThan(0)

    expect(typeof SystemDefaults.defaultCountry).toBe('string')
    // Country code should be two uppercase letters (e.g., 'US', 'DE', 'JP')
    expect(SystemDefaults.defaultCountry).toMatch(/^[A-Z]{2}$/)
  })

  // 2. Test default currency code and its determination status
  it('should export defaultCurrencyCode as an uppercase string (ISO 4217)', () => {
    expect(typeof SystemDefaults.defaultCurrencyCode).toBe('string')
    // Currency code should be three uppercase letters (e.g., 'USD', 'EUR', 'JPY')
    expect(SystemDefaults.defaultCurrencyCode).toMatch(/^[A-Z]{3}$/)

    // defaultCurrencyUndefined should be a boolean flag
    expect(typeof SystemDefaults.defaultCurrencyUndefined).toBe('boolean')
  })

  // 3. Test default formatting options (used by CurrencyStore)
  it('should export all default number formatting properties with correct types and values', () => {
    // Precision defaults
    expect(SystemDefaults.defaultMinPrecision).toBe(2)
    expect(typeof SystemDefaults.defaultMinPrecision).toBe('number')
    expect(SystemDefaults.defaultMaxPrecision).toBe(2)
    expect(typeof SystemDefaults.defaultMaxPrecision).toBe('number')

    // Separator default
    expect(SystemDefaults.defaultThousandsSeparator).toBe(true)
    expect(typeof SystemDefaults.defaultThousandsSeparator).toBe('boolean')

    // Legacy/advanced defaults
    expect(SystemDefaults.defaultUseBankersRounding).toBe(false)
    expect(typeof SystemDefaults.defaultUseBankersRounding).toBe('boolean')
    expect(SystemDefaults.defaultNegativeZero).toBe(true)
    expect(typeof SystemDefaults.defaultNegativeZero).toBe('boolean')

    // Display defaults
    expect(SystemDefaults.defaultCurrencyDisplay).toBe('symbol')
    expect(typeof SystemDefaults.defaultCurrencyDisplay).toBe('string')
    expect(SystemDefaults.defaultCurrencySign).toBe('standard')
    expect(typeof SystemDefaults.defaultCurrencySign).toBe('string')
  })
})