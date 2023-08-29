<template>
    <div class="v-locale--is-ltr w-full">
        <span class="mb-2.5" v-if="enableLabel">{{ label }}</span>
        <v-select
            variant="outlined"
            :type="type"
            :disabled="disabled"
            :label="label"
            :itemTitle="itemTitle"
            :itemValue="itemValue"
            :items="computedOptions"
            :placeholder="placeholder"
            v-model="lazyValue"
            :multiple="multiple"
            density="compact"
            class="custom-v-select border-neutral-200 w-full rounded mb-5"
            :class="`h-[${heightComputed}px]`"
        >
            <template
                v-if="multiple"
                v-slot:selection="{ item, index }"
                class="custom-select-chip"
            >
                <div class="custom-select-chip">
                    <v-chip
                        :title="item.title"
                        v-if="index < 2"
                        color="white"
                        class="border rounded-0 mr-1"
                        :class="`h-[${heightComputed - 10}px]`"
                    >
                        <span class="text-sm text-black font-light font-sans">{{
                            item.title
                        }}</span>
                        <v-icon
                            @click.stop="() => removeItem(index)"
                            icon="mdi-close"
                            size="x-small"
                            color="grey"
                            class="ml-0.5"
                        >
                        </v-icon>
                    </v-chip>
                    <span
                        v-if="index === 2"
                        class="text-grey text-caption align-self-center"
                    >
                        (+{{ lazyValue.length - 2 }} others)
                    </span>
                </div>
            </template>
            <template v-slot:item="{ item, index, props }">
                <v-list-item class="flex">
                    <v-list-item-action class="pl-2">
                        <Checkbox
                            v-if="multiple"
                            class="pl-2"
                            :checked="computedOptions[index].checked"
                            v-model="computedOptions[index].checked"
                            :label="item.title"
                        ></Checkbox>
                        <span v-else @click="lazyValue = item.value">
                            {{ item.title }}
                        </span>
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-select>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Checkbox from "@widget/components/Checkbox/index.vue";
interface Options {
    text: string;
    value: string;
}
export default defineComponent({
    created() {
        let options = this.options;
        // if (this.multiple && Array.isArray(this.modelValue)) {
        //         options.map((o: any) => {
        //             o.checked = false;
        //             if (this.modelValue.includes(o[this.itemValue])) {
        //                 o.checked = true;
        //             }
        //         });
        //     }
        this.computedOptions = options;
    },
    components: {
        Checkbox,
    },
    props: {
        /**
         * large | default | small
         */
        size: {
            type: String,
            default: "default" as string,
        },
        disabled: {
            default: false as boolean,
        },
        enableLabel: {
            default: false as boolean,
        },
        itemTitle: {
            default: "text" as string,
        },
        itemValue: {
            default: "value" as string,
        },
        placeholder: {
            default: "" as string,
        },
        /**
         * Biến cho v-model
         */
        modelValue: {
            default: null as any,
        },
        /**
         * Cài đặt label yêu cầu chọn
         */
        label: {
            type: String,
            default: "" as string,
        },
        /**
         * Đổi loại select
         */
        type: {
            default: "input" as string,
        },
        /**
         * Cho phép chọn nhiều option
         */
        multiple: {
            default: false as any,
        },
        /**
         * Cài đặt các option cho select
         */
        options: {
            default: [] as Options[],
        },
        needLabel: {
            default: false as boolean,
        },
        // /**
        //  * Chọn theme select
        //  *
        //  * ['outlined' | 'plain' | 'underlined'  | 'filled'  | 'solo'  | 'solo-inverted'  | 'solo-filled']
        //  */
        // variant: {
        //     default: "outlined" as any,
        // },
    },
    data() {
        return { computedOptions: [] as any[] };
    },
    watch: {
        computedOptions: {
            deep: true,
            handler(newVal: any) {
                let lazyValue = [] as string[];
                this.computedOptions.map((a) => {
                    if (a.checked) {
                        lazyValue.push(a[this.itemValue]);
                        this.lazyValue = lazyValue;
                    }
                });
            },
        },

        options(newVal) {
            debugger;
            let options = newVal;
            if (this.multiple && Array.isArray(this.modelValue)) {
                options.map((o: any) => {
                    o.checked = false;
                    if (this.modelValue.includes(o[this.itemValue])) {
                        o.checked = true;
                    }
                });
            }
            this.computedOptions = options;
        },
    },
    computed: {
        heightComputed() {
            let heightClass;
            if (this.size == "large") {
                heightClass = 52;
            } else if (this.size == "default") {
                heightClass = 40;
            } else if (this.size == "small") {
                heightClass = 32;
            }
            return heightClass;
        },
        onValue() {
            return this.lazyValue.length > 0;
        },
        lazyValue: {
            get: function (): string[] {
                let modelValue = this.modelValue;
                return modelValue;
            },
            set(newVal: any) {
                this.$emit("update:modelValue", newVal);
            },
        },
    },
    methods: {
        removeItem(index: number) {
            let modelValue = this.modelValue;
            modelValue.splice(index, 1);
            this.$emit("update:modelValue", modelValue);
        },
    },
});
</script>
<style scoped lang="scss">
.custom-v-select:deep(.v-input__control) {
    height: inherit;
}
.custom-v-select:deep(.v-field__field) {
    .v-field__input {
        padding-left: 10px !important;
        padding: 0;
        align-content: center;
        ::placeholder {
            color: transparent;
            display: none;
        }
        :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: transparent;
            display: none;
        }
        ::-webkit-input-placeholder {
            /* Edge */
            color: transparent;
            display: none;
        }
    }
}
.custom-v-select:deep(.v-input__details) {
    display: none;
}
.custom-v-select:deep(.v-input__control) {
    border: none;
}

.v-select--selected:deep(.v-field-label) {
    visibility: visible;
}

.v-input--dirty:deep(.v-field-label) {
    visibility: hidden !important;
}
.custom-v-select:deep(.v-field__outline__notch) {
    border-width: 0;
    width: 0;
    // visibility: hidden;
}

.custom-v-select:deep(.v-field__outline__start) {
    border-color: gray;
}

.custom-v-select:deep(.v-field__outline__end) {
    border-color: gray;
}
.custom-v-select-on-value:deep(.v-field-label) {
    visibility: visible;
}
</style>
