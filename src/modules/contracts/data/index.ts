import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;

export const garageDataConfigCreate = {
    contractNumber: {
        type: "CDInput",
        group: "parentInfor",
        field: "contractNumber",
        showForDetail: true,
        props: {
            label: $t(
                "module.contracts.contracts.dialogColumnTable.contractNumber",
            ),
            modelValue: "",
            placeholder: $t(
                "module.contracts.contracts.dialogColumnTable.contractNumber",
            ),
        },
    },
    garageId: {
        type: "CDInput",
        group: "parentInfor",
        field: "garageId",
        showForDetail: true,
        props: {
            label: $t("module.contracts.contracts.dialogColumnTable.garageId"),
            modelValue: "",
            placeholder: $t(
                "module.contracts.contracts.dialogColumnTable.garageId",
            ),
        },
    },
    contractFromDate: {
        type: "CDInput",
        group: "parentInfor",
        field: "garageId",
        showForDetail: true,
        props: {
            label: $t(
                "module.contracts.contracts.dialogColumnTable.contractFromDate",
            ),
            modelValue: "",
            placeholder: $t(
                "module.contracts.contracts.dialogColumnTable.contractFromDate",
            ),
        },
    },
    contractToDate: {
        type: "CDInput",
        group: "parentInfor",
        field: "garageId",
        showForDetail: true,
        props: {
            label: $t(
                "module.contracts.contracts.dialogColumnTable.contractToDate",
            ),
            modelValue: "",
            placeholder: $t(
                "module.contracts.contracts.dialogColumnTable.contractToDate",
            ),
        },
    },
};
