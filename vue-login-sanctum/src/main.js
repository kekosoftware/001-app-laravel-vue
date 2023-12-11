import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

window.axios = axios

axios.defaults.headers.common['X-Requested-With'] ='XMLHttpRequest'
axios.defaults.baseURL = 'http://localhost/api'

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = 'Bearer'
            router.push({
                name: 'login'
            })
        }
        return Promise.reject(error)
    }
)

const app = createApp(App)

app.use(router)

app.mount('#app')
