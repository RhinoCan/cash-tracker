import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import IncomeExpenses from '@/components/IncomeExpenses.vue';

describe('IncomeExpenses component', () => {

  // --- Normal amounts ---
  test('Displays correct income and expense totals', () => {
    const wrapper = mount(IncomeExpenses, {
      props: {
        income: 500,
        expenses: 200
      }
    });

    const incomeField = wrapper.find('#money-plus');
    const expenseField = wrapper.find('#money-minus');

    expect(incomeField.exists()).toBe(true);
    expect(incomeField.text()).toBe('$500.00');

    expect(expenseField.exists()).toBe(true);
    expect(expenseField.text()).toBe('$200.00');
  });

  // --- Decimal amounts ---
  test('Displays decimal amounts correctly', () => {
    const wrapper = mount(IncomeExpenses, {
      props: {
        income: 500.1,
        expenses: 200.01
      }
    });

    const incomeField = wrapper.find('#money-plus');
    const expenseField = wrapper.find('#money-minus');

    expect(incomeField.exists()).toBe(true);
    expect(incomeField.text()).toBe('$500.10');

    expect(expenseField.exists()).toBe(true);
    expect(expenseField.text()).toBe('$200.01');
  });

  // --- Zero amounts ---
  test('Displays zero amounts correctly', () => {
    const wrapper = mount(IncomeExpenses, {
      props: {
        income: 0,
        expenses: 0
      }
    });

    const incomeField = wrapper.find('#money-plus');
    const expenseField = wrapper.find('#money-minus');

    expect(incomeField.text()).toBe('$0.00');
    expect(expenseField.text()).toBe('$0.00');
  });

  // --- Large numbers ---
  test('Handles large income and expense numbers', () => {
    const wrapper = mount(IncomeExpenses, {
      props: {
        income: 1234567.89,
        expenses: 987654.32
      }
    });

    expect(wrapper.find('#money-plus').text()).toBe('$1234567.89');
    expect(wrapper.find('#money-minus').text()).toBe('$987654.32');
  });

  // --- Snapshot test ---
  test('Matches snapshot', () => {
    const wrapper = mount(IncomeExpenses, {
      props: {
        income: 500,
        expenses: 200
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
