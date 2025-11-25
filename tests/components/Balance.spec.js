import { mount } from '@vue/test-utils';
import Balance from '@/components/Balance.vue';

test('Displays correct positive balance', () => {
  const wrapper = mount(Balance, {
    props: {
     total: 70.1
    }
  });

  const balanceField = wrapper.find('#balance');
  expect(balanceField.exists()).toBe(true);
  expect(balanceField.text()).toBe('$70.10')
});

test('Displays correct negative balance', () => {
  const wrapper = mount(Balance, {
    props: {
     total: -50
    }
  });

  const balanceField = wrapper.find('#balance');
  expect(balanceField.exists()).toBe(true);
  expect(balanceField.text()).toBe('$-50.00')
});