import { defineStore } from 'pinia'
import {CalculatorService} from "@/widgets/calculator/api/CalculatorService";
import { useRouter} from "vue-router";
import {HomePage} from "@/pages/home";

const router = useRouter();

const service: CalculatorService = new CalculatorService();

interface CalculatorDataInterface {
   min: number;
   max: number;
   periods: Array<number>;
   percent: number;
   commission: number;
}

type CurrencyType = 'EUR';
interface CalculatorOfferInterface {
    payment: number;
    currency: CurrencyType
}
interface CalculatorStateInterface {
    data: CalculatorDataInterface,
    offer: CalculatorOfferInterface
}

interface ApiInterface {
    service: CalculatorService
    // router: Router
}
debugger;
const api: ApiInterface= {
    service,
    // router: useRouter()
} as ApiInterface;
debugger;
export const useCalculatorStore = defineStore('calculator',{
    state: () => ({
        data: {} as CalculatorDataInterface,
        offer: {} as CalculatorOfferInterface
    }),
    getters: {
        getCalculatorData(): CalculatorDataInterface  {
            // @ts-ignore
            return this.$state.data;
        },
        getCalculatorOffer(): string {
            // @ts-ignore
            const {payment, currency} = this.$state.offer;
            return Intl.NumberFormat('de-DE', { style: 'currency', currency: currency || 'EUR'  }).format(payment || 0);
        }

    },
    actions: {
        async fetchCalculatorData(): Promise<void>{
            this.$state.data = await api.service.fetchCalculatorData();
        },
        async calculateOffer(amount: number, period: number) {
            const {payment, currency}: CalculatorOfferInterface = await api.service.calculateOffer(amount, period).then(data => data as CalculatorOfferInterface);

            this.$state.offer = {
               payment,
               currency
            } as CalculatorOfferInterface;
        },
        sendRequest(payload: any) {
            // debugger;
            return api.service.claim({...payload, payment: this.$state.offer.payment}).then(({decision}) => {
                //TODO: Breaks FSD
                //@ts-ignore
                    this.$router.addRoute('MAIN', { path: decision, component: HomePage })
                //@ts-ignore
                    this.$router.push(`/${decision}`)
            })
        }
    }
});
