import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/utils/mockData'
import piniaPersist from 'pinia-plugin-persistedstate';

const pinia = createPinia()//创建Pinia实例

const app=createApp(App)//创建根实例

// 使用持久化插件
pinia.use(piniaPersist);
app.use(ElementPlus)
app.use(pinia)//pinia插件安装配置
app.mount('#app')//视图挂载