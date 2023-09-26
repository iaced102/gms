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
            @filter="filter"
            :filterColumns="filterColumns"
            :forFilter="true"
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
                                "module.groupGarage.groupGarage.dialog.garaInfor",
                            )
                        }}
                    </h1>
                    <CDMultipleRenderDynamicComponent
                        perItemClass="px-3 py-6 border-b"
                        commonClass="flex align-center"
                        @updateValue="({val, instanceKey}:any)=>updateValueDynamicComponent({val,instanceKey})"
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
import dayjs from "dayjs";
export default defineComponent({
    async created() {
        this.getDataForTable();
    },
    methods: {
        updateValueDynamicComponent({ val, instanceKey }: any) {
            let field = this.dialogConfig.dynamicComponent.find(
                (a: any) => a.instanceKey == instanceKey,
            );
            if (field.onUpdate) {
                field.onUpdate(val, instanceKey);
            }
        },
        filter(config: any) {
            //console.log(config);
            this.pagination.currentPage = 1;
            this.getDataForTable(config);
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
            let originData = await store.getGarageInforById(id);
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
    watch: {},
    data() {
        let self = this as any;
        return {
            filterColumns: [
                {
                    label: self.$t(
                        "module.groupGarage.groupGarage.filterColumn.code",
                    ),
                    value: "code",
                },
                {
                    label: self.$t(
                        "module.groupGarage.groupGarage.filterColumn.name",
                    ),
                    value: "name",
                },
                {
                    label: self.$t(
                        "module.groupGarage.groupGarage.filterColumn.status",
                    ),
                    value: "status",
                    type: "CDSelect",
                    options: [
                        {
                            id: 1,
                            value: self.$t(
                                "module.groupGarage.groupGarage.status.1",
                            ),
                        },
                        {
                            id: 2,
                            value: self.$t(
                                "module.groupGarage.groupGarage.status.2",
                            ),
                        },
                        {
                            id: 3,
                            value: self.$t(
                                "module.groupGarage.groupGarage.status.3",
                            ),
                        },
                    ],
                },
            ],
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
                        garageDataConfigCreateClone[a].instanceKey =
                            Date.now() + garageDataConfigCreateClone[a].field;
                        if (garageDataConfigCreateClone[a].props) {
                            garageDataConfigCreateClone[a].props.disabled =
                                false;
                            garageDataConfigCreateClone[a].props.modelValue =
                                "";
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
                                    "module.groupGarage.groupGarage.dialog.create",
                                ),
                                action: async () => {
                                    let isValidate = true;
                                    self.dialogConfig.dynamicComponent.map(
                                        (a: any) => {
                                            if (a.validator) {
                                                let error = a.validator(
                                                    a.props.modelValue,
                                                );
                                                console.log(error);
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
                                            }
                                        },
                                    );
                                    console.log(data);
                                    if (data.dateOfIssue) {
                                        // data.dateOfIssue = dayjs(
                                        //     data.dateOfIssue,
                                        //     "YYYY-MM-DD",
                                        // )
                                        //     .toDate()
                                        //     .toISOString();
                                        // dayjs(data.dateOfIssue).format("yyyy-mm-dd");
                                        data.dateOfIssue = data.dateOfIssue.split("/").reverse().join("-");
                                    } else {
                                        data.dateOfIssue = "";
                                    }
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
                            if (garageDataConfigEditClone[a].props) {
                                garageDataConfigEditClone[a].instanceKey =
                                    Date.now() +
                                    garageDataConfigEditClone[a].field;
                            }
                            if (garageDataConfigEditClone[a].props) {
                                garageDataConfigEditClone[a].props.disabled =
                                    false;
                                dynamicComponent.push(
                                    garageDataConfigEditClone[a],
                                );
                            }
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
                                    class: "block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm border mr-4 flex justify-center items-center border-black",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig.show = false;
                                    },
                                },
                                {
                                    class: "block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
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
                                    },
                                },
                            ],
                        };
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
                                    class: "block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm border mr-4 flex justify-center items-center border-black",
                                    name: self.$t(
                                        "module.groupGarage.groupGarage.dialog.cancel",
                                    ),
                                    action: () => {
                                        self.dialogConfig = false;
                                    },
                                },
                                {
                                    class: "block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",

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
