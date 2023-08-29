<template>
    <div class="sidebar-create-garage">
        <div class="header-title">
            <h2 style="color: black">{{ $t("common.garageOwner") }}</h2>
        </div>
        <div class="side-bar-create-garage-content">
            <div style="height: 82%; padding: ">
                <div class="sidebar-create-garage-row">
                    <Input
                        style="width: 100%"
                        v-model="configCreateGarageOwner.userName"
                        :label="$t('common.userName')"
                        :placeholder="$t('common.userName')"
                        width="100%"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Input
                        type="password"
                        style="width: 100%"
                        v-model="configCreateGarageOwner.password"
                        :label="$t('common.password')"
                        :placeholder="$t('common.password')"
                        width="100%"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Input
                        style="width: 100%"
                        v-model="configCreateGarageOwner.name"
                        :label="$t('common.name')"
                        :placeholder="$t('common.name')"
                        width="100%"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Input
                        style="width: 100%"
                        type="number"
                        v-model="configCreateGarageOwner.phone"
                        :label="$t('common.phoneNumber')"
                        :placeholder="$t('common.phoneNumber')"
                        width="100%"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Input
                        style="width: 100%"
                        v-model="configCreateGarageOwner.email"
                        :label="$t('common.email')"
                        :placeholder="$t('common.email')"
                        width="100%"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Input
                        style="width: 100%"
                        v-model="configCreateGarageOwner.birthDay"
                        :label="$t('common.birthday')"
                        :placeholder="$t('common.birthday')"
                        width="100%"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Select
                        style="width: 100%; margin-bottom: 15px"
                        v-model="configCreateGarageOwner.gender.value"
                        width="100%"
                        :options="configCreateGarageOwner.gender.options"
                        :needLabel="true"
                        :placeholder="$t('common.gender')"
                        :label="$t('common.gender')"
                    />
                </div>
                <div class="sidebar-create-garage-row">
                    <Select
                        style="width: 100%; margin-bottom: 15px"
                        v-model="configCreateGarageOwner.garages.value"
                        width="100%"
                        :options="configCreateGarageOwner.garages.options"
                        :needLabel="true"
                        :multiple="true"
                        :placeholder="$t('common.garage')"
                        :label="$t('common.garage')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@widget/components/BaseComponent/Vuetify/VTextField.vue";
import Select from "@widget/components/BaseComponent/Vuetify/Select.vue";
export default defineComponent({
    components: {
        Input,
        Select,
    },
    created() {
        this.getALlGarage();
    },
    methods: {
        action() {
            this.createGarageOwner();
        },
        async createGarageOwner() {
            let data = {} as any;
            Object.keys(this.configCreateGarageOwner).map((a: string) => {
                data[a] = this.configCreateGarageOwner[a];
                if (typeof this.configCreateGarageOwner[a] == "boolean") {
                    data[a] = this.configCreateGarageOwner[a] ? 1 : 0;
                }
            });
            data.gender = this.configCreateGarageOwner.gender.value;
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
                    this.$store.app.closeSidebar();
                }, 1000);
            } else {
                this.$toast(
                    this.$t("module.garageOwner.createGarageFailed"),
                    false,
                );
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
                        label: a.name,
                    };
                },
            );
        },
    },
    props: {
        garageId: {
            default: "" as string,
        },
    },
    data() {
        return {
            configCreateGarageOwner: {
                userName: "",
                password: "",
                name: "",
                phone: "",
                email: "",
                birthDay: "",
                gender: {
                    value: "",
                    options: [
                        {
                            value: 0,
                            label: this.$t("common.male"),
                        },
                        {
                            value: 1,
                            label: this.$t("common.feMale"),
                        },
                        {
                            value: 2,
                            label: this.$t("common.other"),
                        },
                    ],
                },
                garages: {
                    value: [],
                    options: [],
                },
            } as any,
        };
    },
});
</script>
