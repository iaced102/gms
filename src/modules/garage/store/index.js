import { defineStore } from "pinia";

import { sleep } from "@/utils/request";
import {
    getAllGarage,
    getGarageInforById,
    getAddressInfo,
    getAddressDetail,
    getAllRescues,
    getListSubSystem,
    updateGarage,
    createGarage,
    getRescues,
    createGarageOwner,
    acceptGarages,
    rejectGarage,
} from "@/modules/garage/api/index";


export const useGarageStore = defineStore("Result", {
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
        async getAllGarage(query) {
            const res = await getAllGarage(query)

            return this.filterResponse(
                res,
                ({ data }) => {
                    this.overviewData = data;
                },
                () => { },
            )
        },
        async getAddressInfo(query) {
            const res = await getAddressInfo(query)

            return this.filterResponse(
                res,
                ({ data }) => {
                    this.overviewData = data;
                },
                () => { },
            )
        },
        async getAddressDetail(query) {
            const res = await getAddressDetail(query)

            return this.filterResponse(
                res,
                ({ data }) => {
                    this.overviewData = data;
                },
                () => { },
            )
        },
        async getAllRescues(query) {
            const res = await getAllRescues(query)

            return this.filterResponse(
                res,
                ({ data }) => {
                    this.overviewData = data;
                },
                () => { },
            )
        },
        async getListSubSystem(query) {
            const res = await getAllRescues(query)

            return this.filterResponse(
                res,
                ({ data }) => {
                    this.overviewData = data;
                },
                () => { },
            )
        },
        async createGarage(query) {
            const res = await createGarage(query)

            return this.filterResponse(
                res,
                ({ data }) => {
                    this.overviewData = data;
                },
                () => { },
            )
        },
    },
});
