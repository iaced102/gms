<template>
    <div>
        <CDTable
            ref="table"
            v-if="rowData.length > 0"
            :tableName="$t('module.garageOwner.garageOwner.tableName')"
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
                <div class="mt-2">
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
import { garageOwnerStore } from "../store/index";
const store = garageOwnerStore();
const displayCol = [
    "name",
    "userName",
    "phone",
    "email",
    "gender",
    "birthday",
    "status",
];
import _cloneDeep from "lodash/cloneDeep";
import { garageOwnerDataConfigCreate } from "../data/index";
import { generalManagermentStore } from "@/modules/generalManagerment/store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);
const garageStore = generalManagermentStore();
const cloneGarageOwnerConfigCreate = _cloneDeep(garageOwnerDataConfigCreate);
export default defineComponent({
    async created() {
        this.getDataForTable();
        this.garageOwnerDataConfigCreate.garages.setup = (
            instanceKey: string,
        ) => {
            this.getListGarage("", instanceKey);
        };
        this.garageOwnerDataConfigCreate.garages.onSearch = (
            instanceKey: string,
            val: string,
        ) => {
            this.getListGarage(val, instanceKey);
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
                    pageSize: 10000,
                    pageNumber: 1,
                });
                let field = this.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = res.data.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
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
            let res = await store.getAllGarageOwner({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
            });
            console.log(res);

            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.garageOwner.garageOwner.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.garageOwner.garageOwner.columnTable." + a,
                    ),
                };
            });
            this.pagination.total = res.totalElement;
        },
    },
    data() {
        let self = this as any;
        return {
            garageOwnerDataConfigCreate: cloneGarageOwnerConfigCreate as any,
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
                    let garageOwnerDataConfigCreateClone = {
                        ...this.garageOwnerDataConfigCreate,
                    } as any;
                    let dynamicComponent = [] as any[];
                    Object.keys(garageOwnerDataConfigCreateClone).map(
                        (a: any) => {
                            if (garageOwnerDataConfigCreateClone[a].props) {
                                garageOwnerDataConfigCreateClone[
                                    a
                                ].instanceKey =
                                    Date.now() +
                                    garageOwnerDataConfigCreateClone[a].field;
                            }
                            if (garageOwnerDataConfigCreateClone[a].setup) {
                                garageOwnerDataConfigCreateClone[a].setup(
                                    garageOwnerDataConfigCreateClone[a]
                                        .instanceKey,
                                );
                            }
                            if (
                                garageOwnerDataConfigCreateClone[a].type ==
                                "CDMultiselect"
                            ) {
                                garageOwnerDataConfigCreateClone[
                                    a
                                ].props.modelValue = [];
                            }

                            dynamicComponent.push(
                                garageOwnerDataConfigCreateClone[a],
                            );
                        },
                    );
                    self.dialogConfig = {
                        show: true,
                        title: self.$t(
                            "module.garageOwner.garageOwner.dialog.createGarageOwner",
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
                                    "module.garageOwner.garageOwner.dialog.create",
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
                                    data.birthday = data.birthday;
                                    data.garages = data.garages.map(
                                        (a: any) => {
                                            return {
                                                id: a,
                                            };
                                        },
                                    );
                                    let res = await store.createGarageOwner(
                                        data,
                                    );
                                    if (res.code == 1) {
                                        self.$toast(
                                            self.$t(
                                                "module.garageOwner.garageOwner.toast.createGarageOwnerSuccess",
                                            ),
                                            true,
                                        );
                                        self.getDataForTable();
                                    } else {
                                        self.$toast(
                                            self.$t(
                                                "module.garageOwner.garageOwner.toast.createGarageOwnerFailse",
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
                name: this.$t("module.garageOwner.garageOwner.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [],
        };
    },
});
</script>
