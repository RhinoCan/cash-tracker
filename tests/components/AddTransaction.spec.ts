// tests/components/AddTransaction.spec.ts

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import AddTransaction from '@/components/AddTransaction.vue';
import { useTrackerStore } from '@/stores/Tracker.ts';
import { useToast } from 'vue-toastification'; 
import { ref } from 'vue';
import type { Transaction } from '@/types/Transaction.ts'; 

// MOCKING TOAST
vi.mock('vue-toastification', () => ({
    useToast: vi.fn(), // We mock the function, but don't define the return value yet
}));

// MOCK THE STORE IMPLEMENTATION: Self-contained, hoist-safe factory
vi.mock('@/stores/Tracker.ts', async () => {
    const { ref: localRef } = await import('vue');
    
    interface LocalMockTrackerStore {
        addTransaction: (data: Transaction) => void;
        getNewId: { value: number }; 
    }

    const mockStore: LocalMockTrackerStore = {
        addTransaction: vi.fn(), 
        getNewId: localRef(100) as LocalMockTrackerStore['getNewId'], 
    };

    return {
        useTrackerStore: vi.fn(() => mockStore),
    };
});

// Define the structural type for use in the rest of the test suite
interface MockTrackerStore {
    addTransaction: (data: any) => void; 
    getNewId: { value: number };
}

// 🎯 FIX: Declare global spy variables
const mockedUseToast = vi.mocked(useToast);
let toastErrorSpy: ReturnType<typeof vi.fn>;


describe('===Test AddTransaction component===', () => {
    let mockStore: MockTrackerStore; 
    
    beforeEach(() => {
        setActivePinia(createPinia());
        mockStore = useTrackerStore() as unknown as MockTrackerStore;
        
        // 🎯 FIX: Initialize the spy and mock the return value in beforeEach
        // This ensures the spy is clean and active for the current test run.
        toastErrorSpy = vi.fn();
        mockedUseToast.mockReturnValue({ error: toastErrorSpy } as any); 
    });

    test('1. Calls addTransaction for Income transaction (positive amount)', async () => {
        const wrapper = mount(AddTransaction);
        const textInput = wrapper.find<HTMLInputElement>('#text');
        const amountInput = wrapper.find<HTMLInputElement>('#amount');
        const form = wrapper.find('#form');

        await textInput.setValue('Freelance Gig');
        await amountInput.setValue('55.75');

        await form.trigger('submit');

        expect(mockStore.addTransaction).toHaveBeenCalledTimes(1);

        const expectedPayload: Transaction = {
            id: mockStore.getNewId.value, 
            description: 'Freelance Gig',
            transactionType: 'Income',
            amount: 55.75 
        };

        expect(mockStore.addTransaction).toHaveBeenCalledWith(expectedPayload);
        
        expect(textInput.element.value).toBe('');
        expect(amountInput.element.value).toBe('');
    });
    
    test('2. Calls addTransaction for Expense transaction (negative amount)', async () => {
        const wrapper = mount(AddTransaction);
        const textInput = wrapper.find<HTMLInputElement>('#text');
        const amountInput = wrapper.find<HTMLInputElement>('#amount');
        const form = wrapper.find('#form');

        await textInput.setValue('Rent Payment');
        await amountInput.setValue('-1200.00'); 

        await form.trigger('submit');

        expect(mockStore.addTransaction).toHaveBeenCalledTimes(1);

        const expectedPayload: Transaction = {
            id: mockStore.getNewId.value, 
            description: 'Rent Payment',
            transactionType: 'Expense',
            amount: 1200.00 
        };

        expect(mockStore.addTransaction).toHaveBeenCalledWith(expectedPayload);
        
        expect(textInput.element.value).toBe('');
        expect(amountInput.element.value).toBe('');
    });

    test('3. Shows error and prevents submission if fields are empty', async () => {
        const wrapper = mount(AddTransaction);
        const form = wrapper.find('#form');

        await form.trigger('submit');

        // ASSERT: Assert against the spy created in beforeEach
        expect(toastErrorSpy).toHaveBeenCalledTimes(1); 
        expect(toastErrorSpy).toHaveBeenCalledWith('Both fields must be filled');
        
        expect(mockStore.addTransaction).not.toHaveBeenCalled();
    });
});