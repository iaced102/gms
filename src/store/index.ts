import { createPinia } from "pinia";
import { pluginPinia } from "@/store/plugins";

const store = createPinia();

export function setupStore(app: any) {
    app.use(store);
}
store.use(pluginPinia);

export { store };

export async function autoAssignStore() {
    var context = import.meta.glob("../modules/*/store/index.ts");
    var files = {} as any;
    Object.keys(context).forEach((filePath: string) => {
        let filePathMatch = filePath.match(
            /\/([^/]+)\/store\/index.ts$/,
        ) as string[];
        context[filePath]().then((a: any) => {
            const epDefault = a.default;
            console.log(a.default);
            if (epDefault) {
                console.log(a.default());
                files[filePathMatch[1]] = a.default();
            }
        });
    });
    return files;
}
