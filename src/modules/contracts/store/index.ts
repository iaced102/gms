import { defineStore } from "pinia";

import { getAllContract, createContract } from "@/modules/contracts/api/index";
export const contractStore = defineStore("contract", {
    state: () => {
        return {
            demoList: {},
            overviewData: {
                title: "",
                content: "",
            },
        };
    },
    getters: {
        // demoList: state => state.demoList
    },
    actions: {
        async getAllContract(query: any): Promise<any> {
            const res = await getAllContract(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async createContract(query: any): Promise<any> {
            const res = await createContract(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
    },
});
