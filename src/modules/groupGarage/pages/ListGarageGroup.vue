<template>
    <div>
        <CDTable
            ref="table"
            v-if="rowData.length > 0"
            :tableName="$t('module.groupGarage.groupGarage.tableName')"
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
            :width="`${
                dialogConfig.dynamicComponent &&
                dialogConfig.dynamicComponent.length > 0
                    ? 'w-1/2'
                    : 'w-96'
            }`"
        >
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
import { groupGarage } from "../store/index";
const store = groupGarage();
const displayCol = [
    "code",
    "taxCode",
    "name",
    "garageOwnerName",
    "website",
    "status",
];
// import { garageDataConfigDetail, garageConfigEdit } from "../data/index";
export default defineComponent({
    async created() {
        this.getDataForTable();
    },
    methods: {
        changePage(val: any) {
            this.pagination.currentPage = val.currentPage;
            this.getDataForTable();
        },
        async getDataForTable() {
            let self = this;
            this.rowData = [];
            let res = await store.getAllGroupGarage({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
            });
            console.log(res);

            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.groupGarage.groupGarage.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.groupGarage.groupGarage.columnTable." + a,
                    ),
                };
            });
            this.columns.push({
                field: "action",
                headerName: self.$t(
                    "module.groupGarage.groupGarage.columnTable.action",
                ),
            });
            this.pagination.total = res.totalElement;
        },
    },
    data() {
        let self = this as any;
        return {
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
                action: () => {
                    self.dialogConfig.show = true;
                },
                name: this.$t("module.groupGarage.groupGarage.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.groupGarage.groupGarage.contextActions.delete",
                    ),
                    action: (params: any) => {
                        self.dialogConfig = {
                            show: true,
                            title: self.$t(
                                "module.groupGarage.groupGarage.dialog.deleteGarageTitle",
                            ),
                            content: self.$t(
                                "module.groupGarage.groupGarage.dialog.deleteGarageContent",
                            ),
                            actions: [
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.deleteConfirm",
                                    ),
                                    action: () => {
                                        let res = store.deleteGarage(params.id);
                                        console.log(res);
                                        self.dialogConfig = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.cancel",
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
                        "module.groupGarage.groupGarage.contextActions.accept",
                    ),
                    action: async (params: any) => {
                        let res = await store.acceptGarage([params.id]);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.groupGarage.groupGarage.toast.acceptSuccess",
                                ),
                                true,
                            );
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.groupGarage.groupGarage.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.groupGarage.groupGarage.contextActions.reject",
                    ),
                    action: async (params: any) => {
                        let res = await store.rejectGarage([params.id]);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.groupGarage.groupGarage.toast.rejectSuccess",
                                ),
                                true,
                            );
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.groupGarage.groupGarage.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
            ],
        };
    },
});
</script>
