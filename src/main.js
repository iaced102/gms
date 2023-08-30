import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import i18n from "@/locales/index.js";
import { setupStore } from '@/store/index.js'
import mitt from "mitt";
import "@/assets/scss/index"


const emitter = mitt();


const pinia = createPinia()

// import BlokInk from '@cardoctor/vue-design-system'
// import '@cardoctor/vue-design-system/dist/storyblok-design-system.css'

const app = createApp(App)
    .use(pinia)
    // .use(BlokInk)
    .use(Toast, {
        toastClassName: "dashcode-toast",
        bodyClassName: "dashcode-toast-body",
    })
    .use(router)



if (localStorage.users === undefined) {
    let users = [
        {
            name: "dashcode",
            email: "dashcode@gmail.com",
            password: "dashcode",
        },
    ];
    localStorage.setItem("users", JSON.stringify(users));
}
app.config.globalProperties.$toast = function (message, isSuccess) {
    if (isSuccess) {
        toast["success"](message, {
            autoClose: 3000,
        });
        return;
    }
    toast["error"](message, {
        autoClose: 3000,
    });
};
let currentLang = "vn"//app.config.globalProperties.$langStore.$state.lang

export const instanceI18n = i18n(currentLang)

app.config.globalProperties.$t = instanceI18n.global.t;
setupStore(app)
app.config.globalProperties.$store = {};
app.config.globalProperties.$evtBus = emitter;
app.mount("#app");








