import { createI18n } from "vue-i18n";
import vnMessage from "./lang/vn.json";
import enMessage from "./lang/en.json";

// Vue.use(VueI18n);
const messages = {
  vn: vnMessage,
  en: enMessage,
};


async function autoAssignLang() {
  var context = import.meta.glob("../modules/*/lang/*.json");
  var files = {};
  Object.keys(context).forEach((filePath) => {

    let moduleName = filePath.match(/\/([^/]+)\/lang\/([a-zA-Z0-9]+)\.json$/)[1];
    let locale = filePath.match(/\/([^/]+)\/lang\/([a-zA-Z0-9]+)\.json$/)[2]
    if (!messages[locale]) {
      messages[locale] = {}
      messages[locale].module = {}
    }
    if (!messages[locale].module) {
      messages[locale].module = {}
    }
    context[filePath]().then(a => {
      files[moduleName] = context[filePath];
      messages[locale].module[moduleName] = a.default
    })



  });

}
await autoAssignLang()

const i18n = (locales) => {
  return createI18n({
    locale: locales, // set locale
    messages,
    fallbackLocale: "en",
  });
}

export default i18n;
