import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;

export const tagsConfigTemplate = {
    name: {
        type: "CDInput",
        field: "name",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageService.tags.dialog.dialogColumnTable.name",
            ),
            modelValue: "",
            placeholder: $t(
                "module.garageService.tags.dialog.dialogColumnTable.name",
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
                "module.garageService.tags.dialog.dialogColumnTable.description",
            ),
            modelValue: "",
            placeholder: $t(
                "module.garageService.tags.dialog.dialogColumnTable.description",
            ),
        },
    },
};

export const garageServiceConfigTemplate = {
    garageId: {
        field: "garageId",
        type: "CDComboBox",
        group: "parentInfor",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.garageService.garageService.validator.parentGarageIdCannotBeEmpty",
                );
            }
        },
        props: {
            isRequired: true,
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.garageId",
            ),
            modelValue: "",
            placeholder: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.garageId",
            ),
            options: [],
        },
    },
    name: {
        type: "CDInput",
        field: "name",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.name",
            ),
            modelValue: "",
            placeholder: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.name",
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
                "module.garageService.garageService.dialog.dialogColumnTable.description",
            ),
            modelValue: "",
            placeholder: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.description",
            ),
        },
    },
    price: {
        type: "CDInput",
        field: "price",
        showForDetail: true,
        props: {
            type: "number",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.price",
            ),
            modelValue: "",
            placeholder: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.price",
            ),
        },
    },
    tags: {
        type: "CDMultiselect",
        field: "tags",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.tags",
            ),
            options: [],
            modelValue: [],
            placeholder: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.tags",
            ),
        },
    },
    carSubSystems: {
        type: "CDMultiselect",
        field: "carSubSystems",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.carSubSystems",
            ),
            options: [],
            modelValue: [],
            placeholder: $t(
                "module.garageService.garageService.dialog.dialogColumnTable.carSubSystems",
            ),
        },
    },
};
