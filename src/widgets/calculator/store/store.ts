import { defineStore } from 'pinia'
import {CalculatorService} from "@/widgets/calculator/api/CalculatorService";
import {useDynamicRoutesStore} from "@/features/dynamic-routes";
import {formatCurrency} from "@/shared/helper/currency";

const service: CalculatorService = new CalculatorService();

const dynamicRoutesStore = useDynamicRoutesStore();

export interface CalculatorDataInterface {
   min: number;
   max: number;
   periods: Array<number>;
   percent: number;
   commission: number;
   currency: CurrencyType
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
            return formatCurrency(payment, currency);
        },
        getCalculatorOffer(): string {
            // @ts-ignore
            const {payment, currency} = this.$state.offer;
            return formatCurrency(payment, currency);
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
