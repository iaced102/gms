<template>
    <div style="height: 100%">
        <div style="height: 750px; width: 100%">
            <TableBase
                height="600px"
                :rowData="rowData"
                :columns="columnDefs"
                :tableName="$t('module.garage.listGarage')"
                :paginationConfig="paginationConfig"
                @pageChange="pageChange"
                :actions="contextMenuItem"
                @filter="filter"
                :multipleAction="multipleAction"
            />
        </div>
    </div>
</template>
<script lang="ts">
import TableBase from "@/views/table/advanced/Advanced.vue";
import Pagination from "@/components/Pagination/index.vue";
import { defineComponent } from "vue";
import { useGarageStore } from "../store/index";
const garageStore = useGarageStore();

const defaultDisplayColumnOptions = [
    "id",
    "name",
    "phone",
    "address",
    "status",
    "actions",
];
export default defineComponent({
    components: {
        Pagination,
        TableBase,
    },
    async created() {
        this.$evtBus.on("garage-re-render-table", () => {
            self.getDataForListAllGarage({});
        });
        let self = this;
        this.$store.app.changeHeaderActions({
            title: "createGarage",
            actions: () => {
                self.$store.app.changeFunctionSidebar({
                    actionName: "createGarage",
                    props: {},
                    componentName: "sidebarCreateGarage",
                });
            },
        });

        let res = await this.getDataForListAllGarage({});
        if (res.status == 200) {
            this.paginationConfig.current = 1;
            this.paginationConfig.total = res.data.totalElement;
            this.paginationConfig.perPage = this.paginationConfig.pageSize;
        }
    },
    methods: {
        filter(config: any) {
            this.paginationConfig.current = 1;
            this.getDataForListAllGarage(config);
        },
        async getDataForListAllGarage(config: any) {
            if (!config) {
                config = {};
            }
            this.agReady = false;
            let res: any = await garageStore.getAllGarage({
                pageSize: this.paginationConfig.pageSize,
                pageNumber: this.paginationConfig.current,
                ...config,
            });

            let self = this;
            // if (res.status == 200) {
            this.rowData = res.data;
            this.paginationConfig.total = res.data.totalElement;
            this.columnDefs = Object.keys(res.data[0])
                .filter(
                    (a: any) => defaultDisplayColumnOptions.indexOf(a) != -1,
                )
                .map((a) => {
                    let column = {
                        field: a,
                        label: self.$t("module.garage." + a),
                    } as any;
                    return column;
                });
            this.columnDefs.push({
                label: self.$t("module.garage.action"),
                field: "action",
            });

            return res;
        },
        pageChange(data: any) {
            if (data.pageSize != this.paginationConfig.pageSize) {
                this.paginationConfig.current = 1;
            } else {
                this.paginationConfig.current = data.page;
            }

            this.paginationConfig.pageSize = data.pageSize;
            // this.paginationConfig.perPage = this.paginationConfig.pageSize;
            this.getDataForListAllGarage({});
        },
    },
    data() {
        let self = this;
        return {
            multipleAction: [
                {
                    prependIcon: "mdi-check",
                    name: self.$t("tableBase.accept"),
                    action: async (params: any) => {
                        let data = [] as any[];
                        params.map((a: any) => {
                            data.push(a.id);
                        });
                        let res = await acceptGarages(data);
                        if (res.status == 200) {
                            self.$toast(
                                self.$t("module.garage.accepted"),
                                true,
                            );
                            self.getDataForListAllGarage();
                        }
                    },
                },
                {
                    prependIcon: "mdi-window-close",
                    name: self.$t("tableBase.reject"),
                    action: async (params: any) => {
                        let data = [] as any[];
                        params.map((a: any) => {
                            data.push(a.id);
                        });
                        let res = await rejectGarage(data);
                        if (res.status == 200) {
                            self.$toast(
                                self.$t("module.garage.rejected"),
                                true,
                            );
                            self.getDataForListAllGarage();
                        }
                    },
                },
            ],
            agReady: false,
            contextMenuItem: [
                {
                    icon: "mdi-check",
                    name: self.$t("tableBase.accept"),
                    actions: async (params: any) => {
                        let garageId = params.row.id;
                        let data = [garageId] as any[];
                        let res = await acceptGarages(data);
                        if (res.status == 200) {
                            self.$toast(
                                self.$t("module.garage.accepted"),
                                true,
                            );
                            self.getDataForListAllGarage();
                        }
                    },
                },
                {
                    icon: "mdi-window-close",
                    name: self.$t("tableBase.reject"),
                    actions: async (params: any) => {
                        let garageId = params.row.id;
                        let data = [garageId] as any[];
                        let res = await rejectGarage(data);
                        if (res.status == 200) {
                            self.$toast(
                                self.$t("module.garage.rejected"),
                                true,
                            );
                            self.getDataForListAllGarage();
                        }
                    },
                },
                {
                    icon: "mdi-eye-outline",
                    name: self.$t("tableBase.viewDetail"),
                    actions: (params: any) => {
                        let garageId = params.row.id;
                        self.$router.push({
                            name: "garageById",
                            params: { id: garageId },
                        });
                    },
                },
                {
                    icon: "mdi-account-plus-outline",
                    name: self.$t("module.garage.createEmployee"),
                    actions: (params: any) => {
                        let garageId = params.row.id;
                        self.$store.dispatch("changeFunctionSidebar", {
                            actionName: "createEmployee",
                            props: {
                                garageId: garageId,
                            },
                            componentName: "sidebarCreateEmployee",
                        });
                    },
                },
            ],

            paginationConfig: {
                current: 1,
                total: 0,
                perPage: 0,
                pageSize: 50,
                pageSizeOptions: [
                    {
                        value: 50,
                        label: "50",
                    },
                    {
                        value: 100,
                        label: "100",
                    },
                    {
                        value: 200,
                        label: "200",
                    },
                    {
                        value: 1000,
                        label: "1000",
                    },
                ],
            },
            rowData: [],
            columnDefs: [] as {
                field: string;
                label: string;
            }[],
        };
    },
});
</script>

<style>
.ag-header-cell-label {
    font-weight: 400;
    font-size: 15px;
}
</style>
