import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@popperjs/core"
import "@fortawesome/fontawesome-free/js/all"
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'


createApp(App).use(store).use(router).mount('#app')
