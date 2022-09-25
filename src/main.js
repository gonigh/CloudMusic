import { createPinia } from "pinia";
import { Popup, Progress, Slider, Tab, Tabs } from "vant";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'vant/lib/index.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Tabs);
app.use(Tab);
app.use(Popup);
app.use(Slider);
app.mount("#app");
