<template>
    <div>
        <CDTable
            ref="table"
            :tableName="$t('module.garageService.garageService.tableName')"
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
                        @onSearch="onSearch"
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
import { garageServiceStore } from "../../store/index";
import { generalManagermentStore } from "@/modules/generalManagerment/store/index";
import _cloneDeep from "lodash/cloneDeep";
const store = garageServiceStore();
const displayCol = ["id", "name", "description", "status"];
const garageStore = generalManagermentStore();

import { garageServiceConfigTemplate } from "../../data/index";
const cloneGarageServiceConfigTemplate = _cloneDeep(
    garageServiceConfigTemplate,
) as any;
const baseCloneGarageServiceConfigTemplate = _cloneDeep(
    garageServiceConfigTemplate,
) as any;
export default defineComponent({
    async created() {
        this.getDataForTable();
        store.getAllTagsForStore();
        store.getListSubSystem();

        this.garageServiceConfigTemplate.garageId.setup = (
            instanceKey: string,
        ) => {
            setTimeout(() => {
                this.getGarages("", instanceKey);
            }, 100);
        };
        this.garageServiceConfigTemplate.garageId.onSearch = (
            instanceKey: string,
            val: string,
        ) => {
            this.getGarages(val, instanceKey);
        };
        // this.garageServiceConfigTemplate.garageId.onUpdate = (
        //     val: string,
        //     instanceKey: string,
        // ) => {
        //     this.onUpdateGarageId(val, instanceKey);
        // };

        this.garageServiceConfigTemplate.carSubSystems.setup = (
            instanceKey: string,
        ) => {
            setTimeout(() => {
                let options = store.listSubSystem.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
                    };
                });
                let field = this.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = options;
            }, 200);
        };
        this.garageServiceConfigTemplate.tags.setup = (instanceKey: string) => {
            debugger;
            setTimeout(() => {
                let options = store.tags.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
                    };
                });
                let field = this.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = options;
            }, 200);
        };
    },
    methods: {
        onSearch(instanceKey: string, val: string) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            clearTimeout(this.timeOut[field.instanceKey]);
            this.timeOut[field.instanceKey] = () => {
                setTimeout(() => {
                    field.onSearch(instanceKey, val);
                }, 1000);
            };
            this.timeOut[field.instanceKey]();
        },
        async getGarages(val: string, instanceKey: any) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            if (
                field &&
                field.props.options.length == 0 &&
                field.props.options.modelValue != ""
            ) {
                let res = await garageStore.getAllGarage({
                    pageSize: 10,
                    pageNumber: 1,
                    id: field.props.modelValue,
                });
                field.props.options = res.data.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.id,
                        text: a.name,
                    };
                });
            } else if (val == "") {
                let res = await garageStore.getAllGarage({
                    pageSize: 10,
                    pageNumber: 1,
                });

                field.props.options = res.data.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.id,
                        text: a.name,
                    };
                });
            } else {
                let res = await garageStore.getAllGarage({
                    pageSize: 10,
                    pageNumber: 1,
                    name: val,
                });
                field.props.options = res.data.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.id,
                        text: a.name,
                    };
                });
            }
        },
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
            let res = (await store.getAllGarageService({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
                ...config,
            })) as any;

            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.garageService.garageService.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.garageService.garageService.columnTable." + a,
                    ),
                };
            });
            this.columns.push({
                field: "action",
                headerName: self.$t(
                    "module.garageService.garageService.columnTable.action",
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
                            baseCloneGarageServiceConfigTemplate[
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
            garageServiceConfigTemplate:
                cloneGarageServiceConfigTemplate as any,
            filterColumns: [
                {
                    label: self.$t(
                        "module.garageService.garageService.filterColumn.description",
                    ),
                    value: "parentGarageId",
                },
                {
                    label: self.$t(
                        "module.garageService.garageService.filterColumn.name",
                    ),
                    value: "name",
                },
                {
                    label: self.$t(
                        "module.garageService.garageService.filterColumn.status",
                    ),
                    value: "status",
                    type: "CDSelect",
                    options: [
                        {
                            id: 1,
                            value: self.$t(
                                "module.garageService.garageService.status.1",
                            ),
                        },
                        {
                            id: 2,
                            value: self.$t(
                                "module.garageService.garageService.status.2",
                            ),
                        },
                        {
                            id: 3,
                            value: self.$t(
                                "module.garageService.garageService.status.3",
                            ),
                        },
                    ],
                },
            ],
            multipleRowActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.garageService.garageService.multipleRowActions.accept",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = (await store.acceptGarageService(ids)) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.garageService.garageService.multipleRowActions.reject",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = (await store.rejectGarageService(ids)) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.rejectFailse",
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
                    let garageServiceConfigTemplate = {
                        ...this.garageServiceConfigTemplate,
                    } as any;
                    let dynamicComponent = [] as any[];
                    Object.keys(garageServiceConfigTemplate).map((a: any) => {
                        if (garageServiceConfigTemplate[a].props) {
                            garageServiceConfigTemplate[a].instanceKey =
                                Date.now() +
                                garageServiceConfigTemplate[a].field;
                        }
                        if (garageServiceConfigTemplate[a].setup) {
                            garageServiceConfigTemplate[a].setup(
                                garageServiceConfigTemplate[a].instanceKey,
                            );
                        }
                        // garageServiceConfigTemplate[a].props.modelValue = "";
                        dynamicComponent.push(garageServiceConfigTemplate[a]);
                    });
                    self.dialogConfig = {
                        show: true,
                        title: self.$t(
                            "module.garageService.garageService.dialog.createGarageService",
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
                                    "module.garageService.garageService.dialog.create",
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
                                                if (a.type == "CDMultiselect") {
                                                    data[a.field] =
                                                        a.props.modelValue.map(
                                                            (b) => {
                                                                return {
                                                                    id: b,
                                                                };
                                                            },
                                                        );
                                                }
                                            }
                                        },
                                    );

                                    let res = (await store.createGarageService(
                                        data,
                                    )) as any;
                                    if (res.code == 1) {
                                        self.$toast(
                                            self.$t(
                                                "module.garageService.garageService.toast.createGarageServiceSuccess",
                                            ),
                                            true,
                                        );
                                        self.getDataForTable();
                                    } else {
                                        self.$toast(
                                            self.$t(
                                                "module.garageService.garageService.toast.createGarageServiceFailse",
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
                name: this.$t("module.garageService.garageService.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.garageService.garageService.contextActions.accept",
                    ),
                    action: async (params: any) => {
                        let res = (await store.acceptGarageService([
                            params.id,
                        ])) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.garageService.garageService.contextActions.reject",
                    ),
                    action: async (params: any) => {
                        let res = (await store.rejectGarageService([
                            params.id,
                        ])) as any;
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.garageService.garageService.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.garageService.garageService.contextActions.detail",
                    ),
                    action: async (params: any) => {
                        let data = (await store.getDetailGarageService(
                            params.id,
                        )) as any;
                        let garageServiceConfigTemplate = {
                            ...this.garageServiceConfigTemplate,
                        } as any;
                        let dynamicComponent = [] as any[];
                        Object.keys(garageServiceConfigTemplate).map(
                            (a: any) => {
                                if (garageServiceConfigTemplate[a].props) {
                                    garageServiceConfigTemplate[a].instanceKey =
                                        Date.now() +
                                        garageServiceConfigTemplate[a].field;
                                }
                                if (garageServiceConfigTemplate[a].setup) {
                                    garageServiceConfigTemplate[a].setup(
                                        garageServiceConfigTemplate[a]
                                            .instanceKey,
                                    );
                                }
                                if (data.hasOwnProperty(a)) {
                                    garageServiceConfigTemplate[
                                        a
                                    ].props.modelValue = data[a];
                                    if (
                                        garageServiceConfigTemplate[a].type ==
                                        "CDMultiselect"
                                    ) {
                                        garageServiceConfigTemplate[
                                            a
                                        ].props.modelValue = data[a].map(
                                            (f) => f.id,
                                        );
                                    }
                                }
                                garageServiceConfigTemplate[a].props.disabled =
                                    true;
                                dynamicComponent.push(
                                    garageServiceConfigTemplate[a],
                                );
                            },
                        );
                        self.dialogConfig = {
                            show: true,
                            title: self.$t(
                                "module.garageService.garageService.dialog.detail",
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
                        "module.garageService.garageService.contextActions.update",
                    ),
                    action: async (params: any) => {
                        let data = (await store.getDetailGarageService(
                            params.id,
                        )) as any;
                        let garageServiceConfigTemplate = {
                            ...this.garageServiceConfigTemplate,
                        } as any;
                        let dynamicComponent = [] as any[];
                        Object.keys(garageServiceConfigTemplate).map(
                            (a: any) => {
                                if (garageServiceConfigTemplate[a].props) {
                                    garageServiceConfigTemplate[a].instanceKey =
                                        Date.now() +
                                        garageServiceConfigTemplate[a].field;
                                }
                                if (garageServiceConfigTemplate[a].setup) {
                                    garageServiceConfigTemplate[a].setup(
                                        garageServiceConfigTemplate[a]
                                            .instanceKey,
                                    );
                                }
                                if (data.hasOwnProperty(a)) {
                                    garageServiceConfigTemplate[
                                        a
                                    ].props.modelValue = data[a];
                                    if (
                                        garageServiceConfigTemplate[a].type ==
                                        "CDMultiselect"
                                    ) {
                                        garageServiceConfigTemplate[
                                            a
                                        ].props.modelValue = data[a].map(
                                            (f) => f.id,
                                        );
                                    }
                                }
                                garageServiceConfigTemplate[a].props.disabled =
                                    false;
                                dynamicComponent.push(
                                    garageServiceConfigTemplate[a],
                                );
                            },
                        );
                        self.dialogConfig = {
                            show: true,
                            title: self.$t(
                                "module.garageService.garageService.dialog.update",
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
                                        "module.garageService.garageService.dialog.update",
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
                                                    if (
                                                        a.type ==
                                                        "CDMultiselect"
                                                    ) {
                                                        data[a.field] =
                                                            a.props.modelValue.map(
                                                                (b) => {
                                                                    return {
                                                                        id: b,
                                                                    };
                                                                },
                                                            );
                                                    }
                                                }
                                            },
                                        );

                                        let res =
                                            (await store.updateGarageService(
                                                data,
                                                params.id,
                                            )) as any;
                                        if (res.code == 1) {
                                            self.$toast(
                                                self.$t(
                                                    "module.garageService.garageService.toast.updateGarageServiceSuccess",
                                                ),
                                                true,
                                            );
                                            self.getDataForTable();
                                        } else {
                                            self.$toast(
                                                self.$t(
                                                    "module.garageService.garageService.toast.updateGarageServiceFailse",
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
