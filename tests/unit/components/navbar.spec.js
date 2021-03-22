import { RouterLinkStub, mount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

const vuetify = new Vuetify();

Vue.use(Vuetify);
describe('Navbar.vue', () => {

  it('should snapshot', () => {
    const wrapper = mount(Navbar, {
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('is a Vue instance', () => {
    const wrapper = mount(Navbar, {
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
