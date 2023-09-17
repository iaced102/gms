<template>
    <div>
        <CDTable
            ref="table"
            v-if="rowData.length > 0"
            :tableName="$t('module.generalManagerment.garage.tableName')"
            :actions="tableActions"
            :rowData="rowData"
            :columns="columns"
            :multipleRowActions="true"
            :forStatus="true"
            :forActions="true"
            positionDropdownClass="right-[40px] bottom-[-65px]"
            :contextActions="contextActions"
            :pagination="pagination"
            @changePage="changePage"
        />
        <CDDialog
            v-if="dialogConfig.show"
            :title="dialogConfig.title"
            :content="dialogConfig.content"
            @closeDialog="
                () => {
                    dialogConfig.show = false;
                }
            "
            :width="`${
                dialogConfig.dynamicComponent &&
                dialogConfig.dynamicComponent.length > 0
                    ? 'w-1/2'
                    : 'w-96'
            }`"
        >
            <template #action class="mt-4 flex justify-around">
                <div class="mt-4 flex justify-around">
                    <button
                        v-for="a in dialogConfig.actions"
                        :class="a.class"
                        @click="a.action"
                    >
                        {{ a.name }}
                    </button>
                </div>
            </template>
        </CDDialog>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { contractStore } from "../store/index";
const store = contractStore();
const displayCol = [
    "code",
    "name",
    "address",
    "contactPointPhone",
    "isReceiveWebsite",
    "status",
];
// import { garageDataConfigDetail, garageConfigEdit } from "../data/index";
export default defineComponent({
    async created() {
        this.getDataForTable();
    },
    methods: {
        changePage(val: any) {
            this.pagination.currentPage = val.currentPage;
            this.getDataForTable();
        },
        async getDataForTable() {
            let self = this;
            this.rowData = [];
            let res = await store.getAllContract({
                pageSize: this.pagination.perPage,
                pageNumber: this.pagination.currentPage,
            });
            console.log(res);

            this.rowData = res.data.map((a: any) => {
                a.status = {
                    status: a.status,
                    content: self.$t(
                        "module.generalManagerment.garage.status." + a.status,
                    ),
                };
                return a;
            });
            this.columns = displayCol.map((a) => {
                return {
                    field: a,
                    headerName: this.$t(
                        "module.generalManagerment.garage.columnTable." + a,
                    ),
                };
            });
            this.columns.push({
                field: "action",
                headerName: self.$t(
                    "module.generalManagerment.garage.columnTable.action",
                ),
            });
            this.pagination.total = res.totalElement;
        },
    },
    data() {
        let self = this as any;
        return {
            originData: {} as any,
            dialogConfig: {
                show: false,
                title: "",
                content: "",
                dynamicComponent: [] as any[],
                actions: [] as any[],
            },
            pagination: {
                perPage: 10,
                total: 0,
                currentPage: 1,
            },
            tableActions: {
                action: () => {
                    self.dialogConfig.show = true;
                },
                name: this.$t("module.generalManagerment.garage.addNew"),
            },
            rowData: [] as any[],
            columns: [] as any[],
            contextActions: [],
        };
    },
});
</script>
