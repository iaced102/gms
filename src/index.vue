<template>
    <header :class="navbarTypeClass()">
        <div
            :class="`app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base dark:shadow-base3 bg-white ${borderSwicthClass()} ${
                $store.state.themeSettings.navbarColor
            }
      ${
          $store.state.themeSettings.menuLayout === 'horizontal' &&
          window.width > 1280
              ? 'py-1'
              : 'md:py-6 py-3'
      }
      `"
        >
            <div class="flex justify-between items-center h-full">
                <div
                    v-if="$store.state.themeSettings.menuLayout === 'vertical'"
                    class="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse"
                >
                    <h3 class="module-name">
                        {{ $t("common." + moduleName).toUpperCase() }}
                    </h3>
                    <button
                        class="ltr:mr-5 rtl:ml-5 text-xl text-slate-900 dark:text-white"
                        v-if="
                            $store.state.themeSettings.sidebarCollasp &&
                            window.width > 1280
                        "
                        @click="
                            $store.state.themeSettings.sidebarCollasp = false
                        "
                    >
                        <Icon
                            icon="akar-icons:arrow-right"
                            v-if="!$store.state.themeSettings.direction"
                        />
                        <Icon
                            icon="akar-icons:arrow-left"
                            v-if="$store.state.themeSettings.direction"
                        />
                    </button>
                    <MobileLogo v-if="window.width < 1280" />
                    <!-- <handle-mobile-menu
                        v-if="window.width < 1280 && window.width > 768"
                    /> -->
                    <SearchModal />
                </div>
                <div
                    v-if="
                        this.$store.state.themeSettings.menuLayout ===
                        'horizontal'
                    "
                    class="flex items-center space-x-4 rtl:space-x-reverse"
                >
                    <Logo v-if="window.width > 1280" />
                    <MobileLogo v-else />
                    <handle-mobile-menu v-if="window.width < 1280" />
                </div>
                <Mainnav
                    v-if="
                        this.$store.state.themeSettings.menuLayout ===
                            'horizontal' && window.width > 1280
                    "
                />
                <div
                    class="nav-tools flex items-center lg:space-x-5 space-x-3 rtl:space-x-reverse"
                >
                    <Message v-if="window.width > 768" />
                    <Notification v-if="window.width > 768" />

                    <VButton
                        btnClass="bg-primary text-white"
                        style="margin-left: 16px"
                        v-if="window.width > 768 && headerButton.headerButton"
                        :text="$t('common.' + headerButton.headerButton)"
                        @click="headerButton.actions"
                    ></VButton>
                    <handle-mobile-menu v-if="window.width < 768" />
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import Profile from "@widget/components/Header/Navtools/Profile.vue";
import Notification from "@widget/components/Header/Navtools/Notification.vue";
import Message from "@widget/components/Header/Navtools/Message.vue";
import SwitchDark from "@widget/components/Header/Navtools/SwitchDark.vue";
import MonochromeMode from "@widget/components/Header/Navtools/MonochromeMode.vue";
import Mainnav from "@widget/components/Header/horizental-nav.vue";
import Icon from "@widget/components/Icon/index.vue";
import SearchModal from "@widget/components/Header/Navtools/SearchModal.vue";
import LanguageVue from "@widget/components/Header/Navtools/Language.vue";
import Logo from "@widget/components/Header/Navtools/Logo.vue";
import MobileLogo from "@widget/components/Header/Navtools/MobileLogo.vue";
import window from "@/mixins/window.js";
import VButton from "@widget/components/BaseComponent/Vuetify/VButton.vue";
import HandleMobileMenu from "./Navtools/HandleMobileMenu.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "header",
    mixins: [window],
    components: {
        VButton,
        Profile,
        Notification,
        Message,
        SwitchDark,
        MonochromeMode,
        Mainnav,
        Icon,
        LanguageVue,
        SearchModal,
        Logo,
        MobileLogo,
        HandleMobileMenu,
    },
    computed: {
        moduleName() {
            return this.$store.state.app.currentModule;
        },
        headerButton() {
            return this.$store.state.app.headerActions;
        },
    },

    methods: {
        redirect(configs) {
            this.$router.push({
                name: configs.nextName,
                params: configs.params,
            });
        },
        headerButton() {
            return this.$store.state.app.headerActions;
        },
        navbarTypeClass() {
            switch (this.$store.state.themeSettings.navbarType) {
                case "floating":
                    return "floating";
                case "sticky":
                    return "sticky top-0 z-[999]";
                case "static":
                    return "static";
                case "hidden":
                    return "hidden";
                default:
                    return "sticky top-0";
            }
        },
        borderSwicthClass() {
            if (
                this.$store.state.themeSettings.skin === "bordered" &&
                this.$store.state.themeSettings.navbarType !== "floating"
            ) {
                return "border-b border-gray-5002 dark:border-slate-700";
            } else if (
                this.$store.state.themeSettings.skin === "bordered" &&
                this.$store.state.themeSettings.navbarType === "floating"
            ) {
                return "border border-gray-5002 dark:border-slate-700";
            } else {
                return "dark:border-b dark:border-slate-700 dark:border-opacity-60";
            }
        },
    },
});
</script>
<style lang="scss" scoped>
.app-header {
    height: 100px;
}
.floating .app-header {
    @apply md:mx-6 md:my-8 mx-[15px] my-[15px] rounded-md;
}
.module-name {
    margin-right: 15px;
    padding-right: 10px;
    border-right: 1px black solid;
    font-size: inherit;
    font-weight: 600;
}
</style>
