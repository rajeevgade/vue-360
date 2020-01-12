import VueThreeSixty from './components/I360Viewer.vue'
import { VueHammer } from 'vue2-hammer'

export default {
    install(Vue, options) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vue-three-sixty", VueThreeSixty);
        Vue.use(VueHammer)
    }
};