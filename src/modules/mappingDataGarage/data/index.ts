import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;

export const rescuesConfigTemplate = {
    name: {
        type: "CDInput",
        field: "name",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.name",
            ),
            modelValue: "",
            placeholder: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.name",
            ),
        },
    },
    description: {
        type: "CDInput",
        field: "description",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.description",
            ),
            modelValue: "",
            placeholder: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.description",
            ),
        },
    },
};

export const subSystemConfigTemplate = {
    name: {
        type: "CDInput",
        field: "name",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.name",
            ),
            modelValue: "",
            placeholder: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.name",
            ),
        },
    },
    description: {
        type: "CDInput",
        field: "description",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.description",
            ),
            modelValue: "",
            placeholder: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.description",
            ),
        },
    },
};

export const insurancesConfigTemplate = {
    name: {
        type: "CDInput",
        field: "name",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.name",
            ),
            modelValue: "",
            placeholder: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.name",
            ),
        },
    },
    description: {
        type: "CDInput",
        field: "description",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.description",
            ),
            modelValue: "",
            placeholder: $t(
                "module.mappingDataGarage.rescues.dialog.dialogColumnTable.description",
            ),
        },
    },
};
