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
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.name"
                    :label="$t('module.garage.name')"
                    :placeholder="$t('module.garage.name')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.phone"
                    type="number"
                    :placeholder="$t('module.garage.phone')"
                    :label="$t('module.garage.phone')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.email"
                    width="100%"
                    :placeholder="$t('module.garage.email')"
                    :label="$t('module.garage.email')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.latitude"
                    type="number"
                    :placeholder="$t('module.garage.latitude')"
                    :label="$t('module.garage.latitude')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.longitude"
                    type="number"
                    :placeholder="$t('module.garage.longitude')"
                    :label="$t('module.garage.longitude')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    class="w-full"
                    classInput="w-full bg-white rounded border"
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
                    class="w-full"
                    classInput="w-full bg-white rounded border"
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
                    class="w-full"
                    classInput="w-full bg-white rounded border"
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
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.address"
                    width="100%"
                    :placeholder="$t('module.garage.address')"
                    :label="$t('module.garage.address')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.numEmployee"
                    type="number"
                    :placeholder="$t('module.garage.numEmployee')"
                    :label="$t('module.garage.numEmployee')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.carLift"
                    type="number"
                    :placeholder="$t('module.garage.carLift')"
                    :label="$t('module.garage.carLift')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.garageArea"
                    type="number"
                    :placeholder="$t('module.garage.garageArea')"
                    :label="$t('module.garage.garageArea')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.sosRadius"
                    type="number"
                    :placeholder="$t('module.garage.sosRadius')"
                    :label="$t('module.garage.sosRadius')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.rating"
                    type="number"
                    :placeholder="$t('module.garage.rating')"
                    :label="$t('module.garage.rating')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Select
                    class="w-full"
                    classInput="w-full bg-white rounded border"
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
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.supportSos"
                    :placeholder="$t('module.garage.supportSos')"
                    :label="$t('module.garage.supportSos')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <Textinput
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    :enableLabel="true"
                    v-model="configCreateData.serviceRadius"
                    type="number"
                    :placeholder="$t('module.garage.serviceRadius')"
                    :label="$t('module.garage.serviceRadius')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <flat-pickr
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
                    class="w-full mb-[20px]"
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
                <VueSelect
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    v-model="configCreateData.carSubSystems.value"
                    :multiple="true"
                    :options="configCreateData.carSubSystems.options"
                    :placeholder="$t('module.garage.carSubSystems')"
                    :label="$t('module.garage.carSubSystems')"
                />
            </div>
            <div class="sidebar-create-garage-row h-13">
                <VueSelect
                    class="w-full"
                    classInput="w-full bg-white rounded border"
                    v-model="configCreateData.rescues.value"
                    :options="configCreateData.rescues.options"
                    :multiple="true"
                    :placeholder="$t('module.garage.rescues')"
                    :label="$t('module.garage.rescues')"
                />
            </div>
            <div class="sidebar-create-garage-row checkbox">
                <Checkbox
                    style="width: 33%; margin-bottom: 15px"
                    v-model="configCreateData.isVerified"
                    :label="$t('module.garage.isVerified')"
                />
                <Checkbox
                    style="width: 33%; margin-bottom: 15px"
                    v-model="configCreateData.isReceiveWebsite"
                    :label="$t('module.garage.isReceiveWebsite')"
                />
                <Checkbox
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
import { useGarageStore } from "../store/index";
import VueSelect from "@/components/Select/VueSelect.vue";
const garageStore = useGarageStore() as any;
export default defineComponent({
    created() {
        this.getAllGarage();
        this.calculateAdressOption();
        this.getAllSubSystem();
        this.getAllRescues();
    },
    components: {
        Textinput,
        Select,
        DateTimePicker,
        Checkbox,
        VueSelect,
    },
    watch: {
        "configCreateData.provinceId.value"(newVal) {
            this.configCreateData.districtId.value = "";
            this.configCreateData.wardId.value = "";
        },
        "configCreateData.districtId.value"(newVal) {
            this.configCreateData.wardId.value = "";
        },
    },
    methods: {
        async getAllGarage() {
            let res: any = await garageStore.getAllGarage({
                pageSize: 10000,
                pageNumber: 1,
                isGarageGroup: 1,
            });
            console.log(res);
            this.configCreateData.garage.options = res.data.map((a: any) => {
                return {
                    value: a.id,
                    label: a.name,
                };
            });
        },
        action() {
            this.createGarage();
        },
        async getAllSubSystem() {
            let res: any = await garageStore.getListSubSystem({
                pageSize: 10000,
                pageNumber: 1,
            });
            this.configCreateData.carSubSystems.options = res.data
                .filter((a: any) => a.status == 1)
                .map((s: any) => {
                    return {
                        value: s.id,
                        label: s.name,
                    };
                });
        },
        async getAllRescues() {
            let res: any = await garageStore.getAllRescues({
                pageSize: 10000,
                pageNumber: 1,
            });
            this.configCreateData.rescues.options = res.data.map((r: any) => {
                return {
                    value: r.id,
                    label: r.name,
                };
            });
        },
        async createGarage() {
            let data = {} as any;
            Object.keys(this.configCreateData).map((a: string) => {
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
                        data[a] = this.configCreateData[a].value.map(
                            (v: any) => {
                                return {
                                    id: v,
                                };
                            },
                        );
                        // }
                    }
                } else {
                    data[a] = this.configCreateData[a];
                    if (typeof this.configCreateData[a] == "boolean") {
                        data[a] = this.configCreateData[a] ? 1 : 0;
                    }
                }
            });
            data.insurances = [];

            let res: any = await garageStore.createGarage(data);
            console.log;
            this.$evtBus.emit("garage-re-render-table");
            this.$toast(this.$t("module.garage.createGarageSuccess"), true);
            setTimeout(() => {
                this.$store.app.closeSidebar();
            }, 3000);
            // } else {
            //     this.$toast(this.$t("module.garage.createGarageFailse"), false);
            // }
        },
        async calculateAdressOption() {
            let res: any = await garageStore.getAddressInfo({
                provinceId:
                    this.configCreateData.provinceId.value == ""
                        ? 0
                        : this.configCreateData.provinceId.value,
                districtId:
                    this.configCreateData.districtId.value == ""
                        ? 0
                        : this.configCreateData.districtId.value,
            });
            if (this.configCreateData.provinceId.value == "") {
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
            configCreateData: {
                name: "",
                phone: "",
                email: "",
                latitude: "",
                longitude: "",
                provinceId: {
                    value: "",
                    options: [],
                },
                districtId: {
                    value: "",
                    options: [],
                },
                wardId: {
                    value: "",
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
    name: "sidebarCreateGarage",
});
</script>
<style lang="scss" scoped>
// .sidebar-create-garage {
//     scrollbar-width: none;
//     -ms-overflow-style: none;
// }
</style>
