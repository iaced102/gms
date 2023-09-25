import { defineStore } from "pinia";

import {
    getAllGarageOwner,
    createGarageOwner,
} from "@/modules/garageOwner/api/index";
export const garageOwnerStore = defineStore("garageOwner", {
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
        async getAllGarageOwner(query: any): Promise<any> {
            const res = await getAllGarageOwner(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        async createGarageOwner(query: any): Promise<any> {
            const res = await createGarageOwner(query);

            return this.filterResponse(
                res,
                (data: any) => {
                    this.overviewData = data;
                },
                () => {},
            );
        },
        convertDateFormat(inputDate: any) {
            const [day, month, year] = inputDate.split("/").map(Number);
            const formattedDate = `${year}-${String(month).padStart(
                2,
                "0",
            )}-${String(day).padStart(2, "0")}`;
            return formattedDate;
        },
    },
});
