import { garageService } from "@/utils/request";
import { contentService } from "@/utils/request";

export function getAllContract(data: any) {
    return garageService({
        url: "garage-contracts",
        method: "get",
        params: data,
    });
}

export function createContract(data: any) {
    return garageService({
        url: "garage-contracts",
        method: "post",
        data: data,
    });
}
