import { garageService } from "@/utils/request";
import { contentService } from "@/utils/request";

export function getAllGroupGarage(data: any) {
    return garageService({
        url: "garages-group",
        method: "get",
        params: data,
    });
}
export function getGarageInforById(id: string) {
    return garageService({
        url: "garages-group/" + id,
        method: "get",
    });
}
export function acceptGarages(data: any) {
    return garageService({
        url: "garages-group/accept",
        method: "post",
        data,
    });
}
export function rejectGarage(data: any) {
    return garageService({
        url: "garages-group/reject",
        method: "post",
        data,
    });
}

export function deleteGarage(id: string) {
    return garageService({
        url: "garages-group/" + id,
        method: "delete",
    });
}
