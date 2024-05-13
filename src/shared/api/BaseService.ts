import axios from 'axios';
import {axiosInstance} from "@/app/plugins/axios";

export class BaseService {
    constructor() {
    }
    post(path: string, payload: any) {}
    get(path: string) {
        return axiosInstance.get(path);
    }
}