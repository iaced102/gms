<template>
    <div style="width: 100%; display: flex; justify-content: center">
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-icon v-bind="props" style="cursor: pointer" @click="onCLick">
                    mdi-dots-vertical
                </v-icon>
            </template>
            <v-list class="context-cell">
                <div v-for="(item, index) in actions">
                    <v-list-item
                        :style="
                            index < actions.length - 1
                                ? 'border-bottom: 0.5px solid #e5e7eb'
                                : ''
                        "
                        :key="index"
                        :value="index"
                        @click="item.action()"
                    >
                        <v-icon>{{ item.prependIcon }}</v-icon>
                        {{ item.name }}
                    </v-list-item>
                </div>
            </v-list>
        </v-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    created() {},
    computed: {
        actions() {
            return this.params.column.colDef.contextMenu(this.params);
        },
    },
    methods: {
        onCLick() {},
    },
    props: {
        params: {
            default: {} as any,
        },
    },
});
</script>
<style lang="scss">
.context-cell {
    min-width: 200px;
}
</style>
