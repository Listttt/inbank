import { defineStore } from 'pinia'
import {CalculatorService} from "@/widgets/calculator/api/CalculatorService";
import {useDynamicRoutesStore} from "@/features/dynamic-routes";

const service: CalculatorService = new CalculatorService();

const dynamicRoutesStore = useDynamicRoutesStore();

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
    currency: CurrencyType;
    period: number;
    amount: number;
}
interface CalculatorStateInterface {
    data: CalculatorDataInterface,
    offer: CalculatorOfferInterface
}

interface ApiInterface {
    service: CalculatorService
}
const api: ApiInterface= {
    service,
} as ApiInterface;
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
        getCalculatorOfferPayment(): string {
            // @ts-ignore
            const {payment, currency} = this.$state.offer;
            // TODO: currency formater helper
            return Intl.NumberFormat('de-DE', { style: 'currency', currency: currency || 'EUR'  }).format(payment || 0);
        },
        getCalculatorOffer(): string {
            // @ts-ignore
            const {payment, currency} = this.$state.offer;
            // TODO: currency formater helper
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
                currency,
                period,
                amount
            } as CalculatorOfferInterface;
        },
        sendRequest(payload: any) {
            return api.service.claim({...payload, payment: this.$state.offer.payment}).then(({decision, reason}) => {
                //@ts-ignore
                dynamicRoutesStore.addDynamicRoute(decision, {name: payload.name, reason, ...this.$state.offer});
                //@ts-ignore
                dynamicRoutesStore.$router.push({name: path});
            })
        }
    }
});
