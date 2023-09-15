import { defineStore } from "pinia";

import {
    getAllGroupGarage,
    acceptGarages,
    rejectGarage,
    deleteGarage,
} from "@/modules/groupGarage/api/index";
export const groupGarage = defineStore("groupGarage", {
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
        async getAllGroupGarage(query: any): Promise<any> {
            const res = await getAllGroupGarage(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async acceptGarage(query: any): Promise<any> {
            const res = await acceptGarages(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async rejectGarage(query: any): Promise<any> {
            const res = await rejectGarage(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async deleteGarage(id: string): Promise<any> {
            const res = await deleteGarage(id);

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
