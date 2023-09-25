import { defineStore } from "pinia";

import {
    getListTags,
    createTags,
    getDetailTags,
    updateTags,
    acceptTags,
    rejectTags,
    getListGarageService,
    createGarageService,
    getDetailGarageService,
    updateGarageService,
    acceptGarageService,
    rejectGarageService,
} from "../api/index";
import { getListSubSystem } from "@/modules/generalManagerment/api/index";
export const garageServiceStore = defineStore("mappingDataGarage", {
    state: () => {
        return {
            demoList: {},
            overviewData: {
                title: "",
                content: "",
            },
            listSubSystem: [],
            tags: [],
        };
    },
    getters: {
        // demoList: state => state.demoList
    },
    actions: {
        async getListTags(data: any) {
            let res = await getListTags(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getAllTagsForStore() {
            let data = {
                pageSize: 10000,
                pageNumber: 1,
                status: 1,
            };
            let res = await getListTags(data);
            let filtered = (await this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            )) as any;
            debugger;
            if (filtered.code == 1) {
                this.tags = filtered.data;
            }
        },
        async getListSubSystem() {
            let data = {
                pageSize: 10000,
                pageNumber: 1,
                status: 1,
            };
            const res = await getListSubSystem(data);

            let filtered = (await this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            )) as any;
            if (filtered.code == 1) {
                this.listSubSystem = filtered.data;
            }
            console.log(filtered);
        },
        async createTags(data: any) {
            let res = await createTags(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getAllTags(data: any) {
            let res = await getListTags(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getDetailTags(id: string) {
            let res = await getDetailTags(id);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async updateTags(data: any, id: string) {
            let res = await updateTags(data, id);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async acceptTags(data: any) {
            let res = await acceptTags(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async rejectTags(data: any) {
            let res = await rejectTags(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },

        async getListGarageService(data: any) {
            let res = await getListGarageService(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async createGarageService(data: any) {
            let res = await createGarageService(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getAllGarageService(data: any) {
            let res = await getListGarageService(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async getDetailGarageService(id: string) {
            let res = await getDetailGarageService(id);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async updateGarageService(data: any, id: string) {
            let res = await updateGarageService(data, id);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async acceptGarageService(data: any) {
            let res = await acceptGarageService(data);
            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async rejectGarageService(data: any) {
            let res = await rejectGarageService(data);
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
