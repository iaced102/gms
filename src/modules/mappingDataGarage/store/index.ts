import { defineStore } from "pinia";

import {
    getAllRescues,
    getListSubSystem,
    getRescues,
    getAllSubSystem,
    acceptSubSystem,
    rejectSubSystem,
    createSubSystem,
    acceptRescues,
    rejectRescues,
    createRescues,
} from "../api/index";
export const mappingDataGarageStore = defineStore("mappingDataGarage", {
    state: () => {
        return {
            demoList: {},
            overviewData: {
                title: "",
                content: "",
            },
            listSubSystem: [],
            listRescues: [],
        };
    },
    getters: {
        // demoList: state => state.demoList
    },
    actions: {
        async getAllRescues(query: any) {
            const res = await getAllRescues(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async acceptRescues(query: any) {
            const res = await acceptRescues(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async rejectRescues(query: any) {
            const res = await rejectRescues(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async createRescues(query: any) {
            const res = await createRescues(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },

        async getAllSubSystem(query: any) {
            const res = await getAllSubSystem(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async acceptSubSystem(query: any) {
            const res = await acceptSubSystem(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async rejectSubSystem(query: any) {
            const res = await rejectSubSystem(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async createSubSystem(query: any) {
            const res = await createSubSystem(query);

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
