import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
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
