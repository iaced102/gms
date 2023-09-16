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

export const garageDataConfigDetail = {
    parentGarageId: {
        type: "CDInput",
        group: "parentInfor",
        field: "parentGarageId",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
        },
    },
    parentGarageName: {
        type: "CDInput",
        group: "parentInfor",
        field: "parentGarageName",
        showForDetail: true,
        props: {
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
    status: {
        field: "status",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.status",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.status",
            ),
        },
    },
    mail: {
        field: "mail",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.mail",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.mail",
            ),
        },
    },
    id: {
        field: "id",
        type: "CDInput",
        group: "garageInfor",
        hidden: true,
        showForDetail: false,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.images",
            ),
            modelValue: "",
            fileList: [],
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.images",
            ),
        },
    },
    images: {
        field: "images",
        type: "CDFileUpload",
        group: "garageInfor",
        showForDetail: false,
        props: {
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
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointName",
            ),
        },
    },
    contactPointPhone: {
        type: "CDInput",
        field: "contactPointPhone",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
        type: "longitude",
        field: "latitude",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    contractFromDate: {
        type: "CDInput",
        field: "contractFromDate",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    contractStatus: {
        type: "CDSelect",
        field: "contractStatus",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    rescue: {
        type: "CDSelect",
        field: "rescue",
        group: "garageInfor",
        showForDetail: true,
        props: {
            options: RecueOptions,
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.rescue",
            ),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.rescue",
            ),
        },
    },
    isSupportAllTime: {
        type: "CDSelect",
        field: "isSupportAllTime",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    isVerified: {
        type: "CDSelect",
        field: "isVerified",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    closeTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "closeTime",
        showForDetail: true,
        props: {
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
    description: {
        type: "CDInput",
        group: "garageInfor",
        field: "description",
        showForDetail: true,
        props: {
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

export const garageConfigEdit = {
    parentGarageId: {
        type: "CDInput",
        group: "parentInfor",
        field: "parentGarageId",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
        },
    },
    parentGarageName: {
        type: "CDInput",
        group: "parentInfor",
        field: "parentGarageName",
        showForDetail: true,
        props: {
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
    //     props: {
    //         label: $t("module.generalManagerment.garage.dialogColumnTable.status"),
    //         modelValue: "",
    //         disabled: true,
    //         placeholder: $t(
    //             "module.generalManagerment.garage.dialogColumnTable.status",
    //         ),
    //     },
    // },
    mail: {
        field: "mail",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.mail",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.mail",
            ),
        },
    },
    id: {
        static: true,
        value: 0,
        field: "id",
    },
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointName",
            ),
        },
    },
    contactPointPhone: {
        type: "CDInput",
        field: "contactPointPhone",
        group: "garageInfor",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointPhone",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.contactPointPhone",
            ),
        },
    },
    avatar: {
        field: "avatar",
        static: true,
        value: "",
    },
    description: {
        type: "CDInput",
        group: "garageInfor",
        field: "description",
        showForDetail: true,
        props: {
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
    contractStatus: {
        type: "CDSelect",
        field: "contractStatus",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    contractFromDate: {
        type: "CDInput",
        field: "contractFromDate",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
        value: "2023-09-13T06:27:39.808Z",
    },
    latitude: {
        field: "latitude",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
        type: "longitude",
        field: "latitude",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    // supportSos: 0,
    isSupportAllTime: {
        type: "CDSelect",
        field: "isSupportAllTime",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    openTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "openTime",
        showForDetail: true,
        props: {
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
    closeTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "closeTime",
        showForDetail: true,
        props: {
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
    isVerified: {
        type: "CDSelect",
        field: "isVerified",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    images: {
        field: "images",
        static: true,
        value: [
            {
                url: "string",
                description: "string",
            },
        ],
    },
    carSubSystems: {
        field: "carSubSystems",
        static: true,
        value: [
            {
                id: 0,
                name: "string",
                description: "string",
                status: 0,
            },
        ],
    },
    customFieldValueRequests: {
        field: "customFieldValueRequests",
        static: true,
        value: [
            {
                customFieldId: 0,
                optionValue: 0,
                textValue: "string",
            },
        ],
    },
};

export const garageConfigCreate = {
    parentGarageId: {
        field: "parentGarageId",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.dialogColumnTable.parentGarageId",
            ),
        },
    },
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
        field: "latitude",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
        type: "CDInput",
        field: "contractFromDate",
        group: "garageInfor",
        showForDetail: true,
        props: {
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
    images: {
        field: "images",
        value: [],
        static: true,
    },
    carSubSystems: {
        field: "carSubSystems",
        value: [],
        static: true,
    },
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
    description: {
        type: "CDInput",
        group: "garageInfor",
        field: "description",
        showForDetail: true,
        props: {
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
