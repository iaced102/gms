<template>
    <div class="custom-cell">
        <span :class="'custom-cell-' + field + '-' + value">{{ text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    created() {},
    computed: {
        field() {
            return this.params.colDef.field;
        },
        value() {
            return this.params.value;
        },
        text() {
            return this.$t("statusCell." + this.field + "." + this.value);
        },
    },
    props: {
        params: {
            default: {} as any,
        },
    },
});
</script>
<style lang="scss">
.custom-cell {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.custom-cell-status-1 {
    display: flex;
    align-items: center;
    text-align: center;
    width: 110px;
    height: 28px;
    border-radius: 999px;
    color: rgb(80, 199, 147);
    background: rgba(80, 199, 147, 0.25);
    justify-content: center;
}
.custom-cell-status-3 {
    display: flex;
    align-items: center;
    text-align: center;
    width: 110px;
    height: 28px;
    border-radius: 999px;
    color: rgb(250 145 107);
    background: rgba(250, 145, 107, 0.25);
    justify-content: center;
}
.custom-cell-status-2 {
    display: flex;
    align-items: center;
    text-align: center;
    width: 110px;
    height: 28px;
    border-radius: 999px;
    color: rgb(241 89 92);
    background: rgba(241, 89, 92, 0.25);
    justify-content: center;
}
</style>
