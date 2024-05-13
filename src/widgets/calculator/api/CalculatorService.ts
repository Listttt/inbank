import {BaseService} from "@/shared/api";

export class CalculatorService extends BaseService {
    constructor() {
        super();
    }
    fetchCalculatorData() {
        return this.get('/calculator/v1/data')
    }
}