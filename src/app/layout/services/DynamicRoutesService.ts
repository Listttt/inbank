import {useDynamicRoutesStore} from "@/features/dynamic-routes";
import {ROUTE_NAMES} from "@/shared/config";

const store = useDynamicRoutesStore();
//@ts-ignore
const {$router} = store;

export const useLayoutService = () => {
    store.$onAction(( {args}) => {
        const [path] = args;
        switch (path) {
            case 'approved':
            case 'rejected': {

                $router.addRoute(ROUTE_NAMES.MAIN, { path, component: () => import('@/pages/home/ui/HomePage.vue') })
                $router.push(`/${path}`)
                break;
            }
        }
    })
}