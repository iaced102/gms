import { garageService } from "@/utils/request";
import { contentService } from "@/utils/request";

export function getAllGarageOwner(data: any) {
    return garageService({
        url: "garage-owners",
        method: "get",
        params: data,
    });
}

export function createGarageOwner(data: any) {
    return garageService({
        url: "garage-owners",
        method: "post",
        data: data,
    });
}
