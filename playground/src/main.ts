import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router/auto'
import { ShokaGallery } from 'shoka-gallery'
import './style.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
})

const app = createApp(App)

app.use(ShokaGallery)
app.use(router)
app.mount('#app')
