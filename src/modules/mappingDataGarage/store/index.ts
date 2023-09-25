import { defineStore } from "pinia";

import {
    getAllRescues,
    getDetailSubSystem,
    getDetailRescues,
    updateRescues,
    updateSubSystem,
    getAllSubSystem,
    acceptSubSystem,
    rejectSubSystem,
    createSubSystem,
    acceptRescues,
    rejectRescues,
    createRescues,
    acceptInsurances,
    getAllInsurances,
    rejectInsurances,
    createInsurances,
    getDetailInsurances,
    updateInsurances,
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
        async getDetailRescues(id: string) {
            const res = await getDetailRescues(id);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async updateRescues(data: any, id: string) {
            const res = await updateRescues(data, id);

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
        async getDetailSubSystem(id: string) {
            const res = await getDetailSubSystem(id);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async updateSubSystem(data: any, id: string) {
            const res = await updateSubSystem(data, id);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },

        async getAllInsurances(query: any) {
            const res = await getAllInsurances(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async acceptInsurances(query: any) {
            const res = await acceptInsurances(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async rejectInsurances(query: any) {
            const res = await rejectInsurances(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async createInsurances(query: any) {
            const res = await createInsurances(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getDetailInsurances(id: string) {
            const res = await getDetailInsurances(id);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async updateInsurances(data: any, id: string) {
            const res = await updateInsurances(data, id);

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
