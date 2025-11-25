import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
import TransactionList from '@/components/TransactionList.vue';

describe('TransactionList.vue', () => {
  const transactions = [
    { id: 1, text: 'Salary', amount: 1000 },
    { id: 2, text: 'Rent', amount: -500.5 },
    { id: 3, text: 'Coffee', amount: -3.75 }
  ];

  test('renders all transactions with correct text, class, and formatted amounts', () => {
    const wrapper = mount(TransactionList, { props: { transactions } });

    const items = wrapper.findAll('li');
    expect(items).toHaveLength(transactions.length);

    // Check each transaction
    expect(items[0].text()).toContain('Salary');
    expect(items[0].classes()).toContain('plus');
    expect(items[0].find('span').text()).toBe('+$1000.00');

    expect(items[1].text()).toContain('Rent');
    expect(items[1].classes()).toContain('minus');
    expect(items[1].find('span').text()).toBe('-$500.50');

    expect(items[2].text()).toContain('Coffee');
    expect(items[2].classes()).toContain('minus');
    expect(items[2].find('span').text()).toBe('-$3.75');
  });

  test('delete button emits correct event with transaction id', async () => {
    const wrapper = mount(TransactionList, { props: { transactions } });

    const deleteButton = wrapper.find('li:nth-child(2) button');
    await deleteButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('transactionDeleted');
    expect(wrapper.emitted('transactionDeleted')[0]).toEqual([2]);
  });

  test('renders correctly with zero and decimal amounts', () => {
    const testTransactions = [
      { id: 4, text: 'Gift', amount: 0 },
      { id: 5, text: 'Snack', amount: 2.5 }
    ];

    const wrapper = mount(TransactionList, { props: { transactions: testTransactions } });
    const items = wrapper.findAll('li');

    expect(items[0].find('span').text()).toBe('+$0.00');
    expect(items[1].find('span').text()).toBe('+$2.50');
  });

  test('matches snapshot', () => {
    const wrapper = mount(TransactionList, { props: { transactions } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
