<template>
    <div>
        <div class="multple-row-actions">
            <VCheckbox v-model="value" />
            <span
                v-if="rowSelecteds.length > 0"
                style="
                    margin-right: 32px;
                    font-size: 16px;
                    line-height: 1.25rem;
                    color: rgb(241, 245, 249);
                "
            >
                {{ rowSelecteds.length + " " + $t("tableBase.record") }}
            </span>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        style="margin-right: 0; width: 260px"
                        class="hide-column-menu-btn"
                        :title="$t('tableBase.hideOrOpenColumn')"
                    >
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                            "
                        >
                            <span>{{ $t("common.selectAction") }}</span
                            ><v-icon>mdi-menu-down</v-icon>
                        </div>
                    </v-btn>
                </template>
                <v-list style="min-width: 150px">
                    <v-list-item
                        class="multiple-action-list-item"
                        v-for="(item, index) in contextMenu"
                        @click="item.action(rowSelecteds)"
                    >
                        <v-icon style="margin-right: 10px">{{
                            item.prependIcon
                        }}</v-icon>
                        <span>{{ item.name }}</span>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VCheckbox from "../Vuetify/VCheckbox.vue";
export default defineComponent({
    components: {
        VCheckbox,
    },
    props: {
        rowSelecteds: {
            default: [] as any[],
        },
        contextMenu: {
            default: [] as any[],
        },
    },
    data() {
        return {
            value: true,
        };
    },
    watch: {
        value(newVal) {
            this.$emit("deselectAll");
        },
    },
});
</script>

<style lang="scss">
.multple-row-actions {
    display: flex;
    padding: 0 20px;
    align-items: center;
    width: 450px;
    height: 50px;
    left: 350px;
    border-radius: 8px;
    box-shadow: 20px 20px 50px grey;
    border: 0.5px black solid;
    background: rgb(30, 41, 59);
    position: fixed;
    bottom: 80px;
    .v-selection-control__wrapper {
        color: white;
    }
    .v-input__details {
        display: none !important;
    }
}
.multiple-action-list-item {
    border-bottom: 1px rgb(238, 236, 236) solid;
    cursor: pointer;
    .v-list-item {
        min-height: 32px;
    }
}
</style>
