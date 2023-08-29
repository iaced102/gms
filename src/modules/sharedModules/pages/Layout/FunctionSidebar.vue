<template>
    <div class="function-sidebar-overlay">
        <div class="function-sidebar">
            <v-icon
                @click="closeFunctionSidebar"
                class="function-sidebar-close-button"
            >
                mdi-close</v-icon
            >
            <component
                :is="compo"
                v-bind="args"
                ref="functionSidebarComponent"
            />
            <div
                style="
                    width: 100%;
                    display: flex;
                    position: absolute;
                    bottom: 20px;
                    justify-content: end;
                "
                class="pr-3"
            >
                <Button
                    @click="closeFunctionSidebar"
                    :text="$t('module.sharedModules.functionSidebar.cancel')"
                ></Button>
                <Button
                    btnClass="text-white bg-primary"
                    style="margin-left: 12px"
                    @click="callComponentAction"
                    :text="
                        $t('module.sharedModules.functionSidebar.' + buttonName)
                    "
                ></Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button/index.vue";
import SidebarCreateGarage from "@/modules/garage/pages/SidebarCreateGarage.vue";
import SidebarEditGarage from "@/modules/garage/pages/SidebarEditGarage.vue";

const forDynamicComponent = {
    sidebarCreateGarage: SidebarCreateGarage,
    sidebarEditGarage: SidebarEditGarage,
} as any;
export default defineComponent({
    methods: {
        callComponentAction() {
            let component = this.$refs.functionSidebarComponent as any;
            component.action();
        },
        closeFunctionSidebar() {
            this.$store.app.closeSidebar();
        },
    },
    components: {
        SidebarCreateGarage,
        Button,
    },
    computed: {
        buttonName() {
            return this.$store.app.$state.functionSidebar.actionName;
        },
        args() {
            return this.$store.app.$state.functionSidebar.props;
        },
        compo() {
            let componentName =
                this.$store.app.$state.functionSidebar.componentName;
            return forDynamicComponent[componentName];
        },
    },
});
</script>
<style lang="scss">
.function-sidebar {
    padding-top: 24px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 100vh;

    background: rgb(255, 255, 255);
    height: 100vh;
    width: 672px;
    min-width: 640px;
    max-width: 42rem;
    animation: 0.3s ease-out 0s 1 slideInFromLeft;
}
.function-sidebar-overlay {
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    .function-sidebar-close-button {
        top: 10px;
        position: absolute;
        right: 23px;
        cursor: pointer;
    }
}
@keyframes slideInFromLeft {
    0% {
        opacity: 0.5;
        transform: translateX(70%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>

<style lang="scss">
.sidebar-create-garage {
    .header-title {
        h2 {
            font-size: 18px !important;
            line-height: 18px;
            text-align: left;
        }
        padding-left: 24px;
    }
    // color: aliceblue;
    height: 100%;
    .side-bar-create-garage-content {
        margin-top: 32px;
        padding: 0 24px;
        .sidebar-create-garage-row {
            display: flex;
            width: 100%;
            justify-content: space-between;
            span {
                color: black;
                display: flex;
            }
            .custom-v-select {
                padding-bottom: 10px;
            }
        }
        ::-webkit-scrollbar {
            display: none;
        }
        .checkbox {
            .v-label {
                color: black;
                font-size: 13px;
            }
            .v-selection-control__input {
                color: black;
            }
        }
    }
}
</style>
