<template>
    <div>
        <CDTable
            ref="table"
            :tableName="$t('module.generalManagerment.garage.tableName')"
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
                    <h1 class="text-lg ml-2 mt-4">
                        <!-- <i class="fa-solid fa-link text-gray-500"></i> -->
                        {{
                            $t(
                                "module.generalManagerment.garage.dialog.parentInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3 py-6 border-b"
                        commonClass="flex items-center align-center"
                        @onSearch="onSearch"
                        @updateValue="({val, instanceKey}:any)=>updateValueDynamicComponent({val,instanceKey})"
                        :modelValue="
                            dialogConfig.dynamicComponent.filter(
                                (a) => a.group == 'parentInfor',
                            )
                        "
                    />
                </div>

                <div class="mt-7">
                    <h1 class="text-lg ml-2 mt-4">
                        {{
                            $t(
                                "module.generalManagerment.garage.dialog.garaInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3 py-6 border-b"
                        commonClass="flex align-center"
                        @uploadFile="onUploadFile"
                        @onSearch="onSearch"
                        :modelValue="
                            dialogConfig.dynamicComponent.filter(
                                (a) =>
                                    a.group == 'garageInfor' && a.showForDetail,
                            )
                        "
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
import { generalManagermentStore } from "../../store/index";
import _cloneDeep from "lodash/cloneDeep";
import { groupGarageStore } from "@/modules/groupGarage/store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);
const store = generalManagermentStore();
const groupGarageStoreInstance = groupGarageStore();
const displayCol = [
    "code",
    "name",
    "address",
    "contactPointPhone",
    "contactPointName",
    "status",
];

import { garageConfigCreate } from "../../data/index";
const cloneGarageConfigCreate = _cloneDeep(garageConfigCreate) as any;
const baseCloneGarageConfigCreate = _cloneDeep(garageConfigCreate) as any;
export default defineComponent({
    async created() {
        store.getListSubSystem();
        store.getAllRescues();
        store.getAllInsurance();
        this.getDataForTable();
        let self = this;
        this.garageConfigCreate.parentGarageId.setup = (
            instanceKey: string,
        ) => {
            setTimeout(() => {
                self.getGroupGarage("", instanceKey);
            }, 100);
        };
        this.garageConfigCreate.parentGarageId.onSearch = (
            instanceKey: string,
            val: string,
        ) => {
            self.getGroupGarage(val, instanceKey);
        };
        this.garageConfigCreate.parentGarageId.onUpdate = (
            val: string,
            instanceKey: string,
        ) => {
            self.onUpdateParentGarageId(val, instanceKey);
        };
        this.garageConfigCreate.insurances.setup = (instanceKey: string) => {
            debugger;
            setTimeout(() => {
                let options = store.listInsurance.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
                    };
                });
                let field = self.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = options;
            }, 200);
        };
        this.garageConfigCreate.carSubSystems.setup = (instanceKey: string) => {
            debugger;
            setTimeout(() => {
                let options = store.listSubSystem.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
                    };
                });
                let field = self.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = options;
            }, 200);
        };
        this.garageConfigCreate.rescues.setup = (instanceKey: string) => {
            debugger;
            setTimeout(() => {
                let options = store.listRescues.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
                    };
                });
                let field = self.dialogConfig.dynamicComponent.find(
                    (a: any) => a.instanceKey == instanceKey,
                );
                field.props.options = options;
            }, 200);
        };
    },
    methods: {
        closeDialog() {
            this.dialogConfig.show = false;
            // this.dialogConfig.dynamicComponent.map((a) => {
            //     if (a.props) {
            //         a.props.modelValue =
            //             cloneGarageConfigCreate[a.field].props.modelValue;
            //     }
            // });
        },
        async onUpdateParentGarageId(val: any, instanceKey: string) {
            // let field = this.dialogConfig.dynamicComponent.find((a:any)=>a.instanceKey==instanceKey)
            let res = await groupGarageStoreInstance.getGarageInforById(val);
            this.dialogConfig.dynamicComponent.map((a: any) => {
                if (
                    a.group == "parentInfor" &&
                    res.data.hasOwnProperty(a.field)
                ) {
                    a.props.modelValue = res.data[a.field];
                }
            });
        },
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
        async getGroupGarage(val: string, instanceKey: any) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            if (
                field &&
                field.props.options.length == 0 &&
                field.props.options.modelValue != ""
            ) {
                let res = await groupGarageStoreInstance.getAllGarage({
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
                let res = await groupGarageStoreInstance.getAllGarage({
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
                let res = await groupGarageStoreInstance.getAllGarage({
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
        async onUploadFile(instanceKey: string, val: any) {
            const f = val.target.files[0];
            if (f) {
                const reader = new FileReader();
                reader.onload = function (evt: any) {
                    const contents = evt.target.result;
                };
                reader.readAsDataURL(f);
                // args.fileList.push(f.name);
                let config = this.dialogConfig.dynamicComponent.find((a) => {
                    // if (a.props) {
                    return a.instanceKey == instanceKey;
                    // }
                });
                // let res = await store.getPresignUrl([f.name], "OTHER");
                // console.log(res);
                config.props.fileList.push(f.name);
            }
        },
        filter(config: any) {
            //console.log(config);
            this.pagination.currentPage = 1;
            this.getDataForTable(config);
        },
        updateValueDynamicComponent({ val, instanceKey }: any) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            if (field.onUpdate) {
                field.onUpdate(val, instanceKey);
            }
        },
        async calculateAdressOption() {
            let res: any = await store.getAddressInfo({
                provinceId: !this.locationConfig.provinceId.value
                    ? 0
                    : this.locationConfig.provinceId.value,
                districtId: !this.locationConfig.districtId.value
                    ? 0
                    : this.locationConfig.districtId.value,
            });
            if (this.locationConfig.provinceId.value == "") {
                this.locationConfig.provinceId.options = res.province.map(
                    (a: any) => {
                        return {
                            id: a.id,
                            value: a.name,
                        };
                    },
                );
            } else {
                if (res.province) {
                    this.locationConfig.provinceId.options = res.province.map(
                        (a: any) => {
                            return {
                                id: a.id,
                                value: a.name,
                            };
                        },
                    );
                }
                this.locationConfig.districtId.options = res.district.map(
                    (a: any) => {
                        return {
                            id: a.id,
                            value: a.name,
                        };
                    },
                );
                this.locationConfig.wardId.options = res.ward.map((a: any) => {
                    return {
                        id: a.id,
                        value: a.name,
                    };
                });
            }
            let self = this;
            this.dialogConfig.dynamicComponent.map((a: any) => {
                if (a.field == "provinceId") {
                    a.props.options = self.locationConfig.provinceId.options;
                }
                if (a.field == "districtId") {
                    a.props.options = self.locationConfig.districtId.options;
                }
                if (a.field == "wardId") {
                    a.props.options = self.locationConfig.wardId.options;
                }
            });
        },
        async getParrentGarageInfor(id: string) {
            let originData = await groupGarageStoreInstance.getGarageInforById(
                id,
            );
            return originData.data;
        },
        changePage(val: any) {
            this.pagination.currentPage = val.currentPage;
            this.getDataForTable();
        },
        async getDataForTable(config: any = {}) {
            let self = this;
            this.rowData = [];
            let res = await store.getAllGarage({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
                ...config,
            });

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
    watch: {
        "dialogConfig.show"(newVal) {
            if (!newVal) {
                this.dialogConfig.dynamicComponent.map((a) => {
                    if (a.props) {
                        a.props.modelValue =
                            baseCloneGarageConfigCreate[
                                a.field
                            ].props.modelValue;
                    }
                });
            }
        },
        "dialogConfig.dynamicComponent": {
            deep: true,
            handler(newVal: any, old: any) {
                if (newVal && newVal.length) {
                    let newProvinceId = newVal.find(
                        (a: any) => a.field == "provinceId",
                    );
                    let oldProvinceId = this.locationConfig.provinceId.value;
                    if (
                        newProvinceId &&
                        newProvinceId.props.modelValue &&
                        newProvinceId.props.modelValue != oldProvinceId
                    ) {
                        this.locationConfig.provinceId.value =
                            newProvinceId.props.modelValue;
                        this.calculateAdressOption();
                    }
                    let newDistrcitId = newVal.find(
                        (a: any) => a.field == "districtId",
                    );
                    let oldDistrcitId = this.locationConfig.districtId.value;
                    if (
                        newDistrcitId &&
                        newDistrcitId.props.modelValue &&
                        newDistrcitId.props.modelValue != oldDistrcitId
                    ) {
                        this.locationConfig.districtId.value =
                            newDistrcitId.props.modelValue;
                        this.calculateAdressOption();
                    }
                }
            },
        },
    },
    data() {
        let self = this as any;
        return {
            timeOut: {} as any,
            garageConfigCreate: cloneGarageConfigCreate as any,
            filterColumns: [
                {
                    label: self.$t(
                        "module.generalManagerment.garage.filterColumn.parentGarageId",
                    ),
                    value: "parentGarageId",
                },
                {
                    label: self.$t(
                        "module.generalManagerment.garage.filterColumn.name",
                    ),
                    value: "name",
                },
                {
                    label: self.$t(
                        "module.generalManagerment.garage.filterColumn.status",
                    ),
                    value: "status",
                    type: "CDSelect",
                    options: [
                        {
                            id: 1,
                            value: self.$t(
                                "module.generalManagerment.garage.status.1",
                            ),
                        },
                        {
                            id: 2,
                            value: self.$t(
                                "module.generalManagerment.garage.status.2",
                            ),
                        },
                        {
                            id: 3,
                            value: self.$t(
                                "module.generalManagerment.garage.status.3",
                            ),
                        },
                    ],
                },
            ],
            multipleRowActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.multipleRowActions.accept",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = await store.acceptGarage(ids);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.multipleRowActions.reject",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = await store.rejectGarage(ids);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
            ],
            locationConfig: {
                provinceId: {
                    value: "",
                    options: [],
                },
                districtId: {
                    value: "",
                    options: [],
                },
                wardId: {
                    value: "",
                    options: [],
                },
            } as any,
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
                    let garageDataConfigCreateClone = {
                        ..._cloneDeep(self.garageConfigCreate),
                    } as any;
                    let dynamicComponent = [] as any[];
                    Object.keys(garageDataConfigCreateClone).map(async (a) => {
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
                        if (garageDataConfigCreateClone[a].props) {
                            garageDataConfigCreateClone[a].props.disabled =
                                false;
                        }
                        if (
                            garageDataConfigCreateClone[a].group ==
                                "parentInfor" &&
                            garageDataConfigCreateClone[a].field !=
                                "parentGarageId"
                        ) {
                            if (garageDataConfigCreateClone[a].props) {
                                garageDataConfigCreateClone[a].props.disabled =
                                    true;
                            }
                        } else {
                            if (
                                garageDataConfigCreateClone[a].group ==
                                "garageInfor"
                            ) {
                                if (garageDataConfigCreateClone[a].props) {
                                    garageDataConfigCreateClone[
                                        a
                                    ].props.disabled = false;
                                }
                            }
                        }
                        dynamicComponent.push(garageDataConfigCreateClone[a]);
                    });
                    self.dialogConfig = {
                        show: true,
                        title: self.$t(
                            "module.generalManagerment.garage.dialog.createGarage",
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
                                    "module.generalManagerment.garage.dialog.create",
                                ),
                                action: async () => {
                                    let isValidate = true;
                                    self.dialogConfig.dynamicComponent.map(
                                        (a: any) => {
                                            if (a.validator) {
                                                let error = a.validator(
                                                    a.props.modelValue,
                                                );
                                                if (error) {
                                                    self.$toast(error, false);
                                                    a.props.isValidate = false;
                                                    isValidate = false;
                                                } else {
                                                    a.props.isValidate = true;
                                                }
                                            }
                                        },
                                    );
                                    if (!isValidate) {
                                        return;
                                    }
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
                                                            (a: any) => {
                                                                return {
                                                                    id: a,
                                                                };
                                                            },
                                                        );
                                                }
                                            }
                                        },
                                    );
                                    console.log(data);
                                    if (data.contractDate) {
                                        // data.contractDate = dayjs(
                                        //     data.contractDate,
                                        //     "YYYY/MM/DD",
                                        // )
                                        //     .toDate()
                                        //     .toISOString();
                                        data.contractDate = data.contractDate
                                            .split("/")
                                            .reverse()
                                            .join("-");
                                    } else {
                                        data.contractDate = "";
                                    }
                                    console.log(data);
                                    let res = await store.createGarage(data);
                                    if (res.code == 1) {
                                        self.$toast(
                                            self.$t(
                                                "module.generalManagerment.garage.toast.createGarageSuccess",
                                            ),
                                            true,
                                        );
                                        self.getDataForTable();
                                    } else {
                                        self.$toast(
                                            self.$t(
                                                "module.generalManagerment.garage.toast.createGarageFailse",
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
                    action: async (params: any) => {
                        // let garageDataConfigEditClone = this
                        //     .garageConfigCreate as any;
                        let garageDataConfigEditClone = {
                            ..._cloneDeep(self.garageConfigCreate),
                        } as any;
                        let originData = await store.getGarageInforById(
                            params.id,
                        );
                        if (originData.error) {
                            self.$toast("Lấy thông tin garage thất bại", false);
                            return;
                        }
                        self.originData = originData.data;
                        self.originData.id = params.id;
                        let parentInfor: any;
                        if (originData.data.parentGarageId) {
                            parentInfor = await self.getParrentGarageInfor(
                                originData.data.parentGarageId,
                            );
                            if (parentInfor != null) {
                                Object.keys(parentInfor).map((a) => {
                                    if (
                                        garageDataConfigEditClone.hasOwnProperty(
                                            a,
                                        ) &&
                                        garageDataConfigEditClone[a].props
                                    ) {
                                        if (
                                            garageDataConfigEditClone[
                                                a
                                            ].hasOwnProperty(
                                                "formatterModelValue",
                                            )
                                        ) {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = garageDataConfigEditClone[
                                                a
                                            ].formatterModelValue(
                                                parentInfor[a],
                                            );
                                        } else {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = parentInfor[a];
                                        }
                                    }
                                });
                            }
                        }
                        Object.keys(originData.data).map((a: string) => {
                            if (!garageDataConfigEditClone.hasOwnProperty(a)) {
                            } else {
                                console.log(garageDataConfigEditClone[a].type);
                                if (garageDataConfigEditClone[a].static) {
                                    garageDataConfigEditClone[a].value =
                                        originData.data[a];
                                } else {
                                    garageDataConfigEditClone[
                                        a
                                    ].props.modelValue = originData.data[a]
                                        ? originData.data[a]
                                        : "";
                                    if (
                                        garageDataConfigEditClone[a].type ==
                                        "CDSelect"
                                    ) {
                                        if (originData.data[a] == null) {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = "";
                                        } else {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue =
                                                originData.data[a];
                                        }
                                    }
                                    if (
                                        garageDataConfigEditClone[a].type ==
                                        "CDMultiselect"
                                    ) {
                                        if (originData.data[a] == null) {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = [];
                                        } else {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = originData.data[
                                                a
                                            ].map((a: any) => a.id);
                                        }
                                    }
                                }
                            }
                        });
                        let dynamicComponent = [] as any[];
                        Object.keys(garageDataConfigEditClone).map((a) => {
                            if (garageDataConfigEditClone[a].props) {
                                garageDataConfigEditClone[a].instanceKey =
                                    Date.now() +
                                    garageDataConfigEditClone[a].field;
                            }
                            if (garageDataConfigEditClone[a].setup) {
                                garageDataConfigEditClone[a].setup(
                                    garageDataConfigEditClone[a].instanceKey,
                                );
                            }
                            if (garageDataConfigEditClone[a].props) {
                                garageDataConfigEditClone[a].instanceKey =
                                    Date.now() +
                                    garageDataConfigEditClone[a].field;
                            }
                            if (
                                garageDataConfigEditClone[a].group ==
                                "parentInfor"
                                // && garageDataConfigEditClone[a].field !=
                                //     "parentGarageId"
                            ) {
                                if (garageDataConfigEditClone[a].props) {
                                    garageDataConfigEditClone[
                                        a
                                    ].props.disabled = true;
                                }
                            } else {
                                if (
                                    garageDataConfigEditClone[a].group ==
                                    "garageInfor"
                                ) {
                                    if (garageDataConfigEditClone[a].props) {
                                        garageDataConfigEditClone[
                                            a
                                        ].props.disabled = false;
                                    }
                                }
                            }
                            dynamicComponent.push(garageDataConfigEditClone[a]);
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
                                        "module.generalManagerment.garage.dialog.save",
                                    ),
                                    action: async (params: any) => {
                                        //save when edit garage, nhưng mà đang chưa biết cho phép những gì, cái này fake tính năng
                                        let config = {} as any;
                                        self.dialogConfig.dynamicComponent.map(
                                            (a: any) => {
                                                if (a.static) {
                                                    config[a.field] = a.value;
                                                } else {
                                                    config[a.field] =
                                                        a.props.modelValue;
                                                    if (a.type == "CDSelect") {
                                                        if (
                                                            a.props.modelValue
                                                        ) {
                                                            config[a.field] =
                                                                a.props.modelValue;
                                                        } else {
                                                            config[a.field] =
                                                                null;
                                                        }
                                                    }
                                                    if (
                                                        a.type ==
                                                        "CDMultiselect"
                                                    ) {
                                                        config[a.field] =
                                                            a.props.modelValue.map(
                                                                (a: any) => {
                                                                    return {
                                                                        id: a.id,
                                                                    };
                                                                },
                                                            );
                                                    }
                                                }
                                                // }
                                            },
                                        );
                                        console.log(config);
                                        if (config.contractDate) {
                                            // config.contractDate = dayjs(
                                            //     config.contractDate,
                                            //     "YYYY/MM/DD",
                                            // )
                                            //     .toDate()
                                            //     .toISOString();
                                            config.contractDate =
                                                config.contractDate
                                                    .split("/")
                                                    .reverse()
                                                    .join("-");
                                        } else {
                                            config.contractDate = "";
                                        }
                                        let res = await store.updateGarage(
                                            config,
                                            self.originData.id,
                                        );
                                        if (res.code == 1) {
                                            self.dialogConfig.show = false;
                                            self.$toast(
                                                self.$t(
                                                    "module.generalManagerment.garage.toast.updateGarageSuccess",
                                                ),
                                                true,
                                            );
                                            self.getDataForTable();
                                        } else {
                                            self.dialogConfig.show = false;
                                            self.$toast(
                                                self.$t(
                                                    "module.generalManagerment.garage.toast.updateGarageFailse",
                                                ),
                                                false,
                                            );
                                        }
                                        // self.dialogConfig = false;
                                    },
                                },
                            ],
                        };
                        self.calculateAdressOption();
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.detail",
                    ),
                    action: async (params: any) => {
                        let garageDataConfigEditClone = this
                            .garageConfigCreate as any;
                        let originData = await store.getGarageInforById(
                            params.id,
                        );
                        if (originData.error) {
                            self.$toast("Lấy thông tin garage thất bại", false);
                            return;
                        }
                        self.originData = originData.data;
                        self.originData.id = params.id;
                        let parentInfor: any;
                        if (originData.data.parentGarageId) {
                            parentInfor = await self.getParrentGarageInfor(
                                originData.data.parentGarageId,
                            );
                            if (parentInfor != null) {
                                Object.keys(parentInfor).map((a) => {
                                    if (
                                        garageDataConfigEditClone.hasOwnProperty(
                                            a,
                                        ) &&
                                        garageDataConfigEditClone[a].props
                                    ) {
                                        if (
                                            garageDataConfigEditClone[
                                                a
                                            ].hasOwnProperty(
                                                "formatterModelValue",
                                            )
                                        ) {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = garageDataConfigEditClone[
                                                a
                                            ].formatterModelValue(
                                                parentInfor[a],
                                            );
                                        } else {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = parentInfor[a];
                                        }
                                    }
                                });
                            }
                        }
                        Object.keys(originData.data).map((a: string) => {
                            if (!garageDataConfigEditClone.hasOwnProperty(a)) {
                            } else {
                                if (garageDataConfigEditClone[a].static) {
                                    garageDataConfigEditClone[a].value =
                                        originData.data[a];
                                } else {
                                    garageDataConfigEditClone[
                                        a
                                    ].props.modelValue = originData.data[a]
                                        ? originData.data[a]
                                        : "";
                                    if (
                                        garageDataConfigEditClone[a].type ==
                                        "CDSelect"
                                    ) {
                                        if (originData.data[a] == null) {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = "";
                                        } else {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue =
                                                originData.data[a];
                                        }
                                    }
                                    if (
                                        garageDataConfigEditClone[a].type ==
                                        "CDMultiselect"
                                    ) {
                                        if (originData.data[a] == null) {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = [];
                                        } else {
                                            garageDataConfigEditClone[
                                                a
                                            ].props.modelValue = originData.data[
                                                a
                                            ].map((a: any) => a.id);
                                        }
                                    }
                                }
                            }
                        });
                        let dynamicComponent = [] as any[];
                        Object.keys(garageDataConfigEditClone).map((a) => {
                            if (garageDataConfigEditClone[a].props) {
                                garageDataConfigEditClone[a].instanceKey =
                                    Date.now() +
                                    garageDataConfigEditClone[a].field;
                            }
                            if (garageDataConfigEditClone[a].setup) {
                                setTimeout(() => {
                                    garageDataConfigEditClone[a].setup(
                                        garageDataConfigEditClone[a]
                                            .instanceKey,
                                    );
                                }, 0);
                            }
                            if (garageDataConfigEditClone[a].props) {
                                garageDataConfigEditClone[a].props.disabled =
                                    true;
                            }
                            dynamicComponent.push(garageDataConfigEditClone[a]);
                        });
                        self.dialogConfig = {
                            show: true,
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
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.accept",
                    ),
                    action: async (params: any) => {
                        let res = await store.acceptGarage([params.id]);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.acceptFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                {
                    icon: "ArchiveBoxIcon",
                    name: self.$t(
                        "module.generalManagerment.garage.contextActions.reject",
                    ),
                    action: async (params: any) => {
                        let res = await store.rejectGarage([params.id]);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
                        } else {
                            self.$toast(
                                self.$t(
                                    "module.generalManagerment.garage.toast.rejectFailse",
                                ),
                                false,
                            );
                        }
                    },
                },
                // {
                //     icon: "ArchiveBoxIcon",
                //     name: self.$t(
                //         "module.generalManagerment.garage.contextActions.delete",
                //     ),
                //     action: (params: any) => {
                //         self.dialogConfig = {
                //             show: true,
                //             title:
                //                 self.$t(
                //                     "module.generalManagerment.garage.dialog.deleteGarageTitle",
                //                 ) +
                //                 " " +
                //                 params.name,

                //             actions: [
                //                 {
                //                     class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                //                     name: self.$t(
                //                         "module.generalManagerment.garage.dialog.deleteConfirm",
                //                     ),
                //                     action: () => {
                //                         self.dialogConfig = false;
                //                     },
                //                 },
                //                 {
                //                     class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                //                     name: self.$t(
                //                         "module.generalManagerment.garage.dialog.cancel",
                //                     ),
                //                     action: () => {
                //                         self.dialogConfig = false;
                //                     },
                //                 },
                //             ],
                //         };
                //     },
                // },
            ],
        };
    },
});
</script>
