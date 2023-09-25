import { garageService } from "@/utils/request";
import { contentService, chatService } from "@/utils/request";

export function getAllTag() {
    let data = {
        pageSize: 1000,
        pageNumber: 1,
    };
    return garageService({
        url: "tags",
        method: "get",
        params: data,
    });
}

export function getListTags(data: any) {
    return garageService({
        url: "tags",
        method: "get",
        params: data,
    });
}
export function createTags(data: any) {
    return garageService({
        url: "tags",
        method: "post",
        data: data,
    });
}

export function getDetailTags(id: string) {
    return garageService({
        url: "tags/" + id,
        method: "get",
    });
}

export function updateTags(data: any, id: string) {
    return garageService({
        url: "tags/" + id,
        method: "patch",
        data: data,
    });
}

export function acceptTags(data: string[]) {
    return garageService({
        url: "tags/accept",
        method: "post",
        data: data,
    });
}

export function rejectTags(data: string[]) {
    return garageService({
        url: "tags/reject",
        method: "post",
        data: data,
    });
}

export function getAllGarageService() {
    let data = {
        pageSize: 1000,
        pageNumber: 1,
    };
    return garageService({
        url: "garages/0/services",
        method: "get",
        params: data,
    });
}

export function getListGarageService(data: any) {
    return garageService({
        url: "garages/0/services",
        method: "get",
        params: data,
    });
}
export function createGarageService(data: any) {
    return garageService({
        url: "garages/0/services",
        method: "post",
        data: data,
    });
}

export function getDetailGarageService(id: string) {
    return garageService({
        url: "garages/0/services/" + id,
        method: "get",
    });
}

export function updateGarageService(data: any, id: string) {
    return garageService({
        url: "garages/0/services/" + id,
        method: "patch",
        data: data,
    });
}

export function acceptGarageService(data: string[]) {
    return garageService({
        url: "garages/0/services/accept",
        method: "post",
        data: data,
    });
}

export function rejectGarageService(data: string[]) {
    return garageService({
        url: "garages/0/services/reject",
        method: "post",
        data: data,
    });
}
