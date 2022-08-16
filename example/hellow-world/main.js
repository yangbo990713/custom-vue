import App from "./App.js";
import {createApp} from "../../lib/custom-vue-esm.js";

const rootContainer = document.getElementById('app')
createApp(App).mount(rootContainer)
