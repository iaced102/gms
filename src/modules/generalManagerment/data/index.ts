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
        type: "CDInput",
        group: "parentInfor",
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
        type: "CDInput",
        group: "parentInfor",
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
        type: "CDInput",
        group: "parentInfor",
        props: {
            label: $t("module.generalManagerment.garage.columnTable.mail"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.mail",
            ),
        },
    },
    images: {
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
        type: "CDInput",
        props: {
            label: $t("module.generalManagerment.garage.columnTable.name"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.name",
            ),
        },
    },
    contactPointName: {
        type: "CDInput",
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
        type: "CDInput",
        props: {
            label: $t("module.generalManagerment.garage.columnTable.latitude"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.latitude",
            ),
        },
    },
    longitude: {
        type: "CDInput",
        props: {
            label: $t("module.generalManagerment.garage.columnTable.longitude"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.longitude",
            ),
        },
    },
    provinceId: {
        type: "CDSelect",
        props: {
            options: [],
            label: $t("module.generalManagerment.garage.columnTable.longitude"),
            modelValue: "",
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.longitude",
            ),
        },
    },
    districtId: {
        type: "CDSelect",
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
        type: "CDInput",
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
        type: "CDDropdown",
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
        type: "CDDropdown",
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
        type: "CDDropdown",
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
        type: "CDDropdown",
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
        props: {
            options: isVerifiedOptions,
            label: $t("module.generalManagerment.garage.columnTable.openTime"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.openTime",
            ),
        },
    },
    closeTime: {
        type: "CDTimePicker",
        props: {
            options: isVerifiedOptions,
            label: $t("module.generalManagerment.garage.columnTable.closeTime"),
            modelValue: "",
            disabled: true,
            placeholder: $t(
                "module.generalManagerment.garage.columnTable.closeTime",
            ),
        },
    },
};

interface ContractStatus {
    id: string;
    value: string;
}
