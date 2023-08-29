<template>
    <div class="wrapper-content">
        <div
            class="header-content"
            style="display: flex; justify-content: space-between"
        >
            <div>
                <h5>{{ tableName }}</h5>
                <p>({{ totalItem + " " + $t("common.result") }})</p>
            </div>
            <div style="display: flex">
                <div style="display: flex">
                    <v-menu
                        v-if="enableHideColumn"
                        :close-on-content-click="false"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                style="margin-right: 15px"
                                class="hide-column-menu-btn"
                                :title="$t('tableBase.hideOrOpenColumn')"
                                ><v-icon>mdi-filter-variant</v-icon></v-btn
                            >
                        </template>
                        <div
                            style="
                                background-color: white;
                                padding: 10px 8px;
                                border-radius: 8px;
                                border: rgb(125, 125, 125) 1px solid;
                                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px
                                    29px 0px;
                            "
                        >
                            <Input
                                style="display: flex"
                                v-model="hideColumnOptionsFilter"
                                :placeholder="$t('common.filter')"
                                width="180px"
                                height="40px"
                            />
                            <v-list class="hide-column-select">
                                <div v-for="(item, index) in hideColumnOptions">
                                    <v-list-item
                                        :key="index"
                                        :value="index"
                                        v-if="
                                            showSelectOptionsFilter(item.title)
                                        "
                                    >
                                        <VCheckbox
                                            v-model="item.enabled"
                                            :label="item.title"
                                        />
                                    </v-list-item>
                                </div>
                            </v-list>
                        </div>
                    </v-menu>
                    <Input
                        style="width: 20%"
                        v-if="enableFilter && inputFilterField.length > 0"
                        v-model="filterTableValue"
                        width="250px"
                        :placeholder="$t('common.filter')"
                    ></Input>
                </div>
                <VButton
                    style="margin-left: 16px"
                    v-if="window.width > 768 && headerButton.headerButton"
                    :text="$t('common.' + headerButton.headerButton)"
                    @click="headerButton.actions"
                />
            </div>
        </div>
        <ag-grid-vue
            :columnDefs="computedColumnDefs"
            class="ag-theme-alpine"
            :allowContextMenuWithControlKey="true"
            :style="{
                height: height,
                width: width,
            }"
            :rowSelection="rowSelection"
            :getContextMenuItems="contextMenuItem"
            @selectionChanged="selectionChanged"
            :rowClass="rowClass"
            :rowData="computedRowData"
            :suppressRowHoverHighlight="true"
            @first-data-rendered="onFirstDataRendered"
            @grid-ready="onGridReady"
            :defaultColDef="defaultColDef"
            :getRowHeight="getRowHeight"
        >
        </ag-grid-vue>
        <MultipleRowAction
            @deselectAll="deselectAll"
            v-if="multipleAction.length > 0 && showMultipleActionMenu"
            :rowSelecteds="rowSelects"
            :contextMenu="multipleAction"
        />
    </div>
