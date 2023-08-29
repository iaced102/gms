<template>
    <div class="sidebar-create-garage">
        <div class="header-title">
            <h2 style="color: black">{{ $t("common.garageInfo") }}</h2>
        </div>
        <div
            style="height: 82%; overflow-y: scroll"
            class="side-bar-create-garage-content"
        >
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.name"
                    :label="$t('module.garage.name')"
                    :placeholder="$t('module.garage.name')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.phone"
                    type="number"
                    :placeholder="$t('module.garage.phone')"
                    :label="$t('module.garage.phone')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.email"
                    width="100%"
                    :placeholder="$t('module.garage.email')"
                    :label="$t('module.garage.email')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.latitude"
                    type="number"
                    :placeholder="$t('module.garage.latitude')"
                    :label="$t('module.garage.latitude')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.longitude"
                    type="number"
                    :placeholder="$t('module.garage.longitude')"
                    :label="$t('module.garage.longitude')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    :enableLabel="true"
                    itemValue="value"
                    itemTitle="label"
                    v-model="configCreateData.provinceId.value"
                    :options="configCreateData.provinceId.options"
                    @update:modelValue="calculateAdressOption"
                    :placeholder="$t('module.garage.province')"
                    :label="$t('module.garage.province')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    :enableLabel="true"
                    itemValue="value"
                    itemTitle="label"
                    v-model="configCreateData.districtId.value"
                    :options="configCreateData.districtId.options"
                    @update:modelValue="calculateAdressOption"
                    :placeholder="$t('module.garage.district')"
                    :label="$t('module.garage.district')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    :enableLabel="true"
                    itemValue="value"
                    itemTitle="label"
                    v-model="configCreateData.wardId.value"
                    :options="configCreateData.wardId.options"
                    @update:modelValue="calculateAdressOption"
                    :placeholder="$t('module.garage.ward')"
                    :label="$t('module.garage.ward')"
                />
            </div>
            <div class="sidebar-create-garage-row" style="display: block">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.address"
                    width="100%"
                    :placeholder="$t('module.garage.address')"
                    :label="$t('module.garage.address')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.numEmployee"
                    type="number"
                    :placeholder="$t('module.garage.numEmployee')"
                    :label="$t('module.garage.numEmployee')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.carLift"
                    type="number"
                    :placeholder="$t('module.garage.carLift')"
                    :label="$t('module.garage.carLift')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.garageArea"
                    type="number"
                    :placeholder="$t('module.garage.garageArea')"
                    :label="$t('module.garage.garageArea')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.sosRadius"
                    type="number"
                    :placeholder="$t('module.garage.sosRadius')"
                    :label="$t('module.garage.sosRadius')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.rating"
                    type="number"
                    :placeholder="$t('module.garage.rating')"
                    :label="$t('module.garage.rating')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    :enableLabel="true"
                    v-model="configCreateData.garage.value"
                    :options="configCreateData.garage.options"
                    :needLabel="true"
                    itemValue="value"
                    itemTitle="label"
                    :placeholder="$t('module.garage.parentGarage')"
                    :label="$t('module.garage.parentGarage')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.supportSos"
                    :placeholder="$t('module.garage.supportSos')"
                    :label="$t('module.garage.supportSos')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    :enableLabel="true"
                    v-model="configCreateData.serviceRadius"
                    type="number"
                    :placeholder="$t('module.garage.serviceRadius')"
                    :label="$t('module.garage.serviceRadius')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <flat-pickr
                    class="w-full mb-[20px]"
                    v-model="configCreateData.openTime"
                    width="100%"
                    type="number"
                    :placeholder="$t('module.garage.openTime')"
                    :label="$t('module.garage.openTime')"
                    :config="{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                    }"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <flat-pickr
                    class="w-full mb-[20px]"
                    v-model="configCreateData.closeTime"
                    type="number"
                    :placeholder="$t('module.garage.closeTime')"
                    :label="$t('module.garage.closeTime')"
                    :config="{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                    }"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    :enableLabel="true"
                    v-model="configCreateData.carSubSystems.value"
                    :options="configCreateData.carSubSystems.options"
                    :needLabel="true"
                    :multiple="true"
                    itemValue="value"
                    itemTitle="label"
                    :placeholder="$t('module.garage.carSubSystems')"
                    :label="$t('module.garage.carSubSystems')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    :enableLabel="true"
                    v-model="configCreateData.rescues.value"
                    :options="configCreateData.rescues.options"
                    :multiple="true"
                    itemValue="value"
                    itemTitle="label"
                    :placeholder="$t('module.garage.rescues')"
                    :label="$t('module.garage.rescues')"
                />
            </div>
            <div class="sidebar-create-garage-row checkbox">
                <VCheckbox
                    style="width: 33%; margin-bottom: 15px"
                    v-model="configCreateData.isVerified"
                    :label="$t('module.garage.isVerified')"
                />
                <VCheckbox
                    style="width: 33%; margin-bottom: 15px"
                    v-model="configCreateData.isReceiveWebsite"
                    :label="$t('module.garage.isReceiveWebsite')"
                />
                <VCheckbox
                    style="width: 33%; margin-bottom: 15px"
                    v-model="configCreateData.isReceiveBooking"
                    :label="$t('module.garage.isReceiveBooking')"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Textinput from "@/components/Textinput/index.vue";
