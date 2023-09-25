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
                <div class="mt-7">
                    <h1 class="text-lg ml-2 mt-4">
                        {{
                            $t(
                                "module.contracts.contracts.dialog.contractInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3 py-6 border-b"
                        commonClass="flex align-center"
                        :modelValue="dialogConfig.dynamicComponent"
                        @updateValue="({val, instanceKey}:any)=>updateValueDynamicComponent({val,instanceKey})"
                        @onSearch="onSearch"
                    />
                </div>
            </template>
            <template #action>
                <div class="mt-4 flex justify-end">
                    <button
                        v-for="a in dialogConfig.actions"
                        class="mr-2"
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
import _cloneDeep from "lodash/cloneDeep";
import { contractDataConfigCreate } from "../data/index";
import { generalManagermentStore } from "@/modules/generalManagerment/store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);
const garageStore = generalManagermentStore();
const cloneContractConfigCreate = _cloneDeep(contractDataConfigCreate);
export default defineComponent({
    async created() {
        this.getDataForTable();
        this.contractDataConfigCreate.garageId.setup = (
            instanceKey: string,
        ) => {
            this.getListGarage("", instanceKey);
        };
        this.contractDataConfigCreate.garageId.onSearch = (
            instanceKey: string,
            val: string,
        ) => {
            this.getListGarage(val, instanceKey);
        };
        this.contractDataConfigCreate.contractFromDate.onUpdate = (
            val: string,
            instanceKey: string,
        ) => {
            let date = dayjs(val, "DD/MM/YYYY").toDate();
            const contractToDate = this.dialogConfig.dynamicComponent.find(
                (field) => {
                    if (field.field == "contractToDate") {
                        return true;
                    }
                },
            );
            contractToDate.props.min = date;
        };
        this.contractDataConfigCreate.contractToDate.onUpdate = (
            val: string,
            instanceKey: string,
        ) => {
            let date = dayjs(val, "DD/MM/YYYY").toDate();
            const contractFromDate = this.dialogConfig.dynamicComponent.find(
                (field) => {
                    if (field.field == "contractFromDate") {
                        return true;
                    }
                },
            );
            contractFromDate.props.max = date;
        };
    },
    methods: {
        updateValueDynamicComponent({ val, instanceKey }: any) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            console.log(val, instanceKey);
            if (field.onUpdate) {
                field.onUpdate(val, instanceKey);
            }
        },
        async getListGarage(val: string, instanceKey: any) {
            if (val == "") {
                let res = await garageStore.getAllGarage({
                    pageSize: 10,
                    pageNumber: 1,
                });
                let field = this.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
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
                let field = this.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = res.data.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.id,
                        text: a.name,
                    };
                });
            }
        },
        onSearch(instanceKey: string, val: string) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            console.log(instanceKey, val);
            clearTimeout(this.timeOut[field.instanceKey]);
            this.timeOut[field.instanceKey] = () => {
                setTimeout(() => {
                    console.log("on timeout");
                    field.onSearch(instanceKey, val);
                }, 1000);
            };
            this.timeOut[field.instanceKey]();
        },
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
            contractDataConfigCreate: cloneContractConfigCreate as any,
            originData: {} as any,
            timeOut: {} as any,
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
                        ...this.contractDataConfigCreate,
                    } as any;
                    let dynamicComponent = [] as any[];
                    Object.keys(garageDataConfigCreateClone).map((a: any) => {
                        if (garageDataConfigCreateClone[a].props) {
                            garageDataConfigCreateClone[a].instanceKey =
                                Date.now() +
                                garageDataConfigCreateClone[a].field;
                        }
                        if (garageDataConfigCreateClone[a].setup) {
                            garageDataConfigCreateClone[a].setup(
                                garageDataConfigCreateClone[a].instanceKey,
                            );
                        }
                        garageDataConfigCreateClone[a].props.modelValue = "";
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
                                    "module.contracts.contracts.dialog.create",
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
                                    console.log(data);
                                    data.contractFromDate =
                                        store.convertDateFormat(
                                            data.contractFromDate,
                                        );
                                    data.contractToDate =
                                        store.convertDateFormat(
                                            data.contractToDate,
                                        );
                                    console.log(data);

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
                    // self.calculateAdressOption();
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
