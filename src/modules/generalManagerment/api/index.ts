import { garageService } from "@/utils/request";
import { contentService } from "@/utils/request";

export function getParentGarage(data: any): any {
    return garageService({
        url: "garages",
        method: "get",

        params: data,
    });
    //api.get(garageServiceBaseURL + "garages", data);
}

export function getListGarage(data: any): any {
    return garageService({
        url: "garages",
        method: "get",
        params: data,
    });
}
