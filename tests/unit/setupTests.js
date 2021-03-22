import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);
Vue.config.productionTip = false;

const localVue = createLocalVue();
const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                secondary: '#067bc2',
                light_blue: '#ecc30b',
                primary: '#ecc30b',
                dark_gray: '#393e41',
                light_gray: '#d3d0cb'
            },
        },
    }
});

localVue.use(vuetify);

export default {
  localVue,
  vuetify
};