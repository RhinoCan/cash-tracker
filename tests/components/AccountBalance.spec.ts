// tests/components/AccountBalance.spec.ts

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import AccountBalance from '@/components/AccountBalance.vue';
import { useTrackerStore } from '@/stores/Tracker.ts';
import { ref } from 'vue';

// MOCK THE STORE IMPLEMENTATION
vi.mock('@/stores/Tracker.ts', () => ({
  useTrackerStore: vi.fn(),
}));

describe('===Test AccountBalance component===', () => {
  let mockStore: any; 
  const mockedStore = useTrackerStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setActivePinia(createPinia());
    
    // 1. DEFINE THE MOCK STRUCTURE USING 'ref'
    // This is crucial: it simulates the reactive property Pinia provides.
    mockStore = {
      getBalance: ref(0), // Initialize 'getBalance' as a reactive ref
    };

    mockedStore.mockReturnValue(mockStore);
  });

  // ---

  test('Displays correct positive balance', () => {
    // 2. SET THE MOCK VALUE ON THE .value PROPERTY
    mockStore.getBalance.value = '70.10'; // ⬅️ Set value using .value
    
    const wrapper = mount(AccountBalance); 

    const balanceField = wrapper.find('#balance');
    expect(balanceField.exists()).toBe(true);
    
    expect(balanceField.text()).toBe('$70.10'); 
  });

  // ---

  test('Displays correct negative balance', () => {
    // 2. SET THE MOCK VALUE ON THE .value PROPERTY
    mockStore.getBalance.value = -50.01; // ⬅️ Set value using .value

    const wrapper = mount(AccountBalance); 

    const balanceField = wrapper.find('#balance');
    expect(balanceField.exists()).toBe(true);
    
    expect(balanceField.text()).toBe('$-50.01');
  });
});