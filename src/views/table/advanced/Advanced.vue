<template>
    <div>
        <Card noborder>
            <div
                class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
            >
                <h5>{{ tableName }}</h5>
                <div class="flex">
                    <v-dialog v-model="isOpenDialog" class="w-2/3">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                style="margin-right: 15px"
                                @click="openDialog"
                                :title="$t('tableBase.hideOrOpenColumn')"
                                ><v-icon>mdi-filter-outline</v-icon></v-btn
                            >
                        </template>

                        <v-card>
                            <v-card-title>
                                <div class="flex justify-between">
                                    Edit filter
                                    <v-icon @click="closeDialog"
                                        >mdi-window-close</v-icon
                                    >
                                </div></v-card-title
                            >

                            <v-card-text
                                class="bg-neutral-50 m-3 border-l-4 border-neutral-200 py-3 px-4"
                            >
                                <div
                                    v-for="(col, index) in filterConfig"
                                    class="mb-5"
                                    :class="{
                                        'px-2 mx-1 border-info-400 border-l-4 bg-neutral-100 px-2 py-3':
                                            index > 0,
                                    }"
                                >
                                    <div class="w-2/5 flex mb-7 items-end">
                                        <Select
                                            classInput="bg-white rounded border"
                                            :label="$t('common.filterColumn')"
                                            itemTitle="label"
                                            class="w-full"
                                            itemValue="field"
                                            v-model="col.field"
                                            :options="columns"
                                        ></Select>
                                        <v-icon
                                            class="ml-5 mb-3"
                                            @click="addFilter"
                                            v-if="index == 0"
                                        >
                                            mdi mdi-plus
                                            <!-- {{ $t("common.addFilter") }} -->
                                        </v-icon>
                                    </div>
                                    <div
                                        class="w-full flex justify-around items-end"
                                    >
                                        <div class="w-1/5">
                                            <Select
                                                classInput="bg-white rounded border"
                                                :disabled="true"
                                                :options="[
                                                    {
                                                        label: $t(
                                                            'common.include',
                                                        ),
                                                        value: 'include',
                                                    },
                                                ]"
                                                itemTitle="label"
                                                itemValue="value"
                                                v-model="isInclude"
                                                value="include"
                                            ></Select>
                                        </div>
                                        <div class="w-3/5">
                                            <Textinput
                                                classInput="bg-white rounded border"
                                                :label="
                                                    $t('common.filterValue')
                                                "
                                                v-model="col.value"
                                                type="text"
                                                :placeholder="
                                                    $t('common.filterValue')
                                                "
                                            />
                                        </div>
                                        <v-icon
                                            class="mb-3"
                                            @click="() => removeFilter(index)"
                                            >mdi mdi-close</v-icon
                                        >
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-actions class="bg-neutral-50 px-6 py-3">
                                <div class="justify-end">
                                    <v-btn
                                        @click="closeDialog"
                                        class="rounded border"
                                    >
                                        {{ $t("common.cancel") }}
                                    </v-btn>
                                    <v-btn
                                        @click="filter"
                                        class="rounded border bg-primary-600 text-white"
                                    >
                                        {{ $t("common.filter") }}
                                    </v-btn>
                                </div>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <InputGroup
                        class="search-input"
                        v-model="searchTerm"
                        placeholder="Search"
                        type="text"
                        prependIcon="heroicons-outline:search"
                        merged
                    />
                </div>
            </div>

            <vue-good-table
                :style="`height:${height}`"
                :columns="computedColumns"
                :styleClass="`vgt-table bordered h-[${height}]`"
                :rows="rowData"
                :search-options="{
                    enabled: true,
                    externalQuery: searchTerm,
                }"
                class="good-table-base overflow-y-scroll"
                :class="`h-[${height}]`"
                v-on:selected-rows-change="selectionChanged"
                :select-options="{
                    enabled: true,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    selectioninfoClass: 'custom-class',
                    selectionText: 'rows selected',
                    clearSelectionText: 'clear',
                    disableSelectinfo: true, // disable the select info-500 panel on top
                    selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                }"
            >
                <template v-slot:table-row="props" class="text-slate-400">
                    <span v-if="props.column.field == 'id'" class="flex">
                        <span
                            class="text-sm text-slate-600 text-sm font-medium capitalize"
                            >{{ props.row.id }}
                        </span>
                    </span>
                    <span v-else-if="props.column.field == 'name'" class="flex">
                        <span
                            class="text-sm text-slate-600 text-sm font-medium capitalize"
                            >{{ props.row.name }}
                        </span>
                    </span>
                    <span v-else-if="props.column.field == 'order'">
                        {{ "#" + props.row.order }}
                    </span>
                    <span
                        v-else-if="props.column.field == 'date'"
                        class="text-slate-500"
                    >
                        {{ props.row.date }}
                    </span>
                    <span
                        v-else-if="props.column.field == 'status'"
                        class="w-full h-full centered"
                    >
                        <span
                            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                            :class="`${
                                props.row.status == '1'
                                    ? 'text-success-500 bg-success-500'
                                    : ''
                            } 
                        ${
                            props.row.status == '3'
                                ? 'text-warning-500 bg-warning-500'
                                : ''
                        }
                        ${
                            props.row.status == '2'
                                ? 'text-danger-500 bg-danger-500'
                                : ''
                        }
                        
                        `"
                        >
                            {{ $t("statusCell.status." + props.row.status) }}
                        </span>
                    </span>
                    <span
                        v-else-if="props.column.field == 'action'"
                        class="w-full h-full centered"
                    >
                        <Dropdown classMenuItems=" w-[200px]">
                            <span class="text-xl"
                                ><Icon icon="heroicons-outline:dots-vertical"
                            /></span>
                            <template v-slot:menus>
                                <MenuItem
                                    v-for="(item, i) in actions"
                                    :key="i"
                                    @click="item.actions(props)"
                                >
                                    <div
                                        :class="`
                                                ${
                                                    item.name === 'delete'
                                                        ? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
                                                        : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
                                                }
                                                w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `"
                                    >
                                        <span class="text-base"
                                            ><Icon :icon="item.icon"
                                        /></span>
                                        <span>{{ item.name }}</span>
                                    </div>
                                </MenuItem>
                            </template>
                        </Dropdown>
                    </span>
                    <span v-else class="text-slate-400">
                        {{ props.row[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
            <div class="py-4 px-3">
                <Pagination
                    :total="paginationConfig.total"
                    :current="paginationConfig.current"
                    :per-page="paginationConfig.pageSize"
                    :pageRange="paginationConfig.pageRange"
                    :pageSize="paginationConfig.pageSize"
                    :pageSizeOptions="paginationConfig.pageSizeOptions"
                    @page-changed="(data:any)=>$emit('pageChange', data)"
                    :options="paginationConfig.pageSizeOptions"
                    :enableChangePageSize="true"
                >
                    >
                </Pagination>
            </div>
        </Card>
        <MultipleRowAction
            v-if="multipleAction.length > 0 && rowSelects.length > 0"
            :rowSelecteds="rowSelects"
            :contextMenu="multipleAction"
        />
    </div>
</template>
<script lang="ts">
import Select from "@/components/Select/index.vue";
import Dropdown from "@/components/Dropdown/index.vue";
import Card from "@/components/Card/index.vue";
import Icon from "@/components/Icon/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import InputGroup from "@/components/InputGroup/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "../../../constant/basic-tablle-data";
import MultipleRowAction from "@/components/BaseComponent/Table/MultipleRowAction.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        Textinput,
        Pagination,
        InputGroup,
        Dropdown,
        Icon,
        Card,
        MenuItem,
        Select,
        MultipleRowAction,
    },
    props: {
        tableName: {
            default: "" as string,
        },
        multipleAction: {
            default: [] as any[],
        },
        height: {
            default: "100%" as string,
        },
        paginationConfig: {
            default: {
                current: 1,
                perpage: 10,
                pageRange: 5,
                total: 50,
                pageSizeOptions: [
                    {
                        value: 50,
                        label: "50",
                    },
                    {
                        value: 100,
                        label: "100",
                    },
                    {
                        value: 200,
                        label: "200",
                    },
                    {
                        value: 1000,
                        label: "1000",
                    },
                ],
            } as any,
        },
        rowData: {
            default: [] as any[],
        },
        actions: {
            default: [] as any[],
        },
        columns: {
            default: [] as any[],
        },
        options: {
            default: [] as any[],
        },
    },
    computed: {
        computedColumns() {
            let columns = this.columns;
            columns.forEach((c: any) => {
                if (c.field == "name") {
                    c.width = "150px";
                }
                if (c.field == "phone") {
                    c.width = "150px";
                }
            });
            return columns;
        },
    },
    methods: {
        selectionChanged(params: any) {
            this.rowSelects = params.selectedRows;
            // params.selectedRows - all rows that are selected (this page)
        },
        filter() {
            let data = {} as any;
            this.filterConfig.map((a: any) => {
                data[a.field] = a.value;
            });
            this.$emit("filter", data);
            this.closeDialog();
        },
        closeDialog() {
            this.isOpenDialog = false;
        },
        addFilter() {
            this.filterConfig.push({
                field: "",
                value: "",
            });
        },
        removeFilter(index: number) {
            if (this.filterConfig.length > 1) {
                this.filterConfig.splice(index, 1);
            } else {
                this.filterConfig[0] = {
                    field: "",
                    value: "",
                };
            }
        },
        openDialog() {
            this.isOpenDialog = true;
        },
    },

    data() {
        return {
            rowSelects: [],
            isInclude: "include",
            filterConfig: [
                {
                    field: "",
                    value: "",
                },
            ],
            isOpenDialog: false,
            current: 1,
            perpage: 10,
            pageRange: 5,
            searchTerm: "",
        };
    },
});
</script>
<style lang="scss" scoped>
.good-table-base:deep(.vgt-left-align) {
    vertical-align: middle !important;
}
.good-table-base:deep(th) {
    background: white;
}
.search-input:deep(.classinput) {
    border-style: solid !important;
}
.good-table-base:deep(thead) th {
    position: -webkit-sticky;
    position: sticky;
    text-align: center !important;
    top: 0;
    .vgt-left-align {
    }
}
.good-table-base:deep(.vgt-left-align):has(.centered) {
    text-align: center;
}
</style>
