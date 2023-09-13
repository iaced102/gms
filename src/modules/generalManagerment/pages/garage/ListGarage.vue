<template>
    <div>
        <CDTable
            ref="table"
            v-if="rowData.length > 0"
            :tableName="$t('module.generalManagerment.garage.tableName')"
            :actions="tableActions"
            :rowData="rowData"
            :columns="columns"
            :multipleRowActions="true"
            :forStatus="true"
            :forActions="true"
            positionDropdownClass="right-[40px] bottom-[-65px]"
            :contextActions="contextActions"
            :pagination="pagination"
            @changePage="changePage"
        />
        <CDDialog
            v-if="dialogConfig.show"
            :title="dialogConfig.title"
            :content="dialogConfig.content"
            @closeDialog="
                () => {
                    dialogConfig.show = false;
                }
            "
        >
            <template
                v-if="
                    dialogConfig.dynamicComponent &&
                    dialogConfig.dynamicComponent.length > 0
                "
                #content
            >
                <div v-if="dialogConfig.dynamicComponent[0].props.modelValue">
                    <h1>
                        {{
                            $t(
                                "module.generalManagerment.garage.dialog.parentInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        :configs="
                            dialogConfig.dynamicComponent.filter(
                                (a) =>
                                    a.group == 'parentInfor' && a.showForDetail,
                            )
                        "
                    />
                </div>

                <div class="mt-7">
                    <h1>
                        {{
                            $t(
                                "module.generalManagerment.garage.dialog.garaInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        :configs="
                            dialogConfig.dynamicComponent.filter(
                                (a) =>
                                    a.group == 'garageInfor' && a.showForDetail,
                            )
                        "
                    />
                </div>
            </template>
            <template #action class="mt-4 flex justify-around">
                <div class="mt-4 flex justify-around">
                    <button
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
import { generalManagermentStore } from "../../store/index";
const store = generalManagermentStore();
const displayCol = [
    "code",
    "name",
    "address",
    "contactPointPhone",
    "isReceiveWebsite",
    "status",
];
import { garageDataConfigDetail } from "../../data/index";
export default defineComponent({
    async created() {
        console.log(store, "store");
        this.getDataForTable();
    },
    methods: {
        changePage(val: any) {
            console.log(val);
            this.pagination.currentPage = val.currentPage;
            this.getDataForTable();
        },
        async getDataForTable() {
            let self = this;
            this.rowData = [];
            let res = await store.getAllGarage({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
            });
            console.log(res);
            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.generalManagerment.garage.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.generalManagerment.garage.columnTable." + a,
                    ),
                };
            });
            this.columns.push({
                field: "action",
                headerName: self.$t(
                    "module.generalManagerment.garage.columnTable.action",
                ),
            });
            this.pagination.total = res.totalElement;
        },
    },
    data() {
        let self = this as any;
        return {
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
                action: () => {
                    console.log(this);
                },
                name: this.$t("module.generalManagerment.garage.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.update",
                    ),
                    action: (params: any) => {
                        let garageDataConfigDetailClone =
                            garageDataConfigDetail as any;
                        Object.keys(params).map((a: string) => {
                            if (garageDataConfigDetailClone.hasOwnProperty(a)) {
                                console.log(a, params[a]);
                                garageDataConfigDetailClone[
                                    a
                                ].props.modelValue = params[a] ? params[a] : "";
                                if (a == "status") {
                                    garageDataConfigDetailClone.status.props.modelValue =
                                        params.status.content;
                                }
                                garageDataConfigDetailClone[a].props.disabled =
                                    false;
                                garageDataConfigDetailClone[a].props.readonly =
                                    false;
                            }
                        });
                        let dynamicComponent = [] as any[];
                        Object.keys(garageDataConfigDetailClone).map((a) => {
                            dynamicComponent.push(
                                garageDataConfigDetailClone[a],
                            );
                        });
                        self.dialogConfig = {
                            show: true,
                            title:
                                self.$t(
                                    "module.generalManagerment.garage.dialog.detailGarageTitle",
                                ) +
                                " " +
                                params.name,

                            dynamicComponent: dynamicComponent,
                            actions: [
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.save",
                                    ),
                                    action: async (params: any) => {
                                        console.log(
                                            self.dialogConfig.dynamicComponent,
                                        );
                                        //save when edit garage, nhưng mà đang chưa biết cho phép những gì, cái này fake tính năng
                                        let config = {} as any;
                                        self.dialogConfig.dynamicComponent.map(
                                            (a: any) => {
                                                config[a.field] =
                                                    a.props.modelValue;
                                            },
                                        );
                                        let res = await store.updateGarage(
                                            config,
                                            config.id,
                                        );
                                        // self.dialogConfig = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig.show = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.deleteConfirm",
                                    ),
                                    action: () => {
                                        self.dialogConfig = {
                                            show: true,
                                            title:
                                                self.$t(
                                                    "module.generalManagerment.garage.dialog.detailGarageTitle",
                                                ) +
                                                " " +
                                                params.name,

                                            dynamicComponent: dynamicComponent,
                                            actions: [
                                                {
                                                    class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                                    name: self.$t(
                                                        "module.generalManagerment.garage.dialog.deleteConfirm",
                                                    ),
                                                    action: () => {
                                                        self.dialogConfig =
                                                            false;
                                                    },
                                                },
                                                {
                                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                                    name: self.$t(
                                                        "module.generalManagerment.garage.dialog.cancel",
                                                    ),
                                                    action: () => {
                                                        self.dialogConfig =
                                                            false;
                                                    },
                                                },
                                            ],
                                        };
                                    },
                                },
                            ],
                        };
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.detail",
                    ),
                    action: (params: any) => {
                        let garageDataConfigDetailClone =
                            garageDataConfigDetail as any;
                        Object.keys(params).map((a: string) => {
                            if (garageDataConfigDetailClone.hasOwnProperty(a)) {
                                console.log(a, params[a]);
                                garageDataConfigDetailClone[
                                    a
                                ].props.modelValue = params[a] ? params[a] : "";
                                if (a == "status") {
                                    garageDataConfigDetailClone.status.props.modelValue =
                                        params.status.content;
                                }
                                garageDataConfigDetailClone[a].props.disabled =
                                    true;
                                garageDataConfigDetailClone[a].props.readonly =
                                    true;
                            }
                        });
                        let dynamicComponent = [] as any[];
                        Object.keys(garageDataConfigDetailClone).map((a) => {
                            dynamicComponent.push(
                                garageDataConfigDetailClone[a],
                            );
                        });
                        self.dialogConfig = {
                            show: true,
                            title:
                                self.$t(
                                    "module.generalManagerment.garage.dialog.detailGarageTitle",
                                ) +
                                " " +
                                params.name,
                            dynamicComponent: dynamicComponent,
                        };
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.delete",
                    ),
                    action: (params: any) => {
                        self.dialogConfig = {
                            show: true,
                            title: self.$t(
                                "module.generalManagerment.garage.dialog.deleteGarageTitle",
                            ),
                            content: self.$t(
                                "module.generalManagerment.garage.dialog.deleteGarageContent",
                            ),
                            actions: [
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.deleteConfirm",
                                    ),
                                    action: () => {
                                        self.dialogConfig = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.generalManagerment.garage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig = false;
                                    },
                                },
                            ],
                        };
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.accept",
                    ),
                    action: async (params: any) => {
                        let res = await store.acceptGarage([params.id]);
                        console.log(res);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.acceptSuccess",
                                ),
                                true,
                            );
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                        console.log(params);
                        console.log("click action1");
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.reject",
                    ),
                    action: async (params: any) => {
                        let res = await store.rejectGarage([params.id]);
                        console.log(res);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.rejectSuccess",
                                ),
                                true,
                            );
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                        console.log(params);
                        console.log("click action1");
                    },
                },
            ],
        };
    },
});
</script>
