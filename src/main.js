import './style.scss';
import 'material-design-lite/material.js';
import 'dialog-polyfill/dialog-polyfill.css';
import 'mdl-selectfield/src/selectfield/selectfield';
import Vue from 'vue';
import App from './App';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render (h) {
    return h('app');
  }
});
