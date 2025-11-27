import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import IncomeExpense from '@/components/IncomeExpense.vue';
import { useTrackerStore } from '@/stores/Tracker.ts';
import { ref } from 'vue';

vi.mock('@/stores/Tracker.ts', () => ({
  useTrackerStore: vi.fn(),
}));

describe('===Test IncomeExpenses component===', () => {
  let mockStore: any; 
  const mockedStore = useTrackerStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setActivePinia(createPinia())

    mockStore = {
      getIncome: ref('0.00'),
      getExpense: ref('0.00') 
    };

    mockedStore.mockReturnValue(mockStore);
  })

  // --- Integer amounts ---
  test('Displays correct income and expense totals', () => {
    mockStore.getIncome.value = '500.00';
    mockStore.getExpense.value = '200.00';

    const wrapper = mount(IncomeExpense);

    const incomeField = wrapper.find('#money-plus');
    const expenseField = wrapper.find('#money-minus');

    expect(incomeField.exists()).toBe(true);
    expect(incomeField.text()).toBe('$500.00');

    expect(expenseField.exists()).toBe(true);
    expect(expenseField.text()).toBe('$200.00');
  });

  // --- Decimal amounts ---
  test('Displays decimal amounts correctly', () => {
    mockStore.getIncome.value = '500.10';
    mockStore.getExpense.value = '200.01';

    const wrapper = mount(IncomeExpense);

    const incomeField = wrapper.find('#money-plus');
    const expenseField = wrapper.find('#money-minus');

    expect(incomeField.exists()).toBe(true);
    expect(incomeField.text()).toBe('$500.10');

    expect(expenseField.exists()).toBe(true);
    expect(expenseField.text()).toBe('$200.01');
  });

  // --- Zero amounts ---
  
  test('Displays zero amounts correctly', () => {
    mockStore.getIncome.value = '0.00';
    mockStore.getExpense.value = '0.00';

    const wrapper = mount(IncomeExpense);

    const incomeField = wrapper.find('#money-plus');
    const expenseField = wrapper.find('#money-minus');

    expect(incomeField.text()).toBe('$0.00');
    expect(expenseField.text()).toBe('$0.00');
  });

  // --- Large numbers ---
  test('Handles large income and expense numbers', () => {
    mockStore.getIncome.value = '1234567.89';
    mockStore.getExpense.value = '987654.32';

    const wrapper = mount(IncomeExpense);

    expect(wrapper.find('#money-plus').text()).toBe('$1234567.89');
    expect(wrapper.find('#money-minus').text()).toBe('$987654.32');
  });

  // --- Snapshot test ---
  test('Matches snapshot', () => {
    mockStore.getIncome.value = '500.00';
    mockStore.getExpense.value = '200.00';

    const wrapper = mount(IncomeExpense);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