</template>
<script lang="ts">
import window from "@/mixins/window.js";
import VCheckbox from "@widget/components/BaseComponent/Vuetify/VCheckbox.vue";
import { defineComponent } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import ActionCell from "./MenuContext.vue";
import VButton from "../Vuetify/VButton.vue";
import MultipleRowAction from "./MultipleRowAction.vue";
import Input from "@widget/components/BaseComponent/Vuetify/VTextField.vue";
interface columnDefs {
    headerClass?: string;
    headerName: string;
    field: string;
    cellRenderer?: any;
    headerCheckboxSelection?: boolean;
    checkboxSelection?: boolean;
}
interface HideColumnOptions {
    title: string;
    field?: string;
    enabled: boolean;
}
export default defineComponent({
    props: {
        multipleAction: {
            default: [] as any[],
        },
        hideColumnOptions: {
            default: [] as HideColumnOptions[],
        },
        enableHideColumn: {
            default: false as boolean,
        },
        rowSelection: {
            default: "" as string,
        },
        tableName: {
            default: "table" as string,
        },
        enableFilter: {
            default: false as boolean,
        },
        inputFilterField: {
            default: [] as string[],
        },
        height: {
            default: "500px" as string,
        },
        width: {
            default: "800px" as string,
        },
        columnDefs: {
            default: [] as columnDefs[],
        },
        rowData: {
            default: [] as any[],
        },
        contextMenuItem: {
            type: Function,
            default: {} as any,
        },
        totalItem: {
            default: 50 as number,
        },
    },
    data() {
        let self = this;
        return {
            enableCreateGarage: false,
            icons: {
                menu: '<i class="mdi mdi-chevron-down-circle"/>',
            },
            rowSelects: [] as any[],
            showMultipleActionMenu: false as boolean,
            filterTableValue: "" as string,
            cloneRowData: [] as any[],
            cloneHideColumnOptions:
                self.hideColumnOptions as HideColumnOptions[],
            hideColumnOptionsFilter: "" as string,
            gridApi: null as any,
            gridColumnApi: null as any,
            defaultColDef: {
                resizable: true,
                icons: {
                    menu: '<i class="mdi mdi-chevron-down-circle"/>',
                },
            },
            rowClass: "ag-row-custom-class",
        };
    },
    methods: {
        selectionChanged(params: any) {
            let allNode = this.gridApi.getSelectedNodes();
            this.rowSelects = allNode;
            this.showMultipleActionMenu = allNode.length > 0;
        },
        deselectAll() {
            this.gridApi.deselectAll();
        },
        getRowHeight(params: any) {
            return 69;
        },
        onGridReady(params: any) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        },
        onFirstDataRendered(params: any) {
            if (this.computedColumnDefs.length <= 8) {
                params.api.sizeColumnsToFit();
            }
        },
        showSelectOptionsFilter(title: string): boolean {
            if (this.hideColumnOptionsFilter == "") {
                return true;
            }
            return title.includes(this.hideColumnOptionsFilter);
        },
    },
    created() {
        this.cloneRowData = this.rowData;
    },

    watch: {
        rowData(newVal) {
            this.cloneRowData = newVal;
        },

        filterTableValue(newVal) {
            if (newVal != "") {
                this.cloneRowData = this.rowData.filter((row: any) => {
                    for (let f of this.inputFilterField) {
                        if (row[f].toString().includes(newVal)) {
                            return true;
                        }
                    }
                    return false;
                });
            } else {
                this.cloneRowData = this.rowData;
            }
        },
    },
    mixins: [window],
    computed: {
        headerButton() {
            return this.$store.state.app.headerActions;
        },
        computedRowData() {
            let cloneRowData = this.cloneRowData;
            return cloneRowData;
        },
        computedColumnDefs() {
            let cloneColumnDefs = this.columnDefs;
            cloneColumnDefs.map((a) => {
                if (a.field == "action" || a.field == "status") {
                    a.headerClass = "base-table-action-header";
                }
                a.headerName = a.headerName.toUpperCase();
            });
            if (this.enableHideColumn) {
                let column = cloneColumnDefs.filter((a: any) => {
                    if (a.field == "id" && this.multipleAction.length > 0) {
                        a.width = 80;
                    }
                    for (let c of this.hideColumnOptions) {
                        if (c.field == a.field || a.field == "action") {
                            return c.enabled;
                        }
                    }
                });

                return column;
            }
            return cloneColumnDefs;
        },
    },
    components: {
        VButton,
        Input,
        AgGridVue,
        VCheckbox,
        MultipleRowAction,
    },
});
</script>
<style lang="scss">
.ag-cell-focus {
    border-color: unset !important;
    border: unset !important;
}
.ag-row-odd {
    background-color: unset !important;
}
.ag-cell-value {
    text-align: left;
}
.hide-column-menu-btn {
    margin-right: 15px;
}
.hide-column-select {
    height: 300px !important;
    .v-list-item {
        padding-top: 0;
        padding-left: 0px;
        padding-bottom: 0;
        min-height: 18px;
        .v-list-item__content {
            padding: 0;
            .v-input__details {
                display: none;
            }
            .v-checkbox .v-selection-control {
                min-height: 18px !important;
                height: 25px;
            }
        }
    }
}
.ag-root-wrapper {
    .ag-header-viewport {
        background: white;
    }
    border: unset !important;
    .ag-header {
        border-bottom: 0.5px solid #e5e7eb !important;
        border-top: 0.5px solid #e5e7eb !important;
    }
    .ag-row {
        --tw-border-opacity: 1;
        border-color: rgb(241 245 249 / var(--tw-border-opacity));
        .ag-cell {
            display: flex;
            align-items: center;
            font-size: 16px;
            text-transform: capitalize;
            font-weight: 400;
        }
    }
}
.wrapper-content {
    background: white;
    border-radius: 8px;
    border: 0.5px solid #e5e7eb;
}
.header-content {
    padding: 24px;
}
.header-content h5 {
    font-size: inherit;
    font-weight: 600;
}
.ag-header-cell-label {
    justify-content: left;
}
.ag-theme-alpine {
    /* bright green, 10% opacity */
    --ag-selected-row-background-color: white;
}
.ag-ltr {
    .ag-header-select-all {
        margin-right: 6px;
    }
}
.base-table-action-header {
    .ag-header-cell-label {
        justify-content: center !important;
    }
}
.mdi-chevron-down-circle {
    color: black !important;
}
.mdi-chevron-down-circle:hover {
    color: black !important;
}
</style>
