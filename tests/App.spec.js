import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

beforeEach(() => {
  localStorage.clear();
});

test('App renders and loads child components', () => {
  const wrapper = mount(App);

  expect(wrapper.find('h2').text()).toBe('Expense Tracker');

  // Ensure main UI components exist
  expect(wrapper.findComponent({ name: 'Balance' }).exists()).toBe(true);
  expect(wrapper.findComponent({ name: 'TransactionList' }).exists()).toBe(true);
  expect(wrapper.findComponent({ name: 'AddTransaction' }).exists()).toBe(true);
});

test('Loads transactions from localStorage', () => {
  localStorage.setItem('transactions', JSON.stringify([{ id: 1, text: 'Test', amount: 10 }]));

  const wrapper = mount(App);

  expect(wrapper.vm.transactions.length).toBe(1);
});
