import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.config.globalProperties.axios=require('axios');
app.use(router).mount('#app')
