<template>
    <div>
        <h3>Thông tin garage</h3>
        <div
            style="
                display: grid;
                grid-template-columns: auto auto auto;
                width: 100%;
                height: auto;
            "
        >
            <div
                v-for="item in Object.keys(configCreateData)"
                style="padding: 10px"
            >
                <p style="text-align: left" v-if="configCreateData[item].label">
                    {{ configCreateData[item].label }}:
                </p>

                <component
                    v-if="configCreateData[item].hasOwnProperty('change')"
                    :is="configCreateData[item].type"
                    style="height: 40px"
                    :placeholder="configCreateData[item].placeholder"
                    v-model="configCreateData[item].value"
                    @update:modelValue="configCreateData[item].change"
                    :config="configCreateData[item].config"
                    :isMask="configCreateData[item].isMask"
                    :options="configCreateData[item].options"
                    :prepend="configCreateData[item].prepend"
                />
                <component
                    v-else
                    :is="configCreateData[item].type"
                    style="height: 40px"
                    :placeholder="configCreateData[item].placeholder"
                    v-model="configCreateData[item].value"
                    :isMask="configCreateData[item].isMask"
                    :label="configCreateData[item].labelInside"
                    :config="configCreateData[item].config"
                    :options="configCreateData[item].options"
                    :multiple="configCreateData[item].multiple"
                    :prepend="configCreateData[item].prepend"
                />
            </div>
        </div>
        <Button
            :disabled="!enableCreateGarage"
            :class="!enableCreateGarage ? 'disabled-button-create' : ''"
            text="Tạo mới"
            btnClass="btn-primary "
            @click="createGarage"
        />
    </div>
</template>
<script lang="ts">
// import { garageAPI } from "@/API/garage";
// import { subSystem } from "@/API/subSystem";
import { defineComponent } from "vue";
import Button from "@widget/components/Button/index.vue";
import Input from "@widget/components/InputGroup/index.vue";
import FlatPickr from "@widget/components/FlatPickr/index.vue";
import Select from "@widget/components/Select/index.vue";
import VSelect from "vue-select";
import vCheckbox from "@widget/components/BaseComponent/Vuetify/VCheckbox.vue";

