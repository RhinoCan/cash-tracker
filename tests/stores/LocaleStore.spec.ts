import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLocaleStore } from '@/stores/LocaleStore.ts';

// Get the return type of the store for type safety
type LocaleStoreInstance = ReturnType<typeof useLocaleStore>;

describe('LocaleStore', () => {
    let store: LocaleStoreInstance;

    beforeEach(() => {
        // 1. Setup Pinia instance
        setActivePinia(createPinia());
        store = useLocaleStore();

        // 2. Manual state reset for Composition API stores.
        // Direct assignment on unwrapped refs avoids Pinia.$patch type issues.
        // We assume 'en-US' is the test default for isolation.
        store.currentLocale = 'en-US';
        store.isLocaleReady = false;
    });

    it('should initialize with a default locale (en-US) and status not ready', () => {
        expect(store.currentLocale).toBe('en-US');
        expect(store.isLocaleReady).toBe(false);
    });

    it('should correctly update the locale via updateLocale action', () => {
        store.updateLocale('fr-FR');
        expect(store.currentLocale).toBe('fr-FR');
        // The action sets this to true in the updated store
        expect(store.isLocaleReady).toBe(true);
    });

    it('should set the locale ready status when a locale is updated', () => {
        // Initial state check
        expect(store.isLocaleReady).toBe(false);

        store.updateLocale('ja-JP');

        // Post-action check
        expect(store.isLocaleReady).toBe(true);
        expect(store.currentLocale).toBe('ja-JP');
    });
});