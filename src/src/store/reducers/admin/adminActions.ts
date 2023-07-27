import Category from '../../../models/category';
import Legend from '../../../models/legend';
import { Action, SearchUsersParam, SignUpForm } from '../../../config/interfaces';
import { CreateRoomType } from '../../../models/typeProps';
import LegendCategory from '../../../models/legendCategory';

export const AdminActionTypes = {
    ADMIN_RESPONSE_SUCCESS: 'AUTH_RESPONSE_SUCCESS',
    ADMIN_RESPONSE_ERROR: 'AUTH_RESPONSE_ERROR',

    ADMIN_REGISTERED_USERS_LIST: 'ADMIN_REGISTERED_USERS_LIST',
    ADMIN_CREATE_CHAT: 'ADMIN_CREATE_CHAT',

    ADMIN_CREATE_USER: 'ADMIN_CREATE_USER',
    ADMIN_RESET_PASSWORD: 'ADMIN_RESET_PASSWORD',
    ADMIN_DELETE_USER: 'ADMIN_DELETE_USER',

    ADMIN_CATEGORIES_LIST: 'ADMIN_CATEGORIES_LIST',
    ADMIN_CATEGORY_UPDATE: 'ADMIN_CATEGORY_UPDATE',

    ADMIN_LEGENDS_LIST: 'ADMIN_LEGENDS_LIST',
    ADMIN_LEGEND_UPDATE: 'ADMIN_LEGEND_UPDATE',

    ADMIN_LEGEND_CATEGORY_UPDATE: 'ADMIN_LEGEND_CATEGORY_UPDATE',
};

export const listUsers = (params: SearchUsersParam): Action => ({
    type: AdminActionTypes.ADMIN_REGISTERED_USERS_LIST,
    payload: params,
});

export const listCategories = (): Action => ({
    type: AdminActionTypes.ADMIN_CATEGORIES_LIST,
});

export const listLegends = (): Action => ({
    type: AdminActionTypes.ADMIN_LEGENDS_LIST,
});

export const editCategory = (category: Category | null): Action => ({
    type: AdminActionTypes.ADMIN_CATEGORY_UPDATE,
    payload: category,
});

export const editLegend = (legend: Legend | null): Action => ({
    type: AdminActionTypes.ADMIN_LEGEND_UPDATE,
    payload: legend,
});

export const editLegendCategory = (legendCategory: LegendCategory | null): Action => ({
    type: AdminActionTypes.ADMIN_LEGEND_CATEGORY_UPDATE,
    payload: legendCategory,
});

export const createChat = (params: CreateRoomType): Action => ({
    type: AdminActionTypes.ADMIN_CREATE_CHAT,
    payload: params,
});

export const addNewUser = (params: SignUpForm): Action => ({
    type: AdminActionTypes.ADMIN_CREATE_USER,
    payload: params,
});

export const resetPasswordAdmin = (params: any): Action => ({
    type: AdminActionTypes.ADMIN_RESET_PASSWORD,
    payload: params,
});

export const deleteUserAdmin = (userId: string): Action => ({
    type: AdminActionTypes.ADMIN_DELETE_USER,
    payload: userId,
});
