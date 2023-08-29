<template>
    <router-view />
</template>

<script>
import { useThemeSettingsStore } from "@/store/themeSettings";

export default {
    mounted() {
        this.$store.themeSettingsStore = useThemeSettingsStore();
    },
    watch: {
        // $route
        // $route: {
        //     handler(newVal) {
        //         let data = {};
        //         data.moduleName = newVal.name;
        //         this.$store.app.changeCurrentModule(data);
        //     },
        // },
    },
};
</script>

<style></style>
