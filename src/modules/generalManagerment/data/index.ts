import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;
interface ContractStatus {
    id: string;
    value: string;
}
const contractStatusOptions = [
    {
        id: "1",
        value: $t("module.generalManagerment.garage.contractStatus.1"),
    },
    {
        id: "0",
        value: $t("module.generalManagerment.garage.contractStatus.0"),
    },
] as ContractStatus[];
interface Rescue {
    id: string;
    value: string;
}
const RecueOptions = [
    {
        id: "1",
        value: $t("module.generalManagerment.garage.recueStatus.1"),
    },
    {
        id: "0",
        value: $t("module.generalManagerment.garage.recueStatus.0"),
    },
] as Rescue[];

interface isSupportAllTime {
    id: string;
    value: string;
}
const isSupportAllTimeOptions = [
    {
        id: "1",
        value: $t("module.generalManagerment.garage.recueStatus.1"),
    },
    {
        id: "0",
        value: $t("module.generalManagerment.garage.recueStatus.0"),
    },
] as isSupportAllTime[];

interface isVerified {
    id: string;
    value: string;
}
const isVerifiedOptions = [
    {
        id: "1",
        value: $t("module.generalManagerment.garage.recueStatus.1"),
    },
    {
        id: "0",
        value: $t("module.generalManagerment.garage.recueStatus.0"),
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
                "module.generalManagerment.garage.columnTable.parentGarageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.parentGarageId",
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
                "module.generalManagerment.garage.columnTable.parentGarageName",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.parentGarageName",
            ),
        },
    },
    taxCode: {
        type: "CDInput",
        group: "parentInfor",
        field: "taxCode",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.taxCode"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.taxCode",
            ),
        },
    },
    phone: {
        field: "phone",
        type: "CDInput",
        group: "parentInfor",
        props: {
            label: $t("module.generalManagerment.garage.columnTable.phone"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.phone",
            ),
        },
    },
    website: {
        field: "website",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.website"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.website",
            ),
        },
    },
    status: {
        field: "status",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.status"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.status",
            ),
        },
    },
    mail: {
        field: "mail",
        type: "CDInput",
        group: "parentInfor",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.mail"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.mail",
            ),
        },
    },
    id: {
        field: "id",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: false,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.images"),
            modelValue: "",
            fileList: [],
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.images",
            ),
        },
    },
    images: {
        field: "images",
        type: "CDFileUpload",
        group: "garageInfor",
        props: {
            label: $t("module.generalManagerment.garage.columnTable.images"),
            modelValue: "",
            fileList: [],
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.images",
            ),
        },
    },
    name: {
        field: "name",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.name"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.name",
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
                "module.generalManagerment.garage.columnTable.contactPointName",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.contactPointName",
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
                "module.generalManagerment.garage.columnTable.contactPointPhone",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.contactPointPhone",
            ),
        },
    },
    latitude: {
        field: "latitude",
        type: "CDInput",
        group: "garageInfor",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.latitude"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.latitude",
            ),
        },
    },
    longitude: {
        type: "longitude",
        field: "latitude",
        group: "garageInfor",
        showForDetail: true,
        props: {
            label: $t("module.generalManagerment.garage.columnTable.longitude"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.longitude",
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
                "module.generalManagerment.garage.columnTable.provinceId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.provinceId",
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
                "module.generalManagerment.garage.columnTable.districtId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.districtId",
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
            label: $t("module.generalManagerment.garage.columnTable.wardId"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.wardId",
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
            label: $t("module.generalManagerment.garage.columnTable.address"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.address",
            ),
        },
    },
    contractFromDate: {
        type: "CDSelect",
        field: "contractFromDate",
        group: "garageInfor",
        showForDetail: true,
        props: {
            options: [],
            label: $t(
                "module.generalManagerment.garage.columnTable.contractFromDate",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.contractFromDate",
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
                "module.generalManagerment.garage.columnTable.contractStatus",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.contractStatus",
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
            label: $t("module.generalManagerment.garage.columnTable.rescue"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.rescue",
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
                "module.generalManagerment.garage.columnTable.isSupportAllTime",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.isSupportAllTime",
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
                "module.generalManagerment.garage.columnTable.isVerified",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.isVerified",
            ),
        },
    },
    openTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "openTime",
        showForDetail: true,
        props: {
            options: isVerifiedOptions,
            title: $t("module.generalManagerment.garage.columnTable.openTime"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.openTime",
            ),
        },
    },
    closeTime: {
        type: "CDTimePicker",
        group: "garageInfor",
        field: "closeTime",
        showForDetail: true,
        props: {
            options: isVerifiedOptions,
            title: $t("module.generalManagerment.garage.columnTable.closeTime"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.closeTime",
            ),
        },
    },
    description: {
        type: "CDInput",
        group: "garageInfor",
        field: "description",
        showForDetail: true,
        props: {
            options: isVerifiedOptions,
            label: $t(
                "module.generalManagerment.garage.columnTable.description",
            ),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.description",
            ),
        },
    },
};

interface ContractStatus {
    id: string;
    value: string;
}
