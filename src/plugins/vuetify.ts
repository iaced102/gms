import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
import { createVuetify } from "vuetify";

export default createVuetify({
    icons: {
        defaultSet: "fa",
        aliases,
        sets: {
            fa,
        },
    },
    ssr: true,
    components,
    directives,
});
