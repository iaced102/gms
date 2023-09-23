import { garageService } from "@/utils/request";
import { contentService, chatService } from "@/utils/request";

export function getRescues() {
    return garageService({
        url: "rescues",
        method: "get",
    });
}

export function getListSubSystem(data: any) {
    return garageService({
        url: "car-sub-systems",
        method: "get",
        params: data,
    });
}

export function getAllRescues(data: any) {
    return garageService({
        url: "rescues",
        method: "get",
        params: data,
    });
}

export function acceptRescues(data: any) {
    return garageService({
        url: "rescues/accept",
        method: "post",
        data: data,
    });
}

export function rejectRescues(data: any) {
    return garageService({
        url: "rescues/reject",
        method: "post",
        data: data,
    });
}

export function createRescues(data: any) {
    return garageService({
        url: "rescues",
        method: "post",
        data: data,
    });
}

export function getSubSystem() {
    return garageService({
        url: "rescues",
        method: "get",
    });
}

export function getAllSubSystem(data: any) {
    return garageService({
        url: "car-sub-systems",
        method: "get",
        params: data,
    });
}

export function acceptSubSystem(data: any) {
    return garageService({
        url: "car-sub-systems/accept",
        method: "post",
        data: data,
    });
}

export function rejectSubSystem(data: any) {
    return garageService({
        url: "car-sub-systems/reject",
        method: "post",
        data: data,
    });
}

export function createSubSystem(data: any) {
    return garageService({
        url: "car-sub-systems",
        method: "post",
        data: data,
    });
}
