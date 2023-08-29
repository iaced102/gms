<template>
    <div>
        <v-checkbox
            :label="label"
            v-model="lazyValue"
            :color="color"
            :disabled="disabled"
        >
        </v-checkbox>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        /**
         * Biến cho v-model
         */
        modelValue: {
            default: null as any,
        },
        /**
         * Cài đặt label cho checkbox
         */
        label: {
            type: String,
            default: "" as string,
        },
        /**
         * Đổi màu trong checkbox
         */
        color: {
            type: String,
            default: "" as string,
        },
        /**
         * Cho phép hoặc ngăn người dùng thay đổi giá trị
         */
        disabled: {
            type: Boolean,
            default: false as boolean,
        },
    },
    data() {
        return {
            value: false,
        };
    },
    computed: {
        lazyValue: {
            get: function () {
                return this.modelValue;
            },
            set(newVal: any) {
                this.$emit("update:modelValue", newVal);
            },
        },
    },
});
</script>
<style lang="scss">
.v-selection-control__input::before {
    background-color: #79787861 !important;
}
</style>
