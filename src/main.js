import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import 'boxicons'

import { faHatWizard,faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'


library.add(faHatWizard,faCircleArrowDown)

createApp(App).use(store).use(router).mount('#app')
