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
        value: $t("module.groupGarage.groupGarage.contractStatus.1"),
    },
    {
        id: 0,
        value: $t("module.groupGarage.groupGarage.contractStatus.0"),
    },
] as ContractStatus[];
interface Rescue {
    id: number;
    value: string;
}
const RecueOptions = [
    {
        id: 1,
        value: $t("module.groupGarage.groupGarage.recueStatus.1"),
    },
    {
        id: 0,
        value: $t("module.groupGarage.groupGarage.recueStatus.0"),
    },
] as Rescue[];

interface isSupportAllTime {
    id: number;
    value: string;
}
const isSupportAllTimeOptions = [
    {
        id: 1,
        value: $t("module.groupGarage.groupGarage.recueStatus.1"),
    },
    {
        id: 0,
        value: $t("module.groupGarage.groupGarage.recueStatus.0"),
    },
] as isSupportAllTime[];

interface isVerified {
    id: number;
    value: string;
}
const isVerifiedOptions = [
    {
        id: 1,
        value: $t("module.groupGarage.groupGarage.verifiedOption.1"),
    },
    {
        id: 0,
        value: $t("module.groupGarage.groupGarage.verifiedOption.0"),
    },
] as isVerified[];

export const garageDataConfigDetail = {
    parentGarageId: {
        type: "CDInput",
        group: "parentInfor",
        field: "parentGarageId",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.groupGarage.groupGarage.columnTable.parentGarageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.parentGarageId",
            ),
        },
    },
    parentGarageName: {
        type: "CDInput",
        group: "parentInfor",
        field: "parentGarageName",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.groupGarage.groupGarage.columnTable.parentGarageName",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.parentGarageName",
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
            label: $t("module.groupGarage.groupGarage.columnTable.taxCode"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.taxCode",
            ),
        },
    },
    phone: {
        field: "phone",
        type: "CDInput",
        group: "parentInfor",
        props: {
            type: "tel",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.phone"),
            modelValue: "",
            disabled: true,
            placeholder: $t("module.groupGarage.groupGarage.columnTable.phone"),
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
            label: $t("module.groupGarage.groupGarage.columnTable.website"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.website",
            ),
        },
    },
    status: {
        field: "status",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.status"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.status",
            ),
        },
    },
    mail: {
        field: "mail",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.mail"),
            modelValue: "",
            disabled: true,
            placeholder: $t("module.groupGarage.groupGarage.columnTable.mail"),
        },
    },
    id: {
        field: "id",
        type: "CDInput",
        group: "garageInfor",
        hidden: true,
        showForDetail: false,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.images"),
            modelValue: "",
            fileList: [],
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.images",
            ),
        },
    },
    images: {
        field: "images",
        type: "CDFileUpload",
        group: "garageInfor",
        showForDetail: false,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.images"),
            modelValue: [],
            fileList: [],
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.images",
            ),
        },
    },
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.groupGarage.groupGarage.validator.nameCannotBeEmpty",
                );
            }
        },
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.name"),
            modelValue: "",
            placeholder: $t("module.groupGarage.groupGarage.columnTable.name"),
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
                "module.groupGarage.groupGarage.columnTable.contactPointName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.contactPointName",
            ),
        },
    },
    contactPointPhone: {
        type: "CDInput",
        field: "contactPointPhone",
        group: "garageInfor",
        showForDetail: true,
        props: {
            type: "tel",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.groupGarage.groupGarage.columnTable.contactPointPhone",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.contactPointPhone",
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
            label: $t("module.groupGarage.groupGarage.columnTable.latitude"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.latitude",
            ),
        },
    },
    longitude: {
        type: "longitude",
        field: "latitude",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.groupGarage.groupGarage.columnTable.longitude"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.longitude",
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
            label: $t("module.groupGarage.groupGarage.columnTable.provinceId"),
            modelValue: undefined,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.provinceId",
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
            label: $t("module.groupGarage.groupGarage.columnTable.districtId"),
            modelValue: undefined,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.districtId",
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
            label: $t("module.groupGarage.groupGarage.columnTable.wardId"),
            modelValue: undefined,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.wardId",
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
            label: $t("module.groupGarage.groupGarage.columnTable.address"),
            modelValue: undefined,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.address",
            ),
        },
    },
    contractFromDate: {
        type: "CDInput",
        field: "contractFromDate",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: [],
            label: $t(
                "module.groupGarage.groupGarage.columnTable.contractFromDate",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.contractFromDate",
            ),
        },
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
                "module.groupGarage.groupGarage.columnTable.contractStatus",
            ),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.contractStatus",
            ),
        },
    },
    rescue: {
        type: "CDSelect",
        field: "rescue",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            options: RecueOptions,
            label: $t("module.groupGarage.groupGarage.columnTable.rescue"),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.rescue",
            ),
        },
    },
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
                "module.groupGarage.groupGarage.columnTable.isSupportAllTime",
            ),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.isSupportAllTime",
            ),
        },
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
            label: $t("module.groupGarage.groupGarage.columnTable.isVerified"),
            modelValue: undefined,
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.isVerified",
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
            title: $t("module.groupGarage.groupGarage.columnTable.openTime"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.openTime",
            ),
        },
    },
    closeTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "closeTime",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            title: $t("module.groupGarage.groupGarage.columnTable.closeTime"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.closeTime",
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
            label: $t("module.groupGarage.groupGarage.columnTable.description"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.description",
            ),
        },
    },
};

