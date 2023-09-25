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
        component: () =>
            import("@/modules/sharedModules/pages/Layout/index.vue"),
        meta: {
            middleware: [auth],
        },
        children: [
            // {
            //     name: "listGarage",
            //     path: "garage/list",
            //     component: () =>
            //         import("@/modules/garage/pages/ListGarage.vue"),
            // },
            {
                name: "listParentGarage",
                path: "parentGarage/list",
                component: () =>
                    import("@/modules/groupGarage/pages/ListGarageGroup.vue"),
            },
            {
                name: "listGarage",
                path: "garage/list",
                component: () =>
                    import(
                        "@/modules/generalManagerment/pages/garage/ListGarage.vue"
                    ),
            },
            {
                name: "listContract",
                path: "contract/list",
                component: () =>
                    import("@/modules/contracts/pages/ListContract.vue"),
            },
            {
                name: "listRescues",
                path: "rescues/list",
                component: () =>
                    import(
                        "@/modules/mappingDataGarage/pages/rescues/ListRescues.vue"
                    ),
            },
            {
                name: "listSubSystem",
                path: "car-sub-system/list",
                component: () =>
                    import(
                        "@/modules/mappingDataGarage/pages/subSystem/ListSubSystem.vue"
                    ),
            },
            {
                name: "listInsurances",
                path: "insurances/list",
                component: () =>
                    import(
                        "@/modules/mappingDataGarage/pages/insurances/ListInsurances.vue"
                    ),
            },
            {
                name: "listGarageOwner",
                path: "garage-owners/list",
                component: () =>
                    import("@/modules/garageOwner/pages/ListGarageOwner.vue"),
            },
            {
                name: "listGarageService",
                path: "garage-service/list",
                component: () =>
                    import("@/modules/garageOwner/pages/ListGarageOwner.vue"),
            },
            {
                name: "listTags",
                path: "tags/list",
                component: () =>
                    import("@/modules/garageService/pages/tags/ListTags.vue"),
            },
            {
                name: "listGarageService",
                path: "garage-service/list",
                component: () =>
                    import(
                        "@/modules/garageService/pages/garageService/ListGarageService.vue"
                    ),
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
