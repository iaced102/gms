import auth from "@/router/middleware/auth";
import guest from "@/router/middleware/guest";

const routes = [
    {
        path: "/",
        name: "Login",
        component: () =>
            import("@/modules/sharedModules/pages/Auth/login/index.vue"),
    },
    {
        path: "/app",
        name: "Layout",
        redirect: "/app/garage/list",
        component: () =>
            import("@/modules/SharedModules/pages/Layout/index.vue"),
        meta: {
            middleware: [auth],
        },
        children: [
            {
                name: "listGarage",
                path: "garage/list",
                component: () =>
                    import("@/modules/garage/pages/ListGarage.vue"),
            },
        ],
    },
    // {
    //   path: "/error",
    //   name: "error",
    //   component: () => import("@/views/error.vue"),
    // },
];

export default routes;
