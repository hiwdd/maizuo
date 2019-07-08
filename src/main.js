import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App";
import "./assets/styles/base.scss";
import "./assets/styles/cinemas.scss";
import "./assets/styles/app.scss";
import "./assets/styles/iconfont/iconfont.css";

import {
  Tab,
  Tabs,
  Toast,
  List,
  Search,
  DropdownMenu,
  DropdownItem
} from "vant";

Vue.use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(List)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
