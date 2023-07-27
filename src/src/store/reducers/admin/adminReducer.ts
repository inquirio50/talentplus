/* eslint-disable default-param-last */

import { Action, State } from '../../../config/interfaces';
import { AdminActionTypes } from './adminActions';

const initialState: State = {
    users: [],
    categories: [],
    loading: false,
    legends: [],
};

const adminReducer = (state: State = initialState, action: Action): any => {
    switch (action.type) {
        case AdminActionTypes.ADMIN_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AdminActionTypes.ADMIN_REGISTERED_USERS_LIST: {
                    return {
                        ...state,
                        users: action.payload.data,
                        loading: false,
                    };
                }
                case AdminActionTypes.ADMIN_CATEGORIES_LIST:
                case AdminActionTypes.ADMIN_CATEGORY_UPDATE: {
                    return {
                        ...state,
                        categories: action.payload.data,
                        loading: false,
                    };
                }
                case AdminActionTypes.ADMIN_LEGENDS_LIST:
                case AdminActionTypes.ADMIN_LEGEND_UPDATE:
                case AdminActionTypes.ADMIN_LEGEND_CATEGORY_UPDATE: {
                    return {
                        ...state,
                        legends: action.payload.data,
                        loading: false,
                    };
                }
                case AdminActionTypes.ADMIN_CREATE_USER:
                case AdminActionTypes.ADMIN_RESET_PASSWORD:
                case AdminActionTypes.ADMIN_DELETE_USER:
                case AdminActionTypes.ADMIN_CREATE_CHAT: {
                    return {
                        ...state,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }

        case AdminActionTypes.ADMIN_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case AdminActionTypes.ADMIN_REGISTERED_USERS_LIST:
                case AdminActionTypes.ADMIN_CATEGORIES_LIST:
                case AdminActionTypes.ADMIN_CATEGORY_UPDATE:
                case AdminActionTypes.ADMIN_LEGENDS_LIST:
                case AdminActionTypes.ADMIN_LEGEND_UPDATE:
                case AdminActionTypes.ADMIN_LEGEND_CATEGORY_UPDATE:
                case AdminActionTypes.ADMIN_CREATE_USER:
                case AdminActionTypes.ADMIN_RESET_PASSWORD:
                case AdminActionTypes.ADMIN_DELETE_USER:
                case AdminActionTypes.ADMIN_CREATE_CHAT: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }
        case AdminActionTypes.ADMIN_REGISTERED_USERS_LIST:
        case AdminActionTypes.ADMIN_CATEGORY_UPDATE:
        case AdminActionTypes.ADMIN_CATEGORIES_LIST:
        case AdminActionTypes.ADMIN_LEGEND_UPDATE:
        case AdminActionTypes.ADMIN_LEGEND_CATEGORY_UPDATE:
        case AdminActionTypes.ADMIN_LEGENDS_LIST:
        case AdminActionTypes.ADMIN_CREATE_CHAT:
        case AdminActionTypes.ADMIN_CREATE_USER:
        case AdminActionTypes.ADMIN_RESET_PASSWORD:
        case AdminActionTypes.ADMIN_DELETE_USER:
            return { ...state, loading: true };
        default:
            return state;
    }
};

export default adminReducer;