import Select from "@/components/Select/index.vue";
import DateTimePicker from "@/components/BaseComponent/FlatPicker/DateTimePicker.vue";
import Checkbox from "@/components/Checkbox/index.vue";
export default defineComponent({
    async created() {
        this.getAllGarage();
        this.calculateAdressOption();

        // this.readyToWatch = true;
        this.getAllSubSystem();
        this.getAllRescues();
        let garageInfo = await this.getGarageInfo();
        for (let i in this.configCreateData) {
            if (typeof this.configCreateData[i] == "object") {
                if (i == "garage") {
                    this.configCreateData.garage.value =
                        garageInfo.parentGarageId;
                } else {
                    if (Array.isArray(garageInfo[i])) {
                        this.configCreateData[i].value = garageInfo[i].map(
                            (a: any) => {
                                return a.id;
                            },
                        );
                    } else {
                        this.configCreateData[i].value = garageInfo[i];
                    }
                }
            } else {
                this.configCreateData[i] = garageInfo[i];
            }
        }
        await this.calculateAdressOption();
        this.readyToWatch = true;
    },
    components: {
        Textinput,
        Select,
        DateTimePicker,
        Checkbox,
    },
    props: {
        garageId: {
            default: "" as string,
        },
    },
    watch: {
        "configCreateData.provinceId.value"(newVal) {
            if (this.readyToWatch) {
                this.configCreateData.districtId.value = "";
                this.configCreateData.wardId.value = "";
            }
        },
        "configCreateData.districtId.value"(newVal) {
            if (this.readyToWatch) {
                this.configCreateData.wardId.value = "";
            }
        },
    },
    methods: {
        onChangeAddress() {
            this.calculateAdressOption();
        },
        async getGarageInfo() {
            let res: any = await this.$apiPackage.garage.getGarageInforById(
                this.garageId,
            );
            if (res.status == 200) {
                this.status = 1;
                return res.data.data;
            }
            this.status = 2;
            return {} as any;
        },
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
                            label: a.name,
                        };
                    },
                );
            }
        },
        action() {
            this.createGarage();
        },
        async getAllSubSystem() {
            let res: any = await this.$apiPackage.subSystem.getListSubSystem({
                pageSize: 10000,
                pageNumber: 1,
            });
            if (res.status == 200) {
                this.configCreateData.carSubSystems.options = res.data.data.map(
                    (s: any) => {
                        return {
                            value: s.id,
                            label: s.name,
                        };
                    },
                );
            }
        },
        async getAllRescues() {
            let res: any = await this.$apiPackage.rescues.getAllRescues({
                pageSize: 10000,
                pageNumber: 1,
            });
            // console
            if (res.status == 200) {
                this.configCreateData.rescues.options = res.data.data.map(
                    (r: any) => {
                        return {
                            value: r.id,
                            label: r.name,
                        };
                    },
                );
            }
        },
        async createGarage() {
            let data = {} as any;
            Object.keys(this.configCreateData).map((a: string) => {
                if (
                    this.configCreateData[a] != undefined &&
                    this.configCreateData[a] != null
                ) {
                    if (
                        typeof this.configCreateData[a] == "object" &&
                        this.configCreateData[a].hasOwnProperty("value")
                    ) {
                        if (!Array.isArray(this.configCreateData[a].value)) {
                            if (a == "garage") {
                                if (this.configCreateData[a].value == 0) {
                                    data[a] = null;
                                } else {
                                    data[a] = {
                                        id: this.configCreateData.garage.value,
                                    };
                                }
                            } else {
                                data[a] = this.configCreateData[a].value;
                            }
                        } else {
                            if (
                                this.configCreateData[a].value &&
                                this.configCreateData[a].value.length == 0
                            ) {
                                data[a] = null;
                            } else {
                                data[a] = this.configCreateData[a].value.map(
                                    (v: any) => {
                                        return {
                                            id: v,
                                        };
                                    },
                                );
                            }
                        }
                    } else {
                        data[a] = this.configCreateData[a];
                        if (typeof this.configCreateData[a] == "boolean") {
                            data[a] = this.configCreateData[a] ? 1 : 0;
                        }
                    }
                } else {
                    data[a] == "";
                    if (a == "rescues") {
                        data[a] = [];
                    }
                }
            });
            data.customFieldValueRequests = [];
            data.insurances = [];

            let res: any = await this.$apiPackage.garage.updateGarage(
                this.garageId,
                data,
            );
            if (res.status == 200) {
                // this.$evtBus.emit("garage-re-render-table");
                this.$toast(
                    this.$t("module.garage.updateGarageInfoSuccess"),
                    true,
                );
                setTimeout(() => {
                    this.$store.app.closeSidebar();
                }, 3000);
            } else {
                this.$toast(
                    this.$t("module.garage.updateGarageInfoFailse"),
                    false,
                );
            }
        },
        async calculateAdressOption() {
            let res: any = await this.$apiPackage.garage.getAddressInfo({
                provinceId:
                    this.configCreateData.provinceId.value == 0
                        ? 0
                        : this.configCreateData.provinceId.value,
                districtId:
                    this.configCreateData.districtId.value == 0
                        ? 0
                        : this.configCreateData.districtId.value,
            });
            if (this.configCreateData.provinceId.options.length == 0) {
                this.configCreateData.provinceId.options = res.province.map(
                    (a: any) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    },
                );
            } else {
                this.configCreateData.districtId.options = res.district.map(
                    (a: any) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    },
                );
                this.configCreateData.wardId.options = res.ward.map(
                    (a: any) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    },
                );
            }
        },
    },
    data() {
        return {
            readyToWatch: false,
            status: 0,
            configCreateData: {
                name: "",
                phone: "",
                email: "",
                latitude: "",
                longitude: "",
                provinceId: {
                    value: 0,
                    options: [],
                },
                districtId: {
                    value: 0,
                    options: [],
                },
                wardId: {
                    value: 0,
                    options: [],
                },
                garage: {
                    value: "",
                    options: [],
                },
                address: "",
                numEmployee: "",
                carLift: "",
                garageArea: "",
                sosRadius: "",
                rating: "",

                supportSos: "",
                serviceRadius: "",

                openTime: "",
                closeTime: "",
                carSubSystems: {
                    value: [],
                    options: [],
                },
                rescues: {
                    value: [],
                    options: [],
                },
                isVerified: false,
                isReceiveWebsite: false,
                isReceiveBooking: false,
            } as any,
        };
    },
    name: "sidebarEditGarage",
});
</script>
<style lang="scss"></style>
