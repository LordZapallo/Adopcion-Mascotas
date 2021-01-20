require('./bootstrap');
import Vue from 'vue';

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax);

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
Vue.use(Donut);

import VueGoogleCharts from 'vue-google-charts';
Vue.use(VueGoogleCharts);

import App from './src/App.vue';
import router from './router';
import $ from 'jquery';

import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false;
var url = window.location.pathname;
if (url != "/login") {
    new Vue({
        router,
        $,
        render: h => h(App)
    }).$mount('#app');
} else {
    const app = new Vue({
        el: '#app',
    });
}