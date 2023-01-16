import { createApp } from 'vue'

import App from './layouts/App.vue'

import router from './plugins/router'

import './assets/styles/stylus/fonts.styl'
import './assets/css/reset.css'
// import './utils/uc-flexble'

import { Button } from 'vant';
import { Rate } from 'vant';

import axios from 'axios'

let app=createApp(App);

app.use(Rate);
app.use(Button);
app.use(router)
app.config.globalProperties.$axios=axios

app.mount('#app')
