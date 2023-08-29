<template>
    <div>
        <span v-if="needLabel">{{ label }}</span>
        <v-select
            class="custom-v-select"
            :type="type"
            :label="label"
            v-model="lazyValue"
            :multiple="multiple"
            :class="{
                'custom-v-select-multiple': multiple,
                'custom-v-select-on-value': modelValue != '' && modelValue != 0,
            }"
            :items="options"
            style="height: 40px"
        >
            <template v-if="multiple" v-slot:selection="{ item, index }">
                <v-chip
                    :title="item.title"
                    v-if="index < 2"
                    style="background: #c9c2c2; width: 28%"
                >
                    <span class="chip-select">{{ item.title }}</span>
                </v-chip>
                <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                >
                    (+{{ lazyValue.length - 2 }} others)
                </span>
            </template>
            <template v-slot:item="{ active, item, attrs, on }">
                <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
                    <v-list-item-action>
                        <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-row no-gutters align="center">
                                <span>{{ item.label }}</span>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-select>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            default: null as any,
        },
        label: {
            default: "" as string,
        },
        type: {
            default: "input" as string,
        },
        multiple: {
            default: false as boolean,
        },
        options: {
            default: [] as any[],
        },
        needLabel: {
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
<style lang="scss" scoped>
.custom-v-select {
    .v-input__control {
        border: black 1px solid;
        overflow: hidden;
        background: white;
        height: 40px;
        border-radius: 10px;
        .v-field {
            border-radius: 10px;
            .v-field__field {
                background: white;
                height: 40px;
                border-radius: 10px;
                .v-field-label--floating {
                    font-size: 16px !important;
                    // display: none;
                }
                .v-field-label {
                    top: 7px;
                }
            }
            .v-field__append-inner {
                padding-top: 5px;
            }
            .v-field__input {
                min-height: unset !important;
                padding: 0;
                height: 40px;
                .v-select__selection {
                    .v-chip {
                        width: 100% !important;
                    }
                    padding-left: 10px !important;
                    align-items: center;
                    height: 40px;
                }
            }
        }
    }
}
.custom-v-select-multiple {
    .v-field-label--floating {
        font-size: 16px !important;
        // display: none;
        visibility: hidden !important;
    }
}
.custom-v-select-on-value {
    .v-field__field {
        .v-label {
            display: none;
        }
        // display: none;
    }
}
.custom-v-select-chip-signle-no-value {
    display: none !important;
}
.chip-select {
    display: inline-block !important;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
