import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@popperjs/core"
import "@fortawesome/fontawesome-free/js/all"
import Toaster from "@meforma/vue-toaster";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
createApp(App).use(store).use(router).use(Toaster).mount('#app')

let a = document.getElementById('myToast')
// let button = document.getElementById('toggleToast')
// button.addEventListener('click', function(){
//     a.classList.toggle('d-none')
    
// })
window.myToast = a;
if(!a.classList.contains('d-none')){
    setTimeout(() => {
        a.classList.add('d-none')
    }, 2000)
}


