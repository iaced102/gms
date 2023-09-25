<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog
                as="div"
                class="relative z-50 lg:hidden"
                @close="sidebarOpen = false"
            >
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="-translate-x-full"
                    >
                        <DialogPanel
                            class="relative mr-16 flex w-full max-w-xs flex-1"
                        >
                            <TransitionChild
                                as="template"
                                enter="ease-in-out duration-300"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="ease-in-out duration-300"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <div
                                    class="absolute left-full top-0 flex w-16 justify-center pt-5"
                                >
                                    <button
                                        type="button"
                                        class="-m-2.5 p-2.5"
                                        @click="sidebarOpen = false"
                                    >
                                        <span class="sr-only"
                                            >Close sidebar</span
                                        >
                                        <XMarkIcon
                                            class="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div
                                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
                            >
                                <div class="flex h-16 shrink-0 items-center">
                                    <img
                                        class="h-8 w-auto"
                                        :src="logo"
                                        alt="Your Company"
                                    />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul
                                        role="list"
                                        class="flex flex-1 flex-col gap-y-7"
                                    >
                                        <li>
                                            <ul
                                                role="list"
                                                class="-mx-2 space-y-1"
                                            >
                                                <li
                                                    v-for="item in navigation"
                                                    :key="item.name"
                                                >
                                                    <a
                                                        :href="item.href"
                                                        :class="[
                                                            item.current
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                        ]"
                                                    >
                                                        <i
                                                            :class="[
                                                                item.current
                                                                    ? 'text-indigo-600'
                                                                    : 'text-gray-400 group-hover:text-indigo-600',
                                                                'h-6 w-6 shrink-0',
                                                                item.icon,
                                                            ]"
                                                            style="
                                                                font-size: 20px !important;
                                                            "
                                                        >
                                                        </i>
                                                        {{ item.name }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div
                                                class="text-xs font-semibold leading-6 text-gray-400"
                                            >
                                                Your teams
                                            </div>
                                            <ul
                                                role="list"
                                                class="-mx-2 mt-2 space-y-1"
                                            >
                                                <li
                                                    v-for="team in teams"
                                                    :key="team.name"
                                                >
                                                    <a
                                                        :href="team.href"
                                                        :class="[
                                                            team.current
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                        ]"
                                                    >
                                                        <span
                                                            :class="[
                                                                team.current
                                                                    ? 'text-indigo-600 border-indigo-600'
                                                                    : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                                            ]"
                                                            >{{
                                                                team.initial
                                                            }}</span
                                                        >
                                                        <span
                                                            class="truncate"
                                                            >{{
                                                                team.name
                                                            }}</span
                                                        >
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mt-auto">
                                            <a
                                                href="#"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                            >
                                                <Cog6ToothIcon
                                                    class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                                    aria-hidden="true"
                                                />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <div class="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div
                class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
            >
                <div class="flex h-42 shrink-0 items-center flex-col">
                    <img class="h-32 w-auto" :src="logo" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li
                                    v-for="(item, i) in navigation"
                                    :key="item.name"
                                >
                                    <a
                                        v-if="!item.hasOwnProperty('child')"
                                        :href="item.href"
                                        :class="[
                                            i == activeSubmenu
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                        ]"
                                    >
                                        <i
                                            :class="[
                                                i == activeSubmenu
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0',
                                                item.icon,
                                            ]"
                                            style="font-size: 20px !important"
                                        >
                                        </i>
                                        {{ item.name }}
                                    </a>
                                    <div
                                        v-else
                                        :href="item.href"
                                        @click="toggleSubmenu(i)"
                                        class="cursor-pointer"
                                        :class="[
                                            item.current
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                        ]"
                                    >
                                        <i
                                            :class="[
                                                item.current
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0',
                                                item.icon,
                                            ]"
                                            style="font-size: 20px !important"
                                        ></i>
                                        <span
                                            class="flex min-w-[calc(100%-60px)] items-center justify-between"
                                        >
                                            {{ item.name }}
                                            <div
                                                :class="
                                                    activeSubmenu === i
                                                        ? 'rotate-90'
                                                        : ''
                                                "
                                            >
                                                <ChevronRightIcon
                                                    class="h-3 w-3"
                                                />
                                            </div>
                                        </span>
                                    </div>
                                    <Transition
                                        enter-active-class="submenu_enter-active"
                                        leave-active-class="submenu_leave-active"
                                        @before-enter="beforeEnter"
                                        @enter="enter"
                                        @after-enter="afterEnter"
                                        @before-leave="beforeLeave"
                                        @leave="leave"
                                        @after-leave="afterLeave"
                                    >
                                        <!-- !! SubMenu !! -->
                                        <ul
                                            class="list-none pl-8"
                                            v-if="i === activeSubmenu"
                                        >
                                            <li
                                                v-for="(
                                                    ci, index
                                                ) in item.child"
                                                :key="index"
                                                class="p-2 cursor-pointer rounded"
                                                :class="`${
                                                    ci.href == $route.fullPath
                                                        ? 'bg-gray-50 text-indigo-600'
                                                        : 'text-gray-700 '
                                                } ${
                                                    ci.child
                                                        ? ''
                                                        : 'hover:text-indigo-600 hover:bg-gray-50'
                                                }`"
                                                @click="
                                                    {
                                                        if (
                                                            ci.hasOwnProperty(
                                                                'href',
                                                            )
                                                        ) {
                                                            $router.push(
                                                                ci.href,
                                                            );
                                                        }
                                                        if (
                                                            ci.hasOwnProperty(
                                                                'action',
                                                            )
                                                        ) {
                                                            ci.action();
                                                        }
                                                    }
                                                "
                                            >
                                                <span
                                                    class="flex-1 flex"
                                                    style="text-align: left"
                                                >
                                                    <i
                                                        :class="[
                                                            ci.href ==
                                                            $route.fullPath
                                                                ? 'text-indigo-600'
                                                                : 'text-gray-400',
                                                            ci.child
                                                                ? 'group-hover:text-indigo-600'
                                                                : '',
                                                            'h-6 w-6 shrink-0 ',
                                                            ci.icon,
                                                        ]"
                                                        style="
                                                            font-size: 20px !important;
                                                        "
                                                    ></i>
                                                    {{ ci.name }}
                                                </span>
                                                <div v-if="ci.child">
                                                    <ul class="list-none pl-12">
                                                        <li
                                                            v-for="(
                                                                cCi, index
                                                            ) in ci.child"
                                                            :key="index"
                                                            class="p-2 cursor-pointer rounded"
                                                            :class="`${
                                                                cCi.href ==
                                                                $route.fullPath
                                                                    ? 'bg-gray-50 text-indigo-600'
                                                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                                            }`"
                                                            @click="
                                                                {
                                                                    if (
                                                                        cCi.hasOwnProperty(
                                                                            'href',
                                                                        )
                                                                    ) {
                                                                        $router.push(
                                                                            cCi.href,
                                                                        );
                                                                    }
                                                                    if (
                                                                        cCi.hasOwnProperty(
                                                                            'action',
                                                                        )
                                                                    ) {
                                                                        cCi.action();
                                                                    }
                                                                }
                                                            "
                                                        >
                                                            <span
                                                                class="flex-1 flex"
                                                                style="
                                                                    text-align: left;
                                                                "
                                                            >
                                                                <i
                                                                    :class="[
                                                                        cCi.href ==
                                                                        $route.fullPath
                                                                            ? 'text-indigo-600'
                                                                            : 'text-gray-400 group-hover:text-indigo-600',
                                                                        'h-6 w-6 shrink-0 ',
                                                                        cCi.icon,
                                                                    ]"
                                                                    style="
                                                                        font-size: 20px !important;
                                                                    "
                                                                ></i>
                                                                {{ cCi.name }}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </Transition>
                                </li>
                            </ul>
                        </li>
                        <li v-if="teams.length > 0">
                            <div
                                class="text-xs font-semibold leading-6 text-gray-400"
                            >
                                Your teams
                            </div>
                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                <li v-for="team in teams" :key="team.name">
                                    <a
                                        :href="team.href"
                                        :class="[
                                            team.current
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                        ]"
                                    >
                                        <span
                                            :class="[
                                                team.current
                                                    ? 'text-indigo-600 border-indigo-600'
                                                    : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                            ]"
                                            >{{ team.initial }}</span
                                        >
                                        <span class="truncate">{{
                                            team.name
                                        }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mt-auto">
                            <a
                                href="#"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                            >
                                <Cog6ToothIcon
                                    class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                    aria-hidden="true"
                                />
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div class="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
                <div
                    class="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
                >
                    <button
                        type="button"
                        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        @click="sidebarOpen = true"
                    >
                        <span class="sr-only">Open sidebar</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Separator -->
                    <div
                        class="h-6 w-px bg-gray-200 lg:hidden"
                        aria-hidden="true"
                    />

                    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form
                            class="relative flex flex-1"
                            action="#"
                            method="GET"
                        >
                            <label for="search-field" class="sr-only"
                                >Search</label
                            >
                            <MagnifyingGlassIcon
                                class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                id="search-field"
                                class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Search..."
                                type="search"
                                name="search"
                            />
                        </form>
                        <div class="flex items-center gap-x-4 lg:gap-x-6">
                            <button
                                type="button"
                                class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                            >
                                <span class="sr-only">View notifications</span>
                                <BellIcon class="h-6 w-6" aria-hidden="true" />
                            </button>

                            <!-- Separator -->
                            <div
                                class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                                aria-hidden="true"
                            />

                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative">
                                <MenuButton
                                    class="-m-1.5 flex items-center p-1.5"
                                >
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        class="h-8 w-8 rounded-full bg-gray-50"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <span
                                        class="hidden lg:flex lg:items-center"
                                    >
                                        <span
                                            class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                            aria-hidden="true"
                                            >Tom Cook</span
                                        >
                                        <ChevronDownIcon
                                            class="ml-2 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </MenuButton>
                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                    >
                                        <MenuItem
                                            v-for="item in userNavigation"
                                            :key="item.name"
                                            v-slot="{ active }"
                                        >
                                            <a
                                                :href="item.href"
                                                :class="[
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900',
                                                ]"
                                                >{{ item.name }}</a
                                            >
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>

            <main class="py-10">
                <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import logo from "@/assets/images/carDoctor/jpg_logo.jpg";
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    AdjustmentsVerticalIcon,
    ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        Bars3Icon,
        BellIcon,
        CalendarIcon,
        ChartPieIcon,
        Cog6ToothIcon,
        DocumentDuplicateIcon,
        FolderIcon,
        HomeIcon,
        UsersIcon,
        XMarkIcon,
        Dialog,
        DialogPanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        AdjustmentsVerticalIcon,
        ChevronRightIcon,
    },
    created() {
        this.navigation.map((a: any, index: number) => {
            if (
                a.href == this.$route.fullPath ||
                (a.child &&
                    a.child.length > 0 &&
                    a.child.some((c: any) => {
                        return c.href == this.$route.fullPath;
                    }))
            ) {
                this.activeSubmenu = index;
            }
        });
    },
    data() {
        return {
            activeItemSubMenu: NaN as number,
            activeSubmenu: NaN as number,
            logo: logo,
            navigation: [
                {
                    name: this.$t("module.sharedModules.sidebar.home"),
                    href: "/app",
                    icon: "fa-solid fa-house",
                },
                {
                    name: this.$t(
                        "module.sharedModules.sidebar.generalManagerment",
                    ),
                    icon: "fa-solid fa-list",
                    child: [
                        {
                            href: "/app/parentGarage/list",
                            name: this.$t(
                                "module.sharedModules.sidebar.listParentGarage",
                            ),
                            icon: "fa-solid fa-list-ol",
                        },
                        {
                            name: this.$t(
                                "module.sharedModules.sidebar.listGarage",
                            ),
                            href: "/app/garage/list",
                            icon: "fa-solid fa-list-ul",
                        },
                        {
                            name: this.$t(
                                "module.sharedModules.sidebar.listContract",
                            ),
                            href: "/app/contract/list",
                            icon: "fa-solid fa-file-contract",
                        },
                    ],
                },
                {
                    name: this.$t(
                        "module.sharedModules.sidebar.functionManagerment",
                    ),
                    href: "#",
                    icon: "fa-solid fa-gear",
                    child: [
                        {
                            name: this.$t(
                                "module.sharedModules.sidebar.listFunction",
                            ),
                            icon: "fa-solid fa-sliders",
                            child: [
                                {
                                    name: this.$t(
                                        "module.sharedModules.sidebar.rescues",
                                    ),
                                    href: "/app/rescues/list",
                                    icon: "fa-solid fa-file-contract",
                                },
                                {
                                    name: this.$t(
                                        "module.sharedModules.sidebar.subSystem",
                                    ),
                                    href: "/app/car-sub-system/list",
                                    icon: "fa-solid fa-file-contract",
                                },
                                {
                                    name: this.$t(
                                        "module.sharedModules.sidebar.insurances",
                                    ),
                                    href: "/app/insurances/list",
                                    icon: "fa-solid fa-file-contract",
                                },
                            ],
                        },
                        {
                            name: this.$t(
                                "module.sharedModules.sidebar.listGarageFunctionAcion",
                            ),
                            icon: "fa-solid fa-arrow-up-from-bracket",
                        },
                        {
                            name: this.$t(
                                "module.sharedModules.sidebar.vacationSchedule",
                            ),
                            icon: "fa-solid fa-calendar-days",
                        },
                    ],
                },
            ] as any[],
            userNavigation: [
                { name: "Your profile", href: "#" },
                { name: "Sign out", href: "#" },
            ],
            sidebarOpen: false,
            teams: [] as any[],
        };
    },
    methods: {
        beforeEnter(element: any) {
            requestAnimationFrame(() => {
                if (!element.style.height) {
                    element.style.height = "0px";
                }

                element.style.display = null;
            });
        },
        enter(element: any) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = `${element.scrollHeight}px`;
                });
            });
        },
        afterEnter(element: any) {
            element.style.height = null;
        },
        beforeLeave(element: any) {
            requestAnimationFrame(() => {
                if (!element.style.height) {
                    element.style.height = `${element.offsetHeight}px`;
                }
            });
        },
        leave(element: any) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = "0px";
                });
            });
        },
        afterLeave(element: any) {
            element.style.height = null;
        },
        toggleSubmenu(index: any) {
            if (this.activeSubmenu === index) {
                this.activeSubmenu = NaN;
            } else {
                this.activeSubmenu = index;
            }
        },
    },
});
</script>
<style lang="scss">
.submenu_enter-active,
.submenu_leave-active {
    overflow: hidden;
    transition: all 0.34s linear;
}
</style>
