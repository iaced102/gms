import { defineStore } from "pinia";

import {
    getAllGarage,
    // getGarageInforById,
    getAddressInfo,
    getAddressDetail,
    getAllRescues,
    // getListSubSystem,
    updateGarage,
    createGarage,
    // getRescues,
    // createGarageOwner,
    acceptGarages,
    rejectGarage,
} from "@/modules/garage/api/index";
export const generalManagermentStore = defineStore("g", {
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
        async getAllGarage(query: any): Promise<any> {
            let res = await getAllGarage(query);
            res = await this.filterResponse(res, null, ({ data }: any) => {
                this.overviewData = data;
            });

            return res as any;
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
