import { mount } from '@vue/test-utils';
import AddTransaction from '@/components/AddTransaction.vue';

test('Emits transactionSubmitted event when form submitted', async () => {
  const wrapper = mount(AddTransaction);

  await wrapper.find('input#text').setValue('Groceries');
  await wrapper.find('input#amount').setValue('-50');

  await wrapper.find('form').trigger('submit.prevent');

  // Verify event emitted
  const emitted = wrapper.emitted()['transactionSubmitted'];
  expect(emitted).toBeTruthy();

  const [data] = emitted[0];
  expect(data.text).toBe('Groceries');
  expect(data.amount).toBe(-50);
});

test('Form resets after submit', async () => {
  const wrapper = mount(AddTransaction);

  await wrapper.find('#text').setValue('ABC');
  await wrapper.find('#amount').setValue('100');

  await wrapper.find('form').trigger('submit.prevent');

  expect(wrapper.find('#text').element.value).toBe('');
  expect(wrapper.find('#amount').element.value).toBe('');
});
