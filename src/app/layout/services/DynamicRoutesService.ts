import {useDynamicRoutesStore} from "@/features/dynamic-routes";
import {ROUTE_NAMES} from "@/shared/config";

const store = useDynamicRoutesStore();
//@ts-ignore
const {$router} = store;

// TODO: move it to common utils
const capitalize = (text: string) => text[0].toUpperCase() + text.substring(1);

export const useLayoutService = () => {
    store.$onAction(( {args}) => {
        const [path, props] = args;
        debugger;
        switch (path) {
            case 'approved':
            case 'rejected': {
                $router.addRoute(ROUTE_NAMES.MAIN, { path, name: path, component: () => import(`@/pages/${path}/ui/${capitalize(path)}Page.vue`), props});
                $router.push({name: path});
                break;
            }
        }
    })
}