import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;

export const contractDataConfigCreate = {
    contractNumber: {
        type: "CDInput",
        group: "parentInfor",
        field: "contractNumber",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
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
        type: "CDComboBox",
        group: "parentInfor",
        field: "garageId",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.generalManagerment.garage.validator.parentGarageIdCannotBeEmpty",
                );
            }
        },
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            isRequired: true,
            label: $t("module.contracts.contracts.dialogColumnTable.garageId"),
            modelValue: "",
            placeholder: $t(
                "module.contracts.contracts.dialogColumnTable.garageId",
            ),
            options: [],
        },
    },
    contractFromDate: {
        type: "CDDatePicker",
        group: "parentInfor",
        field: "contractFromDate",
        showForDetail: true,
        props: {
            formatter: "YYYY-MM-DD",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
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
        type: "CDDatePicker",
        group: "parentInfor",
        field: "contractToDate",
        showForDetail: true,
        props: {
            formatter: "YYYY-MM-DD",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
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
