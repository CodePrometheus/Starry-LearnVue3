import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mock";
import "../src/style/index.scss";
import StarryUI from "@/components";
import "lib-flexible/flexible.js";
import "normalize.css/normalize.css";

createApp(App).use(router).use(store).use(StarryUI).mount("#app");
