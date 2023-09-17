import { createI18n } from "vue-i18n";
import vnMessage from "./lang/vn.json";
import enMessage from "./lang/en.json";

const messages = {
    vn: vnMessage,
    en: enMessage,
} as any;

async function autoAssignLang() {
    let context = import.meta.glob("../modules/*/lang/*.json");
    let files = {} as any;
    Object.keys(context).forEach((filePath: string) => {
        let filePathMatch = filePath.match(
            /\/([^/]+)\/lang\/([a-zA-Z0-9]+)\.json$/,
        ) as string[];
        let moduleName = filePathMatch[1] ? filePathMatch[1] : "";
        let locale = filePathMatch[2] ? filePathMatch[2] : "";
        if (!messages[locale]) {
            messages[locale] = {};
            messages[locale].module = {};
        }
        if (!messages[locale].module) {
            messages[locale].module = {};
        }
        context[filePath]().then((a: any) => {
            files[moduleName] = context[filePath];
            messages[locale].module[moduleName] = a.default;
        });
    });
}
await autoAssignLang();

const i18n = (locales: any) => {
    return createI18n({
        locale: locales, // set locale
        messages,
        fallbackLocale: "vn",
    });
};

export default i18n;
