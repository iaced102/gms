<template>
    <div class="v-locale--is-ltr w-full">
        <span class="mb-2.5" v-if="enableLabel">{{ label }}</span>
        <v-text-field
            variant="outlined"
            :placeholder="placeholder"
            :type="type"
            :clearable="clearable"
            :disabled="disabled"
            :label="label"
            :class="`h-[${sizeComputed}] `"
            v-model="lazyValue"
            :style="`--custom-border: ${stateComputed}`"
            density="compact"
            :append-inner-icon="
                stateComputed == 'green'
                    ? 'mdi mdi-check'
                    : stateComputed == 'red'
                    ? 'mdi mdi-window-close'
                    : ''
            "
            class="custom-input border-neutral-200 w-full mb-5"
        ></v-text-field>
        <span v-if="stateComputed == 'green'" style="color: green">
            This is valid state</span
        >
        <span v-if="stateComputed == 'red'" style="color: red">
            This is invalid state</span
        >
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { string } from "yup";

export default defineComponent({
    props: {
        size: {
            default: "default" as string,
        },
        state: {
            default: "" as string,
        },
        useState: {
            default: false as boolean,
        },
        disabled: {
            default: false as boolean,
        },
        enableLabel: {
            default: false as boolean,
        },
        modelValue: {
            default: null as any,
        },
        label: {
            default: "" as string,
        },
        placeholder: {
            default: "" as string,
        },
        type: {
            default: "input" as string,
        },
        clearable: {
            default: false as boolean,
        },
    },
    data() {
        return {
            borderVariable: "",
            value: false,
        };
    },
    watch: {
        modelValue(newval) {
            this.borderVariable = this.stateComputed;
        },
    },
    computed: {
        sizeComputed() {
            let heightClass;
            if (this.size == "large") {
                heightClass = "52px";
            } else if (this.size == "default") {
                heightClass = "40px";
            } else if (this.size == "small") {
                heightClass = "32px";
            }
            return heightClass;
        },
        stateComputed() {
            let stateClass;
            if (this.useState) {
                if (this.modelValue != "") {
                    if (this.state.match(this.modelValue)) {
                        stateClass = "green";
                    } else {
                        stateClass = "red";
                    }
                } else {
                    stateClass = "";
                }
            } else {
                stateClass = "";
            }
            return stateClass;
        },
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

<style scoped lang="scss">
.custom-input:deep(.v-input__details) {
    display: none;
}
.custom-input:deep(.v-field__outline__notch) {
    width: 0px !important;
}
.custom-input:deep(.v-input__control) {
    height: inherit;
}
.custom-input:deep(.v-field-label) {
    transition: none !important;
    transition-property: none !important;
    -webkit-transform: none;
    transform: none;
}
.custom-input:deep(.v-field__outline__start) {
    border-color: var(--custom-border);
}
.custom-input:deep(.v-field__outline__end) {
    border-color: var(--custom-border);
}
</style>
<style lang="scss">
.custom-input >>> input[type="number"] {
    -moz-appearance: textfield;
}
.custom-input >>> input::-webkit-outer-spin-button,
.custom-input >>> input::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
