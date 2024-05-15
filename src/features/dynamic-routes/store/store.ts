import {defineStore} from "pinia";

export const useDynamicRoutesStore = defineStore('dynamic-routes', {
    state: () => ({}),
    actions: {
        addDynamicRoute(path: string, params: any) {},
        removeDynamicRoute(path: string) {},
    }
})