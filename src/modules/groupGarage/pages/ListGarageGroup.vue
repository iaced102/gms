<template>
    <div>
        <CDTable
            ref="table"
            v-if="rowData.length > 0"
            :tableName="$t('module.groupGarage.groupGarage.tableName')"
            :actions="tableActions"
            :rowData="rowData"
            :columns="columns"
            :forStatus="true"
            :forActions="true"
            positionDropdownClass="right-[40px] bottom-[-65px]"
            :contextActions="contextActions"
            :pagination="pagination"
            :multipleRowActions="multipleRowActions"
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
                <!-- <div>
                    <h1>
                        {{
                            $t(
                                "module.groupGarage.groupGarage.dialog.parentInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3"
                        :modelValue="
                            dialogConfig.dynamicComponent.filter(
                                (a) => a.group == 'parentInfor',
                            )
                        "
                    />
                </div> -->

                <div class="mt-7">
                    <h1>
                        {{
                            $t(
                                "module.groupGarage.groupGarage.dialog.garaInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3"
                        :modelValue="
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
import { groupGarageStore } from "../store/index";
const store = groupGarageStore();
const displayCol = [
    "code",
    "taxCode",
    "name",
    "garageOwnerName",
    "website",
    "status",
];
import { garageConfigEdit, garageConfigCreate } from "../data/index";
export default defineComponent({
    async created() {
        this.getDataForTable();
    },
    methods: {
        // updateValueDynamicComponent(val: any, field: string) {
        //     console.log(val, field);
        //     debugger;
        //     if (field == "provinceId") {
        //         this.locationConfig.provinceId.value = val;
        //     } else if (field == "districtId") {
        //         this.locationConfig.districtId.value = val;
        //     } else if (field == "wardId") {
        //         this.locationConfig.wardId.value = val;
        //     }
        //     if (
        //         field == "provinceId" ||
        //         field == "districtId" ||
        //         field == "wardId"
        //     ) {
        //         this.calculateAdressOption();
        //     }
        // },
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
            let originData = await store.getGarageInforById(id);
            return originData.data;
        },
        changePage(val: any) {
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
    watch: {
        // "dialogConfig.dynamicComponent": {
        //     deep: true,
        //     handler(newVal: any, old: any) {
        //         console.log(newVal, old);
        //         let newProvinceId = newVal.find(
        //             (a: any) => a.field == "provinceId",
        //         );
        //         let oldProvinceId = this.locationConfig.provinceId.value;
        //         if (
        //             newProvinceId &&
        //             newProvinceId.props.modelValue &&
        //             newProvinceId.props.modelValue != oldProvinceId
        //         ) {
        //             console.log("asdjlfkjalskdjf");
        //             this.locationConfig.provinceId.value =
        //                 newProvinceId.props.modelValue;
        //             this.calculateAdressOption();
        //         }
        //         let newDistrcitId = newVal.find(
        //             (a: any) => a.field == "districtId",
        //         );
        //         let oldDistrcitId = this.locationConfig.districtId.value;
        //         if (
        //             newDistrcitId &&
        //             newDistrcitId.props.modelValue &&
        //             newDistrcitId.props.modelValue != oldDistrcitId
        //         ) {
        //             this.locationConfig.districtId.value =
        //                 newDistrcitId.props.modelValue;
        //             this.calculateAdressOption();
        //         }
        //     },
        // },
    },
    data() {
        let self = this as any;
        return {
            multipleRowActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.groupGarage.groupGarage.multipleRowActions.accept",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = await store.acceptGarage(ids);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.groupGarage.groupGarage.toast.acceptSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
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
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.groupGarage.groupGarage.multipleRowActions.reject",
                    ),
                    action: async (params: any) => {
                        let ids = params.map((a: any) => a.id);
                        let res = await store.rejectGarage(ids);
                        if (res.code == 1) {
                            self.$toast(
                                self.$t(
                                    "module.groupGarage.groupGarage.toast.rejectSuccess",
                                ),
                                true,
                            );
                            self.getDataForTable();
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
                action: () => {
                    self.dialogConfig = {
                        show: false,
                        title: "",
                        dynamicComponent: [],
                        actions: [],
                    };
                    let garageDataConfigCreateClone = (() => {
                        return garageConfigCreate as any;
                    })();
                    let dynamicComponent = [] as any[];
                    Object.keys(garageDataConfigCreateClone).map((a) => {
                        if (
                            garageDataConfigCreateClone[a].group ==
                                "parentInfo" &&
                            garageDataConfigCreateClone[a].field !=
                                "parentGarageId"
                        ) {
                            garageDataConfigCreateClone[a].props.disabled =
                                true;
                            garageDataConfigCreateClone[a].props.modelValue =
                                "";
                        } else {
                            if (
                                garageDataConfigCreateClone[a].group ==
                                "garageInfor"
                            ) {
                                garageDataConfigCreateClone[a].props.disabled =
                                    false;
                                garageDataConfigCreateClone[
                                    a
                                ].props.modelValue = "";
                            }
                        }
                        dynamicComponent.push(garageDataConfigCreateClone[a]);
                    });
                    self.dialogConfig = {
                        show: true,
                        title: self.$t(
                            "module.groupGarage.groupGarage.dialog.createGarage",
                        ),
                        dynamicComponent: dynamicComponent,
                        actions: [
                            {
                                class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                name: self.$t(
                                    "module.groupGarage.groupGarage.dialog.createGarage",
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
                                    data.contractFromDate = "";
                                    data.contractToDate = "";
                                    let res = await store.createGarage(data);
                                    if (res.code == 1) {
                                        self.$toast(
                                            self.$t(
                                                "module.groupGarage.groupGarage.toast.createGarageSuccess",
                                            ),
                                            true,
                                        );
                                        self.getDataForTable();
                                    } else {
                                        self.$toast(
                                            self.$t(
                                                "module.groupGarage.groupGarage.toast.createGarageFailse",
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
                name: this.$t("module.groupGarage.groupGarage.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.groupGarage.groupGarage.contextActions.update",
                    ),
                    action: async (params: any) => {
                        let garageDataConfigEditClone = garageConfigEdit as any;
                        let originData = await store.getGarageInforById(
                            params.id,
                        );
                        console.log(originData);
                        if (originData.error) {
                            self.$toast("Lấy thông tin garage thất bại", false);
                            return;
                        }
                        self.originData = originData.data;
                        self.originData.id = params.id;
                        let parentInfor;
                        if (originData.data.parentGarageId) {
                            parentInfor = await self.getParrentGarageInfor(
                                originData.data.parentGarageId,
                            );
                            if (parentInfor != null) {
                                garageDataConfigEditClone.parentGarageName.props.modelValue =
                                    parentInfor.name;
                                garageDataConfigEditClone.taxCode.props.modelValue =
                                    parentInfor.taxCode;
                                garageDataConfigEditClone.phone.props.modelValue =
                                    parentInfor.phone;
                                garageDataConfigEditClone.website.props.modelValue =
                                    parentInfor.website;
                                garageDataConfigEditClone.mail.props.modelValue =
                                    parentInfor.mail;
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
                                }
                            }
                        });
                        let dynamicComponent = [] as any[];
                        Object.keys(garageDataConfigEditClone).map((a) => {
                            if (
                                garageDataConfigEditClone[a].group ==
                                    "parentInfo" &&
                                garageDataConfigEditClone[a].field !=
                                    "parentGarageId"
                            ) {
                                garageDataConfigEditClone[a].props.disabled =
                                    true;
                            } else {
                                if (
                                    garageDataConfigEditClone[a].group ==
                                    "garageInfor"
                                ) {
                                    garageDataConfigEditClone[
                                        a
                                    ].props.disabled = false;
                                }
                            }
                            dynamicComponent.push(garageDataConfigEditClone[a]);
                        });
                        self.dialogConfig = {
                            show: true,
                            title:
                                self.$t(
                                    "module.groupGarage.groupGarage.dialog.detailGarageTitle",
                                ) +
                                " " +
                                params.name,

                            dynamicComponent: dynamicComponent,
                            actions: [
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.save",
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
                                                }
                                                // }
                                            },
                                        );
                                        let res = await store.updateGarage(
                                            config,
                                            self.originData.id,
                                        );
                                        if (res.code == 1) {
                                            self.dialogConfig.show = false;
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.updateGarageSuccess",
                                                ),
                                                true,
                                            );
                                            self.getDataForTable();
                                        } else {
                                            self.dialogConfig.show = false;
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.updateGarageFailse",
                                                ),
                                                false,
                                            );
                                        }
                                        // self.dialogConfig = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.reject",
                                    ),
                                    action: async () => {
                                        let id = self.originData.id;
                                        let res = await store.rejectGarage([
                                            id,
                                        ]);
                                        if (res.code == 1) {
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.rejectSuccess",
                                                ),
                                                true,
                                            );
                                            self.getDataForTable();
                                        } else {
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.rejectFailse",
                                                ),
                                                false,
                                            );
                                        }
                                        self.dialogConfig.show = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.contextActions.accept",
                                    ),
                                    action: async () => {
                                        let id = self.originData.id;
                                        let res = await store.acceptGarage([
                                            id,
                                        ]);
                                        if (res.code == 1) {
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.acceptSuccess",
                                                ),
                                                true,
                                            );
                                            self.getDataForTable();
                                        } else {
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.acceptFailse",
                                                ),
                                                false,
                                            );
                                        }
                                        self.dialogConfig.show = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig.show = false;
                                    },
                                },
                                {
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.deleteConfirm",
                                    ),
                                    action: () => {
                                        self.dialogConfig = {
                                            show: true,
                                            title:
                                                self.$t(
                                                    "module.groupGarage.groupGarage.dialog.detailGarageTitle",
                                                ) +
                                                " " +
                                                params.name,

                                            dynamicComponent: dynamicComponent,
                                            actions: [
                                                {
                                                    class: "inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                                    name: self.$t(
                                                        "module.groupGarage.groupGarage.dialog.deleteConfirm",
                                                    ),
                                                    action: async () => {
                                                        let res: any =
                                                            await store.deleteGarage(
                                                                self.originData
                                                                    .id,
                                                            );
                                                        if (res.code == 1) {
                                                            self.getDataForTable();
                                                            self.$toast(
                                                                self.$t(
                                                                    "module.groupGarage.groupGarage.toast.deleteGarageSuccess",
                                                                ),
                                                                true,
                                                            );
                                                            self.dialogConfig =
                                                                false;
                                                        } else {
                                                            self.$toast(
                                                                self.$t(
                                                                    "module.groupGarage.groupGarage.toast.deleteGarageFailse",
                                                                ),
                                                            );
                                                        }
                                                    },
                                                },
                                                {
                                                    class: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                                    name: self.$t(
                                                        "module.groupGarage.groupGarage.dialog.cancel",
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
                        // self.calculateAdressOption();
                    },
                },
                {
                    icon: "EllipsisVerticalIcon",
                    name: self.$t(
                        "module.groupGarage.groupGarage.contextActions.detail",
                    ),
                    action: async (params: any) => {
                        let garageDataConfigDetailClone =
                            garageConfigEdit as any;
                        let originData = await store.getGarageInforById(
                            params.id,
                        );
                        if (originData.error) {
                            self.$toast("Lấy thông tin garage thất bại", false);
                            return;
                        }
                        self.originData = originData.data;
                        self.originData.id = params.id;
                        let parentInfor;
                        if (originData.data.parentGarageId) {
                            parentInfor = await self.getParrentGarageInfor(
                                originData.data.parentGarageId,
                            );
                            if (parentInfor != null) {
                                garageDataConfigDetailClone.parentGarageName.props.modelValue =
                                    parentInfor.name;
                                garageDataConfigDetailClone.taxCode.props.modelValue =
                                    parentInfor.taxCode;
                                garageDataConfigDetailClone.phone.props.modelValue =
                                    parentInfor.phone;
                                garageDataConfigDetailClone.website.props.modelValue =
                                    parentInfor.website;
                                garageDataConfigDetailClone.mail.props.modelValue =
                                    parentInfor.mail;
                                console.log(parentInfor);
                            }
                        }

                        Object.keys(originData.data).map((a: string) => {
                            if (
                                !garageDataConfigDetailClone.hasOwnProperty(a)
                            ) {
                            } else {
                                if (garageDataConfigDetailClone[a].static) {
                                    garageDataConfigDetailClone[a].value =
                                        originData.data[a];
                                } else {
                                    garageDataConfigDetailClone[
                                        a
                                    ].props.modelValue = originData.data[a]
                                        ? originData.data[a]
                                        : "";
                                    if (
                                        garageDataConfigDetailClone[a].type ==
                                        "CDSelect"
                                    ) {
                                        if (originData.data[a] == null) {
                                            garageDataConfigDetailClone[
                                                a
                                            ].props.modelValue = undefined;
                                        } else {
                                            garageDataConfigDetailClone[
                                                a
                                            ].props.modelValue = {
                                                id: originData.data[a],
                                                value: originData.data[a],
                                            };
                                        }
                                    }
                                    garageDataConfigDetailClone[
                                        a
                                    ].props.disabled = true;
                                }
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
                                    "module.groupGarage.groupGarage.dialog.detailGarageTitle",
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
                                    action: async () => {
                                        let res: any = await store.deleteGarage(
                                            params.id,
                                        );
                                        if (res.code == 1) {
                                            self.getDataForTable();
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.deleteGarageSuccess",
                                                ),
                                                true,
                                            );
                                            self.dialogConfig = false;
                                        } else {
                                            self.$toast(
                                                self.$t(
                                                    "module.groupGarage.groupGarage.toast.deleteGarageFailse",
                                                ),
                                            );
                                        }
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
                            self.getDataForTable();
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
                            self.getDataForTable();
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
