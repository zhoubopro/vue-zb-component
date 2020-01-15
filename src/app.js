import Vue from 'vue';
import Button from './component/button/index.js';
import Icon from './component/icon/index.js';

Vue.component('g-button', Button);
Vue.component('g-icon', Icon);

new Vue({
  el: "#app",
  data: {
    loading1: false,
    loading2: true,
    loading3: false,
  }
})
