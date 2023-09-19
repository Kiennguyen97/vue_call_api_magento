import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router/index';
import apolloProvider from '@/grapql/apollo'

const app = createApp({
  render: () => h(App),
})

app.use(apolloProvider).use(router).mount('#app')
