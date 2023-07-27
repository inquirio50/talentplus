/* eslint-disable import/prefer-default-export */
import { SearchUsersParam } from '../config/interfaces';
import ActionBase from './ActionBase';

const actionBase = ActionBase.getInstance();

export const getListUsers = async (searchParam: SearchUsersParam): Promise<any> => {
    const url = `/Admin/users?role=${searchParam.role}&userName=${searchParam.userName}&orderBy=${searchParam.orderBy}&orderByItem=${searchParam.orderByItem}&currentPage=${searchParam.currentPage}`;
    const result = await actionBase.get(url);
    if (result) {
        return result;
    }
    return null;
};

export const getCategories = async (): Promise<any> => {
    const url = '/Admin/categories';
    const result = await actionBase.get(url);
    if (result) {
        return result;
    }
    return null;
};

export const getLegends = async (): Promise<any> => {
    const url = '/Admin/legends';
    const result = await actionBase.get(url);
    if (result) {
        return result;
    }
    return null;
};

export const createChat = async (payload: any): Promise<any> => {
    const url = '/Chat/CreateRoom';
    const result = await actionBase.post(url, payload);
    if (result) {
        return result;
    }
    return null;
};

export const createUser = async (payload: any): Promise<any> => {
    const url = '/Admin/admin';
    const result = await actionBase.post(url, payload);
    if (result) {
        return result;
    }
    return null;
};

export const editCategory = async (payload: any): Promise<any> => {
    const url = '/category';
    const result = await actionBase.patch(url, payload);
    if (result) {
        return result;
    }
    return null;
};

export const editLegend = async (payload: any): Promise<any> => {
    const url = '/legend';
    const result = await actionBase.patch(url, payload);
    if (result) {
        return result;
    }
    return null;
};

export const editLegendCategory = async (payload: any): Promise<any> => {
    const url = '/legendCategory';
    const result = await actionBase.patch(url, payload);
    if (result) {
        return result;
    }
    return null;
};

export const changePasswordUser = async (payload: any): Promise<any> => {
    const url = '/Admin/ChangePassword';
    const result = await actionBase.post(url, payload);
    if (result) {
        return result;
    }
    return null;
};

export const deleteUser = async (userId: string): Promise<any> => {
    const url = `/Admin/admin?userId=${userId}`;
    const result = await actionBase.delete(url);
    if (result) {
        return result;
    }
    return null;
};
