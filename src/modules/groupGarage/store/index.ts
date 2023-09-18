import { defineStore } from "pinia";

import {
    getAllGarage,
    getGarageInforById,
    getAddressInfo,
    updateGarage,
    createGarage,
    deleteGarage,
    acceptGarages,
    rejectGarage,
} from "@/modules/groupGarage/api/index";
export const groupGarageStore = defineStore("groupGarageStore", {
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
        async getGarageInforById(id: string): Promise<any> {
            const res = await getGarageInforById(id);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getAllGarage(query: any): Promise<any> {
            let res = await getAllGarage(query);
            let response = await this.filterResponse(
                res,
                null,
                ({ data }: any) => {
                    this.overviewData = data;
                },
            );

            return response as any;
        },
        async getAddressInfo(query: any): Promise<any> {
            const res = await getAddressInfo(query);

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
        async createGarage(query: any): Promise<any> {
            const res = await createGarage(query);

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
        async updateGarage(query: any, id: string): Promise<any> {
            const res = await updateGarage(id, query);

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
