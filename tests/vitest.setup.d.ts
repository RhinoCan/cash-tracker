// tests/vitest.setup.d.ts

import { mount } from '@vue/test-utils';
import { ComponentMountingOptions } from '@vue/test-utils/dist/types';

// Declare the type for the mountWithVuetify helper function
export declare const mountWithVuetify: <T extends import('vue').Component>(
  component: T,
  options?: ComponentMountingOptions<T>
) => ReturnType<typeof mount>;