import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import type { Emitter } from "mitt";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $evtBus: Emitter;
        $t: (key: string) => string;
        $toast: (messgae: string, isSuccess: boolean) => void;
        $apiPackage: any;
        $store: any;
    }
}
import "pinia";

declare module "pinia" {
    export interface PiniaCustomProperties {
        filterResponse: (res: any, successCb: any, errorCb: any = null) => void;
    }
}
