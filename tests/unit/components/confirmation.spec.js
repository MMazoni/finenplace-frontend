import { mount } from '@vue/test-utils';
import Confirmation from '@/components/Confirmation.vue';


describe('Confirmation.vue', () => {

  it('should snapshot', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper).toMatchSnapshot();
  });

  it('is a Vue instance', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.vm).toBeTruthy();
  });
});

