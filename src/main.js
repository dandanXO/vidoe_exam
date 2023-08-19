import './assets/main.css'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Swipe, SwipeItem } from 'vant';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueVideoPlayer)
app.use(Swipe)
app.use(SwipeItem)

app.mount('#app')
