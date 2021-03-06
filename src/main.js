import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  app.component(componentName, componentConfig.default || componentConfig)
})

app.use(store).use(router).mount('#app')
