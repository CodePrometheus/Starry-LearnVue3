import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./mock";
import "../src/style/index.scss";
import StarryUI from "@/components";
import "lib-flexible/flexible.js";
import "normalize.css/normalize.css";

createApp(App).use(router).use(StarryUI).mount("#app");
