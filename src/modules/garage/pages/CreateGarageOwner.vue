<template>
    <div>
        <div
            v-for="item in Object.keys(configCreateGarageOwner)"
            style="padding: 10px"
        >
            <p
                style="text-align: left"
                v-if="configCreateGarageOwner[item].label"
            >
                {{ configCreateGarageOwner[item].label }}:
            </p>

            <component
                :is="configCreateGarageOwner[item].type"
                style="height: 40px"
                :type="configCreateGarageOwner[item].inputType"
                :placeholder="configCreateGarageOwner[item].placeholder"
                v-model="configCreateGarageOwner[item].value"
                :multiple="configCreateGarageOwner[item].multiple"
                :options="configCreateGarageOwner[item].options"
            />
        </div>
        <v-btn
            :disabled="!enableCreateGarageOwner"
            :class="!enableCreateGarageOwner ? 'disabled-button-create' : ''"
            @click="createGarageOwner"
            >{{ $t("common.create") }}</v-btn
        >
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Input from "@widget/components/BaseComponent/Vuetify/VTextField.vue";
import Select from "@widget/components/BaseComponent/Vuetify/Select.vue";
// import { garageAPI } from "@/API/garage";

export default defineComponent({
    components: {
        Input,
        Select,
    },
    created() {
        this.getALlGarage();
    },
    watch: {
        configCreateGarageOwner: {
            deep: true,
            handler() {
                let enabledToCreate = true;
                Object.keys(this.configCreateGarageOwner).map((k: string) => {
                    if (
                        this.configCreateGarageOwner[k].hasOwnProperty(
                            "validate",
                        )
                    ) {
                        enabledToCreate =
                            enabledToCreate &&
                            this.configCreateGarageOwner[k].validate(
                                this.configCreateGarageOwner[k].value,
                            );
                    }
                });
                this.enableCreateGarageOwner = enabledToCreate;
            },
        },
    },
    methods: {
        async createGarageOwner() {
            let data = {} as any;
            Object.keys(this.configCreateGarageOwner).map((k) => {
                data[k] = this.configCreateGarageOwner[k].value;
            });
            data.garages = this.configCreateGarageOwner.garages.value.map(
                (a: any) => {
                    return {
                        id: a,
                    };
                },
            );
            data.birthday = "2017-01-13T17:09:42.411";
            let res: any = await this.$apiPackage.garage.createGarageOwner(
                data,
            );
            if (res.status == 200) {
                this.$toast(
                    this.$t("module.garageOwner.createGarageOwnerSuccess"),
                    true,
                );
                setTimeout(() => {
                    this.$router.push("/app/garage/list");
                }, 3000);
            }
        },
        async getALlGarage() {
            let res: any = await this.$apiPackage.garage.getAllGarage({
                pageSize: 10000,
                pageNumber: 1,
            });
            this.configCreateGarageOwner.garages.options = res.data.data.map(
                (a: any) => {
                    return {
                        value: a.id,
                        title: a.name,
                    };
                },
            );
        },
    },
    data() {
        return {
            enableCreateGarageOwner: false,
            configCreateGarageOwner: {
                userName: {
                    label: this.$t("common.userName"),
                    type: Input,
                    field: "userName",
                    placeholder: this.$t("common.userName"),
                    value: "",
                    validate(val: string) {
                        return val.length > 0;
                    },
                },
                password: {
                    label: this.$t("common.password"),
                    type: Input,
                    field: "password",
                    placeholder: this.$t("common.password"),
                    value: "",
                    inputType: "password",
                    validate(val: string) {
                        return val.length > 0;
                    },
                },
                name: {
                    label: this.$t("common.name"),
                    type: Input,
                    field: "name",
                    placeholder: this.$t("common.name"),
                    value: "",
                    validate(val: string) {
                        return val.length > 0;
                    },
                },
                phone: {
                    inputType: "number",
                    label: this.$t("common.phoneNumber"),
                    type: Input,
                    field: "phone",
                    placeholder: this.$t("common.phoneNumber"),
                    value: "",
                    validate(val: number) {
                        return val.toString().length > 9;
                    },
                },
                email: {
                    label: this.$t("common.email"),
                    type: Input,
                    field: "email",
                    placeholder: this.$t("common.email"),
                    value: "",
                    inputType: "email",
                    validate(val: string) {
                        const emailRegex =
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                        if (emailRegex.test(val)) {
                            return true;
                        }
                        return false;
                    },
                },
                birthday: {
                    label: this.$t("common.birthday"),
                    type: Input,
                    field: "birthday",
                    placeholder: this.$t("common.birthday"),
                    value: "",
                    inputType: "birthday",
                },
                gender: {
                    label: this.$t("common.gender"),
                    type: Select,
                    field: "gender",
                    // placeholder: this.$t("common.gender"),
                    value: "",
                    options: [
                        {
                            value: 0,
                            title: this.$t("common.male"),
                        },
                        {
                            value: 1,
                            title: this.$t("common.feMale"),
                        },
                        {
                            value: 2,
                            title: this.$t("common.other"),
                        },
                    ],
                },
                garages: {
                    multiple: true,
                    label: this.$t("common.garage"),
                    type: Select,
                    field: "gender",
                    placeholder: this.$t("common.garage"),
                    value: [],
                    options: [],
                },
            } as any,
        };
    },
});
</script>
