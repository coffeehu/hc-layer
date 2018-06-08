// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import HTooltip from './packages/tooltip';
import Loading from './packages/Loading';

Vue.config.productionTip = false
Vue.use(HTooltip);
Vue.use(Loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
