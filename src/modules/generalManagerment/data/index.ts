import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;
interface ContractStatus {
    id: number;
    value: string;
}
interface ContractStatus {
    id: number;
    value: string;
}

const contractStatusOptions = [
    {
        id: 1,
        value: $t("module.generalManagerment.garage.contractStatus.1"),
    },
    {
        id: 0,
        value: $t("module.generalManagerment.garage.contractStatus.0"),
    },
] as ContractStatus[];
interface Rescue {
    id: number;
    value: string;
}
const RecueOptions = [
    {
        id: 1,
        value: $t("module.generalManagerment.garage.recueStatus.1"),
    },
    {
        id: 0,
        value: $t("module.generalManagerment.garage.recueStatus.0"),
    },
] as Rescue[];

interface isSupportAllTime {
    id: number;
    value: string;
}
const isSupportAllTimeOptions = [
    {
        id: 1,
        value: $t("module.generalManagerment.garage.recueStatus.1"),
    },
    {
        id: 0,
        value: $t("module.generalManagerment.garage.recueStatus.0"),
    },
] as isSupportAllTime[];

interface isVerified {
    id: number;
    value: string;
}
const isVerifiedOptions = [
    {
        id: 1,
        value: $t("module.generalManagerment.garage.verifiedOption.1"),
    },
    {
        id: 0,
        value: $t("module.generalManagerment.garage.verifiedOption.0"),
    },
] as isVerified[];
export const garageConfigCreate = {
    parentGarageId: {
        field: "parentGarageId",
        type: "CDComboBox",
        group: "parentInfor",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.generalManagerment.garage.validator.parentGarageIdCannotBeEmpty",
                );
            }
        },
        props: {
            isRequired: true,
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
            options: [],
        },
    },
    parentGarageName: {
        type: "CDInput",
        group: "parentInfor",
        field: "name",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageName",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageName",
            ),
        },
    },
    taxCode: {
        type: "CDInput",
        group: "parentInfor",
        field: "taxCode",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.taxCode",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.taxCode",
            ),
        },
    },
    phone: {
        field: "phone",
        type: "CDInput",
        group: "parentInfor",
        props: {
            type: "number",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.phone",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.phone",
            ),
        },
    },
    website: {
        field: "website",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.website",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.website",
            ),
        },
    },
    // status: {
    //     field: "status",
    //     type: "CDInput",
    //     group: "parentInfor",
    //     showForDetail: true,
    //     formatterModelValue: (val: number): string => {
    //         if (val == 1 || val == 2 || val == 3) {
    //             return $t("module.generalManagerment.garage.status." + val);
    //         }
    //         return "";
    //     },
    //     props: {
    //         labelClass: "w-1/3",
    //         contentClass: "w-2/3",
    //         label: $t(
    //             "module.generalManagerment.garage.dialogColumnTable.status",
    //         ),
    //         modelValue: "",
    //         disabled: true,
    //         placeholder: $t(
    //             "module.generalManagerment.garage.dialogColumnTable.status",
    //         ),
    //     },
    // },
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.generalManagerment.garage.validator.garageNameCannotBeEmpty",
                );
            }
        },
        props: {
            isRequired: true,
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.name",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.name",
            ),
        },
    },
    contactPointName: {
        field: "contactPointName",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointName",
            ),
        },
    },
    avatar: {
        field: "avatar",
        static: true,
        value: "",
    },
    contactPointPhone: {
        type: "CDInput",
        field: "contactPointPhone",
        group: "garageInfor",
        showForDetail: true,
        props: {
            type: "number",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointPhone",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointPhone",
            ),
        },
    },
    latitude: {
        field: "latitude",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.latitude",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.latitude",
            ),
        },
    },
    longitude: {
        type: "CDInput",
        field: "longitude",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.longitude",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.longitude",
            ),
        },
    },
    provinceId: {
        field: "provinceId",
        type: "CDSelect",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.provinceId",
            ),
            modelValue: undefined,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.provinceId",
            ),
        },
    },
    districtId: {
        type: "CDSelect",
        field: "districtId",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.districtId",
            ),
            modelValue: undefined,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.districtId",
            ),
        },
    },
    wardId: {
        type: "CDSelect",
        field: "wardId",
        showForDetail: true,
        group: "garageInfor",
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.wardId",
            ),
            modelValue: undefined,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.wardId",
            ),
        },
    },
    address: {
        type: "CDInput",
        field: "address",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.address",
            ),
            modelValue: undefined,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.address",
            ),
        },
    },
    supportSos: {
        field: "supportSos",
        static: true,
        value: 0,
    },
    contractFromDate: {
        type: "CDDatePicker",
        field: "contractFromDate",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contractFromDate",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contractFromDate",
            ),
        },
    },
    contractToDate: {
        field: "contractToDate",
        static: true,
        value: "",
    },
    contractStatus: {
        type: "CDSelect",
        field: "contractStatus",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: contractStatusOptions,
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contractStatus",
            ),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contractStatus",
            ),
        },
    },
    // longitude: {
    //     type: "longitude",
    //     field: "latitude",
    //     group: "garageInfor",
    //     showForDetail: true,
    //     props: {
    //         label: $t("module.generalManagerment.garage.dialogColumnTable.longitude"),
    //         modelValue: "",
    //         placeholder: $t(
    //             "module.generalManagerment.garage.dialogColumnTable.longitude",
    //         ),
    //     },
    // },
    isSupportAllTime: {
        type: "CDSelect",
        field: "isSupportAllTime",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: isSupportAllTimeOptions,
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.isSupportAllTime",
            ),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.isSupportAllTime",
            ),
        },
    },
    isReceiveWebsite: {
        field: "isReceiveWebsite",
        static: true,
        value: 0,
    },
    isReceiveBooking: {
        field: "isReceiveBooking",
        static: true,
        value: 0,
    },
    isVerified: {
        type: "CDSelect",
        field: "isVerified",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: isVerifiedOptions,
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.isVerified",
            ),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.isVerified",
            ),
        },
    },
    openTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "openTime",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            title: $t(
                "module.generalManagerment.garage.dialogColumnTable.openTime",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.openTime",
            ),
        },
    },
    // carSubSystems: {
    //     field: "carSubSystems",
    //     value: [],
    //     static: true,
    // },
    customFieldValueRequests: {
        field: "customFieldValueRequests",
        value: [],
        static: true,
    },
    closeTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "closeTime",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            title: $t(
                "module.generalManagerment.garage.dialogColumnTable.closeTime",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.closeTime",
            ),
        },
    },
    images: {
        field: "images",
        type: "CDFileUpload",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.images",
            ),
            modelValue: [],
            fileList: [],
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.images",
            ),
        },
    },
    carSubSystems: {
        field: "carSubSystems",
        type: "CDMultiselect",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.carSubSystems",
            ),
            modelValue: [],
            getterFormatter(val: any[]) {
                let result = val.map((a) => {
                    return a.id;
                });
                return result;
            },
            setterFormatter(val: number[] | string[]) {
                let result = val.map((a) => {
                    return { id: a };
                });
                return result;
            },
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.carSubSystems",
            ),
        },
    },
    rescues: {
        field: "rescues",
        type: "CDMultiselect",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.rescues",
            ),
            modelValue: [],
            getterFormatter(val: any[]) {
                let result = val.map((a) => {
                    return a.id;
                });
                return result;
            },
            setterFormatter(val: number[] | string[]) {
                let result = val.map((a) => {
                    return { id: a };
                });
                return result;
            },
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.rescues",
            ),
        },
    },
    insurances: {
        field: "rescues",
        type: "CDMultiselect",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.insurances",
            ),
            modelValue: [],
            getterFormatter(val: any[]) {
                let result = val.map((a) => {
                    return a.id;
                });
                return result;
            },
            setterFormatter(val: number[] | string[]) {
                let result = val.map((a) => {
                    return { id: a };
                });
                return result;
            },
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.insurances",
            ),
        },
    },
    description: {
        type: "CDInput",
        group: "garageInfor",
        field: "description",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.description",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.description",
            ),
        },
    },
};
