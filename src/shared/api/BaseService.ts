import type {AxiosInstance, AxiosResponse} from 'axios';
import {axiosInstance} from "@/app/plugins/axios";

export class BaseService {
    protected axios: AxiosInstance = axiosInstance;
    constructor() {

    }
    post(path: string, data: any): Promise<AxiosResponse> {
        return axiosInstance.post(path, data);
    }
    get(path: string): Promise<AxiosResponse> {
        return axiosInstance.get(path);
    }
}