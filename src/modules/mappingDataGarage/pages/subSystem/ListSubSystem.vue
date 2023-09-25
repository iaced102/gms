<template>
    <div>
        <CDTable
            ref="table"
            :tableName="$t('module.mappingDataGarage.subSystem.tableName')"
            :actions="tableActions"
            :rowData="rowData"
            :columns="columns"
            :forStatus="true"
            :forFilter="true"
            :filterColumns="filterColumns"
            :forActions="true"
            positionDropdownClass="right-[40px] bottom-[-65px]"
            :contextActions="contextActions"
            :pagination="pagination"
            @filter="filter"
            :multipleRowActions="multipleRowActions"
            @changePage="changePage"
        />
        <CDDialog
            v-if="dialogConfig.show"
            :title="dialogConfig.title"
            :content="dialogConfig.content"
            @closeDialog="closeDialog"
            :width="`${
                dialogConfig.dynamicComponent &&
                dialogConfig.dynamicComponent.length > 0
                    ? 'w-1/2'
                    : 'w-96'
            }`"
        >
            <template #title>
                <h1 class="pb-5 border-b text-2xl">{{ dialogConfig.title }}</h1>
            </template>
            <template
                v-if="
                    dialogConfig.dynamicComponent &&
                    dialogConfig.dynamicComponent.length > 0
                "
                #content
            >
                <div>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3 py-6 border-b"
                        commonClass="flex align-center"
                        :modelValue="dialogConfig.dynamicComponent"
                    />
                </div>
            </template>
            <template #action class="mt-4 flex justify-around">
                <div class="mt-4 flex justify-end">
                    <button
                        class="mr-2"
                        v-for="a in dialogConfig.actions"
                        :class="a.class"
                        @click="a.action"
                    >
                        {{ a.name }}
                    </button>
                </div>
            </template>
        </CDDialog>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mappingDataGarageStore } from "../../store/index";
import _cloneDeep from "lodash/cloneDeep";
const store = mappingDataGarageStore();
const displayCol = ["id", "name", "description", "status"];

import { subSystemConfigTemplate } from "../../data/index";
const cloneSubSystemConfigTemplate = _cloneDeep(subSystemConfigTemplate) as any;
const baseCloneSubSystemConfigTemplate = _cloneDeep(
    subSystemConfigTemplate,
) as any;
export default defineComponent({
    async created() {
        this.getDataForTable();
    },
    methods: {
        closeDialog() {
            this.dialogConfig.show = false;
        },
        filter(config: any) {
            //console.log(config);
            this.pagination.currentPage = 1;
            this.getDataForTable(config);
        },
        changePage(val: any) {
            this.pagination.currentPage = val.currentPage;
            this.getDataForTable();
        },
        async getDataForTable(config: any = {}) {
            let self = this;
            this.rowData = [];
            let res = (await store.getAllSubSystem({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
                ...config,
            })) as any;

            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.mappingDataGarage.subSystem.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.mappingDataGarage.subSystem.columnTable." + a,
                    ),
                };
            });
            this.columns.push({
                field: "action",
                headerName: self.$t(
                    "module.mappingDataGarage.subSystem.columnTable.action",
                ),
            });
            this.pagination.total = res.totalElement;
        },
    },
    watch: {
        "dialogConfig.show"(newVal) {
            if (!newVal) {
                this.dialogConfig.dynamicComponent.map((a) => {
                    if (a.props) {
                        a.props.modelValue =
                            baseCloneSubSystemConfigTemplate[
                                a.field
                            ].props.modelValue;
                    }
                });
            }
        },
        "dialogConfig.dynamicComponent": {
            deep: true,
            handler(newVal: any, old: any) {},
        },
    },
    data() {
        let self = this as any;
        return {
            timeOut: {} as any,
            subSystemConfigTemplate: cloneSubSystemConfigTemplate as any,
            filterColumns: [
                {
                    label: self.$t(
                        "module.mappingDataGarage.subSystem.filterColumn.description",
                    ),
                    value: "parentGarageId",
                },
                {
                    label: self.$t(
                        "module.mappingDataGarage.subSystem.filterColumn.name",
                    ),
                    value: "name",
                },
                {
                    label: self.$t(
                        "module.mappingDataGarage.subSystem.filterColumn.status",
                    ),
                    value: "status",
                    type: "CDSelect",
                    options: [
                        {
                            id: 1,
                            value: self.$t(
                                "module.mappingDataGarage.subSystem.status.1",
                            ),
                        },
                        {
                            id: 2,
                            value: self.$t(
                                "module.mappingDataGarage.subSystem.status.2",
                            ),
                        },
                        {
                            id: 3,
                            value: self.$t(
                                "module.mappingDataGarage.subSystem.status.3",
                            ),
                        },
                    ],
                },
            ],
            multipleRowActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.mappingDataGarage.subSystem.multipleRowActions.accept",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = (await store.acceptSubSystem(ids)) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.mappingDataGarage.subSystem.multipleRowActions.reject",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = (await store.rejectSubSystem(ids)) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
            ],
            originData: {} as any,
            dialogConfig: {
                show: false,
                title: "",
                content: "",
                dynamicComponent: [] as any[],
                actions: [] as any[],
            },
            pagination: {
                perPage: 10,
                total: 0,
                currentPage: 1,
            },
            tableActions: {
                action: async () => {
                    let subSystemConfigTemplate = {
                        ...this.subSystemConfigTemplate,
                    } as any;
                    let dynamicComponent = [] as any[];
                    Object.keys(subSystemConfigTemplate).map((a: any) => {
                        if (subSystemConfigTemplate[a].props) {
                            subSystemConfigTemplate[a].instanceKey =
                                Date.now() + subSystemConfigTemplate[a].field;
                        }
                        if (subSystemConfigTemplate[a].setup) {
                            subSystemConfigTemplate[a].setup(
                                subSystemConfigTemplate[a].instanceKey,
                            );
                        }
                        subSystemConfigTemplate[a].props.modelValue = "";
                        dynamicComponent.push(subSystemConfigTemplate[a]);
                    });
                    self.dialogConfig = {
                        show: true,
                        title: self.$t(
                            "module.mappingDataGarage.subSystem.dialog.createSubSystem",
                        ),
                        dynamicComponent: dynamicComponent,
                        actions: [
                            {
                                class: "block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm border mr-4 flex justify-center items-center border-black",
                                name: self.$t(
                                    "module.generalManagerment.garage.dialog.cancel",
                                ),
                                action: () => {
                                    self.dialogConfig.show = false;
                                },
                            },
                            {
                                class: "block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                name: self.$t(
                                    "module.mappingDataGarage.subSystem.dialog.create",
                                ),
                                action: async () => {
                                    let data = {} as any;
                                    self.dialogConfig.dynamicComponent.map(
                                        (a: any) => {
                                            if (a.static) {
                                                data[a.field] = a.value;
                                            } else {
                                                data[a.field] =
                                                    a.props.modelValue;
                                            }
                                        },
                                    );

                                    let res = (await store.createSubSystem(
                                        data,
                                    )) as any;
                                    if (res.code == 1) {
                                        self.$toast(
                                            self.$t(
                                                "module.mappingDataGarage.subSystem.toast.createSubSystemSuccess",
                                            ),
                                            true,
                                        );
                                        self.getDataForTable();
                                    } else {
                                        self.$toast(
                                            self.$t(
                                                "module.mappingDataGarage.subSystem.toast.createSubSystemFailse",
                                            ),
                                            false,
                                        );
                                    }
                                    self.dialogConfig.show = false;
                                },
                            },
                        ],
                    };
                },
                name: this.$t("module.mappingDataGarage.subSystem.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.mappingDataGarage.subSystem.contextActions.accept",
                    ),
                    action: async (params: any) => {
                        let res = (await store.acceptSubSystem([
                            params.id,
                        ])) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.mappingDataGarage.subSystem.contextActions.reject",
                    ),
                    action: async (params: any) => {
                        let res = (await store.rejectSubSystem([
                            params.id,
                        ])) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.mappingDataGarage.subSystem.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.mappingDataGarage.subSystem.contextActions.detail",
                    ),
                    action: async (params: any) => {
                        let data = (await store.getDetailSubSystem(
                            params.id,
                        )) as any;
                        let subSystemConfigTemplate = {
                            ...this.subSystemConfigTemplate,
                        } as any;
                        let dynamicComponent = [] as any[];
                        Object.keys(subSystemConfigTemplate).map((a: any) => {
                            if (subSystemConfigTemplate[a].props) {
                                subSystemConfigTemplate[a].instanceKey =
                                    Date.now() +
                                    subSystemConfigTemplate[a].field;
                            }
                            if (subSystemConfigTemplate[a].setup) {
                                subSystemConfigTemplate[a].setup(
                                    subSystemConfigTemplate[a].instanceKey,
                                );
                            }
                            if (data.data.hasOwnProperty(a)) {
                                subSystemConfigTemplate[a].props.modelValue =
                                    data.data[a];
                            }
                            subSystemConfigTemplate[a].props.disabled = true;
                            dynamicComponent.push(subSystemConfigTemplate[a]);
                        });
                        self.dialogConfig = {
                            show: true,
                            title: self.$t(
                                "module.mappingDataGarage.subSystem.dialog.detail",
                            ),
                            dynamicComponent: dynamicComponent,
                            actions: [
                                {
                                    class: "block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm border mr-4 flex justify-center items-center border-black",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig.show = false;
                                    },
                                },
                            ],
                        };
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.mappingDataGarage.subSystem.contextActions.update",
                    ),
                    action: async (params: any) => {
                        let data = (await store.getDetailSubSystem(
                            params.id,
                        )) as any;
                        let subSystemConfigTemplate = {
                            ...this.subSystemConfigTemplate,
                        } as any;
                        let dynamicComponent = [] as any[];
                        Object.keys(subSystemConfigTemplate).map((a: any) => {
                            if (subSystemConfigTemplate[a].props) {
                                subSystemConfigTemplate[a].instanceKey =
                                    Date.now() +
                                    subSystemConfigTemplate[a].field;
                            }
                            if (subSystemConfigTemplate[a].setup) {
                                subSystemConfigTemplate[a].setup(
                                    subSystemConfigTemplate[a].instanceKey,
                                );
                            }
                            if (data.data.hasOwnProperty(a)) {
                                subSystemConfigTemplate[a].props.modelValue =
                                    data.data[a];
                            }
                            subSystemConfigTemplate[a].props.disabled = false;
                            dynamicComponent.push(subSystemConfigTemplate[a]);
                        });
                        self.dialogConfig = {
                            show: true,
                            title: self.$t(
                                "module.mappingDataGarage.subSystem.dialog.update",
                            ),
                            dynamicComponent: dynamicComponent,
                            actions: [
                                {
                                    class: "block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm border mr-4 flex justify-center items-center border-black",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig.show = false;
                                    },
                                },
                                {
                                    class: "block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                    name: self.$t(
                                        "module.mappingDataGarage.subSystem.dialog.update",
                                    ),
                                    action: async () => {
                                        let data = {} as any;
                                        self.dialogConfig.dynamicComponent.map(
                                            (a: any) => {
                                                if (a.static) {
                                                    data[a.field] = a.value;
                                                } else {
                                                    data[a.field] =
                                                        a.props.modelValue;
                                                }
                                            },
                                        );

                                        let res = (await store.updateSubSystem(
                                            data,
                                            params.id,
                                        )) as any;
                                        if (res.code == 1) {
                                            self.$toast(
                                                self.$t(
                                                    "module.mappingDataGarage.subSystem.toast.updateSubSystemSuccess",
                                                ),
                                                true,
                                            );
                                            self.getDataForTable();
                                        } else {
                                            self.$toast(
                                                self.$t(
                                                    "module.mappingDataGarage.subSystem.toast.updateSubSystemFailse",
                                                ),
                                                false,
                                            );
                                        }
                                        self.dialogConfig.show = false;
                                    },
                                },
                            ],
                        };
                    },
                },
            ],
        };
    },
});
</script>
