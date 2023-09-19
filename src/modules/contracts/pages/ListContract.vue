<template>
    <div>
        <CDTable
            ref="table"
            v-if="rowData.length > 0"
            :tableName="$t('module.contracts.contracts.tableName')"
            :rowData="rowData"
            :columns="columns"
            :actions="tableActions"
            :forStatus="true"
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
            <template
                v-if="
                    dialogConfig.dynamicComponent &&
                    dialogConfig.dynamicComponent.length > 0
                "
                #content
            >
                <div class="mt-7">
                    <h1>
                        {{
                            $t(
                                "module.contracts.contracts.dialog.contractInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3"
                        :modelValue="dialogConfig.dynamicComponent"
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
import { contractStore } from "../store/index";
const store = contractStore();
const displayCol = [
    "contractNumber",
    "garageId",
    "garageName",
    "contractFromDate",
    "contractToDate",

    "status",
];
import { garageDataConfigCreate } from "../data/index";
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
            let res = await store.getAllContract({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
            });
            console.log(res);

            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.contracts.contracts.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.contracts.contracts.columnTable." + a,
                    ),
                };
            });
            // this.columns.push({
            //     field: "action",
            //     headerName: self.$t(
            //         "module.contracts.contracts.columnTable.action",
            //     ),
            // });
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
                    let garageDataConfigCreateClone = {
                        ...garageDataConfigCreate,
                    } as any;
                    let dynamicComponent = [] as any[];
                    Object.keys(garageDataConfigCreateClone).map((a: any) => {
                        garageDataConfigCreateClone[a].props.modelValue = "";
                        // if (
                        //     garageDataConfigCreateClone[a].group ==
                        //         "parentInfo" &&
                        //     garageDataConfigCreateClone[a].field !=
                        //         "parentGarageId"
                        // ) {
                        //     garageDataConfigCreateClone[a].props.disabled =
                        //         true;
                        // } else {
                        //     if (
                        //         garageDataConfigCreateClone[a].group ==
                        //         "garageInfor"
                        //     ) {
                        //         garageDataConfigCreateClone[a].props.disabled =
                        //             false;
                        //     }
                        // }
                        dynamicComponent.push(garageDataConfigCreateClone[a]);
                    });
                    self.dialogConfig = {
                        show: true,
                        title: self.$t(
                            "module.contracts.contracts.dialog.createContract",
                        ),
                        dynamicComponent: dynamicComponent,
                        actions: [
                            {
                                class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                name: self.$t(
                                    "module.contracts.contracts.dialog.createContract",
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

                                    let res = await store.createContract(data);
                                    if (res.code == 1) {
                                        self.$toast(
                                            self.$t(
                                                "module.contracts.contracts.toast.createContractSuccess",
                                            ),
                                            true,
                                        );
                                        self.getDataForTable();
                                    } else {
                                        self.$toast(
                                            self.$t(
                                                "module.contracts.contracts.toast.createContractFailse",
                                            ),
                                            false,
                                        );
                                    }
                                    self.dialogConfig.show = false;
                                },
                            },
                        ],
                    };
                    self.calculateAdressOption();
                },
                name: this.$t("module.contracts.contracts.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [],
        };
    },
});
</script>
