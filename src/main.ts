import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "@/locales/index";
import { setupStore } from "@/store/index";
import mitt from "mitt";
import * as MyComponents from "@cardoctor/design-system";
import "@/assets/scss/index.scss";
import "@cardoctor/design-system/dist/design-system.css";
// import { useGarageStore } from "@/modules/garage/store";

const emitter = mitt();

const pinia = createPinia();

const app = createApp(App)
    .use(pinia)
    .use(MyComponents)
    .use(Toast, {
        toastClassName: "dashcode-toast",
        bodyClassName: "dashcode-toast-body",
    })
    .use(router);

Object.keys(MyComponents).forEach((componentName) => {
    console.log(componentName);
    app.component(componentName, MyComponents[componentName]);
});

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
let currentLang = "vn"; //app.config.globalProperties.$langStore.$state.lang

export const instanceI18n = i18n(currentLang) as any;

app.config.globalProperties.$t = instanceI18n.global.t;
setupStore(app);
app.config.globalProperties.$store = {};
app.config.globalProperties.$evtBus = emitter;
app.mount("#app");