export const garageConfigEdit = {
    // code: {
    //     field: "code",
    //     type: "CDInput",
    //     group: "garageInfor",
    //     showForDetail: true,
    //     props: {
    //         label: $t("module.groupGarage.groupGarage.columnTable.code"),
    //         modelValue: "",
    //         placeholder: $t("module.groupGarage.groupGarage.columnTable.code"),
    //     },
    // },
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        validator: (val: string) => {
            if (!val) {
                return $t(
                    "module.groupGarage.groupGarage.validator.nameCannotBeEmpty",
                );
            }
        },
        showForDetail: true,
        props: {
            isRequired: true,
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.name"),
            modelValue: "",
            placeholder: $t("module.groupGarage.groupGarage.columnTable.name"),
        },
    },
    taxCode: {
        field: "taxCode",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.taxCode"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.taxCode",
            ),
        },
    },
    garageOwnerName: {
        field: "garageOwnerName",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerName",
            ),
        },
    },
    website: {
        field: "website",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.website"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.website",
            ),
        },
    },
    provinceId: {
        static: true,
        field: "provinceId",
        value: 0,
    },
    districtId: {
        static: true,
        field: "wardId",
        value: 0,
    },
    wardId: {
        static: true,
        field: "wardId",
        value: 0,
    },
    address: {
        type: "CDInput",
        field: "address",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            options: [],
            label: $t("module.generalManagerment.garage.columnTable.address"),
            modelValue: undefined,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.address",
            ),
        },
    },
    garageOwnerPhone: {
        field: "garageOwnerPhone",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            type: "tel",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerPhone",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerPhone",
            ),
        },
    },
    placeOfIssue: {
        // field: "placeOfIssue",
        // type: "CDInput",
        // group: "garageInfor",
        // showForDetail: true,
        // props: {
        //     label: $t(
        //         "module.groupGarage.groupGarage.columnTable.placeOfIssue",
        //     ),
        //     modelValue: "",
        //     placeholder: $t(
        //         "module.groupGarage.groupGarage.columnTable.placeOfIssue",
        //     ),
        // },
        static: true,
        field: "placeOfIssue",
        value: "",
    },
    dateOfIssue: {
        field: "dateOfIssue",
        static: true,
        value: "2023-09-16T00:31:00.938Z",
    },
};

export const garageConfigCreate = {
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.groupGarage.groupGarage.validator.nameCannotBeEmpty",
                );
            }
        },
        props: {
            isRequired: true,
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.name"),
            modelValue: "",
            placeholder: $t("module.groupGarage.groupGarage.columnTable.name"),
        },
    },
    taxCode: {
        field: "taxCode",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.taxCode"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.taxCode",
            ),
        },
    },
    garageOwnerName: {
        field: "garageOwnerName",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerName",
            ),
        },
    },
    website: {
        field: "website",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.website"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.website",
            ),
        },
    },
    provinceId: {
        static: true,
        field: "provinceId",
        value: 0,
    },
    districtId: {
        static: true,
        field: "wardId",
        value: 0,
    },
    wardId: {
        static: true,
        field: "wardId",
        value: 0,
    },
    address: {
        type: "CDInput",
        field: "address",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            options: [],
            label: $t("module.generalManagerment.garage.columnTable.address"),
            modelValue: undefined,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.address",
            ),
        },
    },
    garageOwnerPhone: {
        field: "garageOwnerPhone",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            type: "tel",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerPhone",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.garageOwnerPhone",
            ),
        },
    },
    placeOfIssue: {
        field: "placeOfIssue",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t(
                "module.groupGarage.groupGarage.columnTable.placeOfIssue",
            ),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.placeOfIssue",
            ),
        },
    },
    dateOfIssue: {
        field: "dateOfIssue",
        type: "CDDatePicker",
        group: "garageInfor",
        showForDetail: true,
        props: {
            formatter: "YYYY-MM-DD",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            disabled: true,
            label: $t("module.groupGarage.groupGarage.columnTable.dateOfIssue"),
            modelValue: "",
            placeholder: $t(
                "module.groupGarage.groupGarage.columnTable.dateOfIssue",
            ),
        },
    },
};
