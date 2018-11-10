import Vue from 'vue';

// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element';
Vue.use(VueCustomElement);

// import and register your component(s)
import VoxLoginComponent from './components/VoxLoginComponent';
Vue.customElement('vox-login', VoxLoginComponent);

import VueResource  from 'vue-resource';
Vue.use(VueResource);
