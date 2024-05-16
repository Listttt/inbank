import {BaseService} from "@/shared/api";
import type {AxiosError, AxiosResponse} from "axios";

export class CalculatorService extends BaseService {
    constructor() {
        super();
        this.createInterceptors();
    }

    // Helper interceptor for DEBUG
    // simulates host response
    private createInterceptors(): void {

        const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
            let result: AxiosResponse = response;
            switch(response.config.url) {
                case "/calculator/v1/data": {
                    result.data = {
                        min: 100,
                        max: 15000,
                        periods: [6, 12, 18, 24, 30, 36],
                        percent: 7,
                        commission: 0.2,
                        currency: 'EUR'
                    };
                    break;
                }
            }
            return result;
        }

        const errorInterceptor = (error: AxiosError): AxiosResponse => {
            let result: AxiosResponse | AxiosError = error;
            switch(error!.config!.url) {
                case "/calculator/v1/offer": {
                    result = error.response as AxiosResponse;

                    const {amount, period} = JSON.parse(error!.config!.data);

                    result.data = {
                        payment: Number(+amount / +period * 1.07).toFixed(2),
                        currency: "EUR"
                    }
                    break;
                }
                case "/calculator/v1/claim": {
                    result = error.response as AxiosResponse;

                    const {income} = JSON.parse(error!.config!.data);

                    const MIN_REQUIRED_AMOUNT = 1000;
                    // Drop undefined record ('reason' for approved decision)
                    result.data = JSON.parse(JSON.stringify({
                        decision: income > MIN_REQUIRED_AMOUNT ? 'approved' : 'rejected',
                        reason: income > MIN_REQUIRED_AMOUNT ? undefined: 'income'
                    }));
                    break;
                }
            }
            if(!(result as AxiosResponse).data) {
                throw error;
            };

            return result as AxiosResponse;
        }

        this.axios.interceptors.response.use(
            responseInterceptor,
            errorInterceptor
        );

    }

    public fetchCalculatorData(): Promise<any> {
        return this.get('/calculator/v1/data').then((response: AxiosResponse): Promise<any> => {
            return response.data;
        });
    }

    public calculateOffer(amount: number, period: number): Promise<any> {
        return this.post('/calculator/v1/offer', {amount, period}).then((response: AxiosResponse): Promise<any> => {
            return response.data;
        })
    }
    //TODO
    public claim(payload: any): Promise<any> {
        return this.post('/calculator/v1/claim', payload).then((response: AxiosResponse): Promise<any> => {
            return response.data;
        })
    }
}