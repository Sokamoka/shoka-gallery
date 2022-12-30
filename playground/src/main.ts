import { createApp } from 'vue'
import { ShokaGallery } from 'shoka-gallery'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ShokaGallery)
app.mount('#app')
