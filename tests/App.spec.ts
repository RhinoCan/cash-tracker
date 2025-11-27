import { describe, test, expect, beforeEach, vi } from 'vitest';
// 🎯 Use shallowMount to ignore rendering of child components
import { shallowMount } from '@vue/test-utils'; 
import { createPinia, setActivePinia } from 'pinia';
import App from '@/App.vue';
import { useTrackerStore } from '@/stores/Tracker.ts';
import type { Transaction } from '@/types/Transaction.ts'; 

// 1. MOCK THE Pinia Store
// We only need the store structure that App.vue interacts with (the transactions array)
interface MockTrackerStore {
    transactions: Transaction[]; 
}

// Mock the Tracker store
vi.mock('@/stores/Tracker.ts', () => {
    // Define an empty mock store that App.vue can write to
    const mockStore: MockTrackerStore = {
        transactions: [], 
    };

    return {
        useTrackerStore: vi.fn(() => mockStore),
    };
});

// 2. MOCK localStorage
// We set up spies on the global localStorage object
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
};

// Replace the global localStorage with our mock
global.localStorage = localStorageMock as unknown as Storage; 

describe('===Test App component===', () => {
    let mockStore: MockTrackerStore;
    
    beforeEach(() => {
        setActivePinia(createPinia());
        mockStore = useTrackerStore() as unknown as MockTrackerStore;

        // 🎯 FIX 1A: Clear all spies and their mock implementations
        vi.clearAllMocks();
        
        // 🎯 FIX 1B: Set the default return value for getItem to null (the standard browser return when key is absent)
        // This prevents the "undefined" crash and ensures a clean start for all tests.
        localStorageMock.getItem.mockReturnValue(null); 
        
        // 🎯 FIX 1C: Ensure the mocked store starts empty for every test
        mockStore.transactions = [];
        
    });

    // --- TEST 1: Structure and components are present ---
    test('1. Renders core components', () => {
        const wrapper = shallowMount(App);

        // Assert that the child components are rendered (by their component name)
        expect(wrapper.findComponent({ name: 'TrackerHeader' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'AccountBalance' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'TransactionList' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'AddTransaction' }).exists()).toBe(true);
    });

    // --- TEST 2: Lifecycle hook loads data from localStorage ---
    test('2. Loads transactions from localStorage on mount', () => {
        // ARRANGE: Set the mock to return saved data
        const savedData = JSON.stringify([{ id: 1, amount: 10 }]);
        localStorageMock.getItem.mockReturnValue(savedData);

        // ACT: Mount the component (triggers onMounted)
        shallowMount(App);

        // ASSERT 1: localStorage.getItem was called
        expect(localStorageMock.getItem).toHaveBeenCalledWith('transactions');

        // ASSERT 2: Store transactions were updated with the parsed data
        expect(mockStore.transactions).toEqual(JSON.parse(savedData));
    });
    
    // --- TEST 3: Lifecycle hook handles empty localStorage ---
    test('3. Initializes store with empty array if no transactions in localStorage', () => {
        // ARRANGE: Set the mock to return null (no saved data)
        localStorageMock.getItem.mockReturnValue(null);

        // ACT: Mount the component (triggers onMounted)
        shallowMount(App);

        // ASSERT 1: localStorage.getItem was called
        expect(localStorageMock.getItem).toHaveBeenCalledWith('transactions');

        // ASSERT 2: Store transactions remains empty
        expect(mockStore.transactions).toEqual([]);
    });
});