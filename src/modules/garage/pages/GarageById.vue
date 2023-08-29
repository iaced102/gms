<template>
    <div class="space-y-5 profile-page">
        <div
            class="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]"
        >
            <div
                class="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"
            ></div>
            <div class="profile-box flex-none md:text-start text-center">
                <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                    <div class="flex-none">
                        <div
                            class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative"
                        >
                            <img
                                src="@/assets/images/logo/cardoctor.png"
                                alt=""
                                class="w-full h-full object-cover rounded-full"
                            />
                            <router-link
                                to="/app/profile-setting"
                                class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                                ><Icon icon="heroicons:pencil-square" />
                            </router-link>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div
                            class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"
                        >
                            {{ garageInfo.name }}
                        </div>
                        <div
                            class="text-sm font-light text-slate-600 dark:text-slate-400"
                        >
                            {{ garageInfo.address }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- end profile box -->
            <div
                class="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4"
            >
                <div class="flex-1">
                    <div
                        class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
                    >
                        {{ $t("common.province") }}
                    </div>
                    <div
                        class="text-sm text-slate-600 font-light dark:text-slate-300"
                    >
                        {{ provinceName }}
                    </div>
                </div>
                <div class="flex-1">
                    <div
                        class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
                    >
                        {{ $t("common.district") }}
                    </div>
                    <div
                        class="text-sm text-slate-600 font-light dark:text-slate-300"
                    >
                        {{ districtName }}
                    </div>
                </div>
                <div class="flex-1">
                    <div
                        class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
                    >
                        {{ $t("common.ward") }}
                    </div>
                    <div
                        class="text-sm text-slate-600 font-light dark:text-slate-300"
                    >
                        {{ wardName }}
                    </div>
                </div>
            </div>
            <!-- profile info-500 -->
        </div>
        <div class="grid grid-cols-12 gap-6">
            <div class="lg:col-span-4 col-span-12">
                <Card title="Info">
                    <ul class="list space-y-8">
                        <li class="flex space-x-3 rtl:space-x-reverse">
                            <div
                                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
                            >
                                <Icon icon="heroicons:envelope" />
                            </div>
                            <div class="flex-1">
                                <div
                                    class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                                >
                                    EMAIL
                                </div>
                                <a
                                    href="mailto:someone@example.com"
                                    class="text-base text-slate-600 dark:text-slate-50"
                                >
                                    {{ garageInfo.email }}
                                </a>
                            </div>
                        </li>
                        <!-- end single list -->
                        <li class="flex space-x-3 rtl:space-x-reverse">
                            <div
                                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
                            >
                                <Icon icon="heroicons:phone-arrow-up-right" />
                            </div>
                            <div class="flex-1">
                                <div
                                    class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                                >
                                    PHONE
                                </div>
                                <a
                                    href="tel:0189749676767"
                                    class="text-base text-slate-600 dark:text-slate-50"
                                >
                                    {{ garageInfo.phone }}
                                </a>
                            </div>
                        </li>
                        <!-- end single list -->
                        <li class="flex space-x-3 rtl:space-x-reverse">
                            <div
                                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
                            >
                                <Icon icon="heroicons:map" />
                            </div>
                            <div class="flex-1">
                                <div
                                    class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                                >
                                    LOCATION
                                </div>
                                <div
                                    class="text-base text-slate-600 dark:text-slate-50"
                                >
                                    {{ garageInfo.address }}
                                </div>
                            </div>
                        </li>
                        <li class="flex space-x-3 rtl:space-x-reverse">
                            <div
                                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
                            >
                                <Icon icon="heroicons:clock" />
                            </div>
                            <div class="flex-1">
                                <div
                                    class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                                >
                                    TIME
                                </div>
                                <div
                                    class="text-base text-slate-600 dark:text-slate-50"
                                >
                                    {{ garageInfo.openTime }} -
                                    {{ garageInfo.closeTime }}
                                </div>
                            </div>
                        </li>
                        <!-- end single list -->
                    </ul>
                </Card>
            </div>
            <div class="lg:col-span-8 col-span-12">
                <Card :title="$t('common.subSystem')">
                    <div style="min-height: 250px">
                        <div
                            v-for="sub in garageInfo.carSubSystems"
                            class="sub-system-card"
                        >
                            <Card>
                                <p>
                                    {{ $t("common.name") }}:<span>{{
                                        sub.name
                                    }}</span>
                                </p>
                                <p>
                                    {{ $t("common.descriptions") }}:<span>{{
                                        sub.description
                                    }}</span>
                                </p>
                                <!-- <p>{{ $t('common.name') }}:{{ sub.name }}</p> -->
                            </Card>
                        </div>
                    </div>
                    <!-- <apexchart
            type="area"
            height="250"
            :options="
              $store.state.themeSettings.isDark
                ? basicAreaDark.chartOptions
                : basicArea.chartOptions
            "
            :series="basicArea.series"
          /> -->
                </Card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// import { data } from 'autoprefixer';
import Card from "@widget/components/Card/index.vue";
import Icon from "@widget/components/Icon/index.vue";
import { defineComponent } from "vue";
// import { garageAPI } from "@/API/garage";

export default defineComponent({
    async created() {
        this.garageId = this.$route.params.id.toString();
        let res = await this.getGarageInfo();
        this.garageInfo = res;
        if (this.status == 1) {
            this.getAddressDetail();
        }
        let self = this;
        this.$store.app.changeHeaderActions({
            title: "editGarage",
            actions: () => {
                self.$store.app.changeFunctionSidebar({
                    actionName: "editGarage",
                    props: { garageId: self.garageId },
                    componentName: "sidebarEditGarage",
                });
            },
        });
    },
    methods: {
        async getAddressDetail() {
            let res = await this.$apiPackage.garage.getAddressDetail({
                provinceId: this.garageInfo.provinceId,
                districtId: this.garageInfo.districtId,
                wardId: this.garageInfo.wardId,
            });
            this.provinceName = res.province;
            this.districtName = res.district;
            this.wardName = res.ward;
            return res;
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
    },
    components: {
        Card,
        Icon,
    },
    data() {
        return {
            provinceName: "" as string,
            districtName: "" as string,
            wardName: "" as string,
            garageId: "" as string,
            garageInfo: {} as any,
            status: 0 as number,
        };
    },
});
</script>
<style lang="scss">
.sub-system-card {
    margin-top: 10px;
    .card-text {
        p {
            width: 100%;
            justify-content: space-between;
            display: flex;
            span {
                width: 75%;
                text-align: left;
            }
        }
    }
}
</style>
