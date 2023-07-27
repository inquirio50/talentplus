/* eslint-disable no-use-before-define */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config/config';
import HttpClient from './HttpClient';

export default class ActionBase extends HttpClient {
    private static actionBaseInstance?: ActionBase;

    private constructor() {
        super(config.API_URL);
    }

    public static getInstance() {
        if (!this.actionBaseInstance) {
            this.actionBaseInstance = new ActionBase();
        }

        return this.actionBaseInstance;
    }

    request<T = any, R = AxiosResponse<T>>(configProxy: AxiosRequestConfig): Promise<R> {
        return this.instance.request(configProxy);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, configProxy?: AxiosRequestConfig): Promise<R> {
        return this.instance.get<T, R>(`${this.instance.defaults.baseURL}${url}`, configProxy);
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data?: T, configProxy?: AxiosRequestConfig): Promise<R> {
        return this.instance.post<T, R>(`${this.instance.defaults.baseURL}${url}`, data, configProxy);
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: T, configProxy?: AxiosRequestConfig): Promise<R> {
        return this.instance.put<T, R>(`${this.instance.defaults.baseURL}${url}`, data, configProxy);
    }

    patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, configProxy?: AxiosRequestConfig): Promise<R> {
        return this.instance.patch<T, R>(`${this.instance.defaults.baseURL}${url}`, data, configProxy);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, configProxy?: AxiosRequestConfig): Promise<R> {
        return this.instance.delete<T, R>(`${this.instance.defaults.baseURL}${url}`, configProxy);
    }
}
