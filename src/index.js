
// JS - ./js/index.js
import './js';
// SCSS
// import './scss/main.scss'
import './scss/style.scss';
// CSS (example)
import './css/main.css';

// Bootstrap (example)
// import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

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
