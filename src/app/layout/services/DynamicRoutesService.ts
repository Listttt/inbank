import {useDynamicRoutesStore} from "@/features/dynamic-routes";
import {ROUTE_NAMES} from "@/shared/config";

const store = useDynamicRoutesStore();

export const useLayoutService = () => {
    store.$onAction(( {args}) => {
        const [path] = args;
        switch (path) {
            case 'approved':
            case 'rejected': {

                // //@ts-ignore
                store.$router.addRoute(ROUTE_NAMES.MAIN, { path, component: () => import('@/pages/home/ui/HomePage.vue') })
                //@ts-ignore
                store.$router.push(`/${path}`)
                break;
            }
        }
    })
}