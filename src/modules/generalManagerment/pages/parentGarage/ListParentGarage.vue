<template>
    <div>
        <CDTable
            :tableName="$t('module.generalManagerment.parentGarage.tableName')"
            :actions="tableActions"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    created() {
        console.log(this);
        console.log(this.$store);
    },
    data() {
        return {
            tableActions: {
                action: () => {
                    console.log(this);
                },
                name: this.$t("module.generalManagerment.parentGarage.addNew"),
            },
            rowData: [] as any[],
        };
    },
});
</script>
