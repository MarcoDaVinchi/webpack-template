// JS - ./js/index.js
import './js/index';
// SCSS
// import './scss/main.scss'
import './scss/style.scss';
// CSS (example)
import './css/main.css';

// import 'vue'
// import Vue from 'vue'
import store from './store';

window.Vue = require('vue');
Vue.component('example-component', require('./components/Example.vue').default);

// With vuex
const app = new Vue({
  el: '#app',
  data() {
    return {
      component: false,
    };
  },
  store,
});

// console.log('msg');

//* Without vuex and store
// const app = new Vue({
//   el: '#app'
// })
