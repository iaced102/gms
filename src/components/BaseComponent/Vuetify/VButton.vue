<template>
    <div>
        <v-btn
            @click="onClickButton"
            :variant="variant"
            class="text-capitalize"
            :class="btnClass"
        >
            {{ text }}
        </v-btn>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        btnClass: {
            default: "" as string,
        },
        /**
         * Text hiển thị trên button
         */
        text: {
            type: String,
            default: "button" as string,
        },
        /**
         * Đổi màu nền cho button
         */
        background: {
            type: String,
            default: "white" as string,
        },
        /**
         * Đổi màu chữ cho button
         */
        color: {
            type: String,
            default: "black" as string,
        },
        variant: {
            default: "elevated" as any,
        },
    },
    methods: {
        onClickButton(e: any) {
            this.$emit("click", e);
        },
    },
    emits: ["click"],
    data() {
        return {};
    },
});
</script>

<style lang="scss"></style>