export default defineComponent({
    components: {
        vCheckbox,
        Input,
        Button,
        Select,
        FlatPickr,
        VSelect,
    },
    watch: {
        configCreateData: {
            deep: true,
            handler() {
                let enabledToCreate = true;
                Object.keys(this.configCreateData).map((k: string) => {
                    if (this.configCreateData[k].hasOwnProperty("validate")) {
                        enabledToCreate =
                            enabledToCreate &&
                            this.configCreateData[k].validate(
                                this.configCreateData[k].value
                            );
                    }
                });
                this.enableCreateGarage = enabledToCreate;
            },
        },
    },
    created() {
        this.calculateAdressOption();
        this.getAllSubSystem();
        this.getAllRescues();
        this.getAllGarage();
    },
    methods: {
        async getAllGarage() {
            let res: any = await this.$apiPackage.garage.getAllGarage({
                pageSize: 10000,
                pageNumber: 1,
                isGarageGroup: 1,
            });
            if (res.status == 200) {
                this.configCreateData.garage.options = res.data.data.map(
                    (a: any) => {
                        return {
                            value: a.id,
                            title: a.name,
                        };
                    }
                );
            }
        },
        async createGarage() {
            let data = {} as any;
            Object.keys(this.configCreateData).map((k) => {
                data[k] = this.configCreateData[k].value;
                if (this.configCreateData[k].valueType == "number") {
                    data[k] = this.configCreateData[k].value.replaceAll(
                        ",",
                        ""
                    );
                }
                if (this.configCreateData[k].valueType == "boolean") {
                    data[k] = this.configCreateData[k].value ? 1 : 0;
                }
            });

            data.rescues = this.configCreateData.rescues.value.map((a: any) => {
                return {
                    id: a,
                };
            });
            data.garage = {
                id: this.configCreateData.garage.value,
            };
            data.carSubSystems = this.configCreateData.carSubSystems.value.map(
                (a: any) => {
                    return {
                        id: a,
                    };
                }
            );
            let res: any = await this.$apiPackage.garage.createGarage(data);
            if (res.status == 200) {
                this.$toast(this.$t("module.garage.createGarageSuccess"), true);
                setTimeout(() => {
                    this.$router.push("/app/garage/list");
                }, 3000);
            } else {
                this.$toast(this.$t("module.garage.createGarageFailse"), false);
            }
        },
        async getAllSubSystem() {
            let res: any = await this.$apiPackage.subSystem.getListSubSystem({
                pageSize: 10000,
                pageNumber: 1,
                status: 1,
            });
            if (res.status == 200) {
                this.configCreateData.carSubSystems.options =
                    res.data.data.data.map((s: any) => {
                        return {
                            value: s.id,
                            title: s.name,
                        };
                    });
            }
        },
        async getAllRescues() {
            let res: any = await this.$apiPackage.garage.getRescues();
            // console
            if (res.status == 200) {
                this.configCreateData.rescues.options = res.data.data.data.map(
                    (r: any) => {
                        return {
                            value: r.id,
                            title: r.name,
                        };
                    }
                );
            }
        },
        async calculateAdressOption() {
            let res: any = await this.$apiPackage.garage.getAddressInfo({
                provinceId: parseInt(
                    this.configCreateData.provinceId.value == ""
                        ? 0
                        : this.configCreateData.provinceId.value
                ),
                districtId: parseInt(
                    this.configCreateData.districtId.value == ""
                        ? 0
                        : this.configCreateData.districtId.value
                ),
            });
            if (this.configCreateData.provinceId.value == "") {
                this.configCreateData.provinceId.options = res.province.map(
                    (a: any) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    }
                );
            } else {
                this.configCreateData.districtId.options = res.district.map(
                    (a: any) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    }
                );
                this.configCreateData.wardId.options = res.ward.map(
                    (a: any) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    }
                );
            }
        },
    },
    data() {
        let self = this as any;
        return {
            enableCreateGarage: false,
            address: {
                provinceId: {
                    options: [],
                    value: NaN as number,
                },
                districtId: {
                    options: [],
                    value: NaN as number,
                },
                wardId: {
                    options: [],
                    value: NaN as number,
                },
            } as any,
            listProvince: [],
            listDistrict: [],
            listward: [],
            provinceId: NaN as number,
            districtId: NaN as number,
            wardId: NaN as number,
            configCreateData: {
                name: {
                    type: Input,
                    value: "",
                    field: "name",
                    label: "Tên garage",
                    isMask: false,
                    validate(val: string) {
                        return val.length > 0;
                    },
                    placeholder: "Tên garage",
                },
                phone: {
                    type: Input,
                    value: "",
                    valueType: "number",
                    isMask: true,
                    options: {
                        numeral: true,
                        stripLeadingZeroes: false,
                        // blocks: [3, 3, 3],
                        delimiter: "",
                    },
                    validate(val: number) {
                        return val.toString().length > 9;
                    },
                    placeholder: this.$t("common.phoneNumber"),
                    field: "phone",
                    label: this.$t("common.phoneNumber"),
                },
                email: {
                    type: Input,
                    validate(val: string) {
                        const emailRegex =
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                        if (emailRegex.test(val)) {
                            return true;
                        }
                        return false;
                    },
                    value: "",
                    field: "email",
                    label: "Email",
                    prepend: "@example.com",
                    placeholder: "email",
                },
                latitude: {
                    type: Input,
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                        numeralDecimalScale: "100",
                    },
                    validate(val: number) {
                        return val > 0;
                    },
                    valueType: "number",
                    isMask: true,
                    value: "",
                    field: "latitude",
                    placeholder: this.$t("common.latitude"),
                    label: this.$t("common.latitude"),
                },
                longitude: {
                    type: Input,
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                        numeralDecimalScale: "100",
                    },
                    validate(val: number) {
                        return val > 0;
                    },
                    valueType: "number",
                    isMask: true,
                    value: "",
                    field: "longitude",
                    placeholder: this.$t("common.longitude"),
                    label: this.$t("common.longitude"),
                },
                provinceId: {
                    type: Select,
                    value: "",
                    field: "provinceId",
                    placeholder: this.$t("common.province"),
                    label: this.$t("common.province"),
                    change: (a: any) => {
                        self.configCreateData!.districtId.value = "";

                        this.calculateAdressOption();
                    },
                    validate(val: string) {
                        return val != "";
                    },
                    options: [],
                },
                districtId: {
                    type: Select,
                    value: "",
                    change: (a: any) => {
                        self.configCreateData!.wardId.value = "";
                        this.calculateAdressOption();
                    },
                    validate(val: string) {
                        return val != "";
                    },
                    field: "districtId",
                    placeholder: this.$t("common.district"),
                    label: this.$t("common.district"),
                    options: [],
                },
                wardId: {
                    type: Select,
                    value: "",
                    field: "wardId",
                    placeholder: this.$t("common.ward"),
                    label: this.$t("common.ward"),
                    options: [],
                    validate(val: string) {
                        return val != "";
                    },
                },
                garage: {
                    type: VSelect,
                    value: "",
                    options: [],
                    field: "garage",
                    label: this.$t("common.parentGarage"),
                    placeholder: this.$t("common.parentGarage"),
                },
                address: {
                    type: Input,
                    validate(val: string) {
                        return val != "";
                    },
                    value: "",
                    field: "address",
                    placeholder: this.$t("common.address"),
                    label: this.$t("common.address"),
                },
                numEmployee: {
                    type: Input,
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                    },
                    validate(val: number) {
                        return val > 0;
                    },
                    valueType: "number",
                    isMask: true,
                    value: "",
                    field: "numEmployee",
                    placeholder: "Lượng nhân viên",
                    label: "Lượng nhân viên",
                },
                carLift: {
                    type: Input,
                    value: "",
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                    },
                    valueType: "number",
                    isMask: true,
                    field: "carLift",
                    placeholder: this.$t("common.carLift"),
                    label: this.$t("common.carLift"),
                },
                garageArea: {
                    type: Input,
                    value: "",
                    options: {
                        numeral: true,
                    },
                    valueType: "number",
                    isMask: true,
                    validate(val: number) {
                        return val > 0;
                    },
                    field: "garageArea",
                    placeholder: this.$t("common.garageArea"),
                    label: this.$t("common.garageArea"),
                },
                supportSos: {
                    type: Input,
                    value: "",
                    field: "supportSos",
                    placeholder: this.$t("common.supportSos"),
                    label: this.$t("common.supportSos"),
                },
                serviceRadius: {
                    type: Input,
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                    },
                    valueType: "number",
                    isMask: true,
                    value: "",
                    field: "serviceRadius",
                    placeholder: this.$t("common.serviceRadius"),
                    label: this.$t("common.serviceRadius"),
                },
                sosRadius: {
                    type: Input,
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                    },
                    valueType: "number",
                    isMask: true,
                    value: "",
                    field: "sosRadius",
                    placeholder: this.$t("common.sosRadius"),
                    label: this.$t("common.sosRadius"),
                },
                openTime: {
                    type: FlatPickr,
                    value: "",
                    field: "openTime",
                    placeholder: this.$t("common.openTime"),
                    config: {
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                    },
                    label: this.$t("common.openTime"),
                },
                closeTime: {
                    type: FlatPickr,
                    value: "",
                    field: "closeTime",
                    placeholder: this.$t("common.closeTime"),
                    config: {
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                    },
                    label: this.$t("common.closeTime"),
                },
                rating: {
                    type: Input,
                    value: "",
                    options: {
                        numeral: true,
                        numeralDecimalMark: "",
                    },
                    valueType: "number",
                    isMask: true,
                    field: "rating",
                    validate(val: number) {
                        return val > 0;
                    },
                    placeholder: this.$t("common.rating"),
                    label: this.$t("common.rating"),
                },
                carSubSystems: {
                    // type: Input,
                    value: [],
                    type: VSelect,
                    options: [],
                    field: "carSubSystems",
                    multiple: true,
                    placeholder: this.$t("common.carSubSystems"),
                    label: this.$t("common.carSubSystems"),
                },
                rescues: {
                    // type: Input,
                    value: [],
                    type: VSelect,
                    options: [],
                    field: "rescues",
                    multiple: true,
                    placeholder: this.$t("common.rescues"),
                    label: this.$t("common.rescues"),
                },
                isVerified: {
                    type: vCheckbox,
                    valueType: "boolean",
                    value: false,
                    field: "isVerified",
                    placeholder: this.$t("common.isVerified"),
                    labelInside: this.$t("common.isVerified"),
                },
                isReceiveWebsite: {
                    type: vCheckbox,
                    valueType: "boolean",
                    value: false,
                    field: "isReceiveWebsite",
                    placeholder: this.$t("common.isReceiveWebsite"),
                    labelInside: this.$t("common.isReceiveWebsite"),
                },
                isReceiveBooking: {
                    type: vCheckbox,
                    valueType: "boolean",
                    value: false,
                    field: "isReceiveBooking",
                    placeholder: this.$t("common.isReceiveBooking"),
                    labelInside: this.$t("common.isReceiveBooking"),
                },
            } as any,
        };
    },
});
</script>
<style lang="scss">
.flatpickr-input {
    background: white;
}
.input-group-control {
}
.disabled-button-create {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>
