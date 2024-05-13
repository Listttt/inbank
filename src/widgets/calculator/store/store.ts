import { defineStore } from 'pinia'
import {CalculatorService} from "@/widgets/calculator/api/CalculatorService";

const service: CalculatorService = new CalculatorService();

interface CalculatorDataInterface {
   min: number;
   max: number;
   periods: Array<number>;
   percent: number;
   commission: number;
}
interface CalculatorStateInterface {
    data: CalculatorDataInterface
}
interface ApiInterface {
    service: CalculatorService
}
const api: ApiInterface= {service} as ApiInterface;
export const useCalculatorStore = defineStore('calculator',{
    state: () => ({
        data: {} as CalculatorDataInterface
    }),
    getters: {
        getCalculatorData(): CalculatorDataInterface  {
            //@ts-ignore
            return state.data;
        }
    },
    actions: {
        fetchCalculatorData(): void {
            api.service.fetchCalculatorData();
        }
    }
});
