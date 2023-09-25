import { instanceI18n } from "@/main";
const $t = instanceI18n.global.t;

export const garageOwnerDataConfigCreate = {
    garages: {
        type: "CDMultiselect",
        group: "parentInfor",
        field: "garages",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.garageOwners.garageOwners.validator.garagesCannotBeEmpty",
                );
            }
        },
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            isRequired: true,
            label: $t(
                "module.garageOwner.garageOwner.dialogColumnTable.garages",
            ),
            modelValue: [],
            placeholder: $t(
                "module.garageOwner.garageOwner.dialogColumnTable.garages",
            ),
            options: [],
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
                    "module.garageOwner.garageOwner.validator.nameCannotBeEmpty",
                );
            }
        },
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.garageOwner.garageOwner.columnTable.name"),
            modelValue: "",
            placeholder: $t("module.garageOwner.garageOwner.columnTable.name"),
        },
    },
    username: {
        field: "username",
        type: "CDInput",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.garageOwner.garageOwner.validator.nameCannotBeEmpty",
                );
            }
        },
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.garageOwner.garageOwner.columnTable.userName"),
            modelValue: "",
            placeholder: $t(
                "module.garageOwner.garageOwner.columnTable.userName",
            ),
        },
    },
    password: {
        field: "password",
        type: "CDInput",
        showForDetail: true,
        validator: (val: string) => {
            if (val == "") {
                return $t(
                    "module.garageOwner.garageOwner.validator.nameCannotBeEmpty",
                );
            }
        },
        props: {
            type: "password",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.garageOwner.garageOwner.columnTable.password"),
            modelValue: "",
            placeholder: $t(
                "module.garageOwner.garageOwner.columnTable.password",
            ),
        },
    },
    phone: {
        field: "phone",
        type: "CDInput",
        showForDetail: true,

        props: {
            type: "number",
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.garageOwner.garageOwner.columnTable.phone"),
            modelValue: "",
            placeholder: $t("module.garageOwner.garageOwner.columnTable.phone"),
        },
    },
    email: {
        field: "email",
        type: "CDInput",
        showForDetail: true,

        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t("module.garageOwner.garageOwner.columnTable.email"),
            modelValue: "",
            placeholder: $t("module.garageOwner.garageOwner.columnTable.email"),
        },
    },
    birthday: {
        type: "CDDatePicker",
        field: "birthday",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageOwner.garageOwner.dialogColumnTable.birthday",
            ),
            modelValue: undefined,
            placeholder: $t(
                "module.garageOwner.garageOwner.dialogColumnTable.birthday",
            ),
        },
    },
    gender: {
        type: "CDSelect",
        field: "gender",
        showForDetail: true,
        props: {
            labelClass: "w-1/3",
            contentClass: "w-2/3",
            label: $t(
                "module.garageOwner.garageOwner.dialogColumnTable.birthday",
            ),
            modelValue: "",
            options: [
                {
                    id: 0,
                    value: $t("module.garageOwner.garageOwner.gender.male"),
                },
                {
                    id: 1,
                    value: $t("module.garageOwner.garageOwner.gender.feMale"),
                },
                {
                    id: 2,
                    value: $t("module.garageOwner.garageOwner.gender.other"),
                },
            ],
            placeholder: $t(
                "module.garageOwner.garageOwner.dialogColumnTable.birthday",
            ),
        },
    },
};
