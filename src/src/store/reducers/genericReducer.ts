import { Profile } from '../../models/profile';
/* eslint-disable default-param-last */
import { GenericActions } from './genericActions';
import { State, Action, FormDataType } from '../../config/interfaces';

const initialState: State = {
    openMessageModal: false,
    typeMessage: 'info',
    messageModal: '',
    profile: {} as Profile,
    loading: false,
    serviceWorkerUpdate: false,
    formRegister: {} as FormDataType,
};
const genericReducer = (state: State = initialState, { type, payload }: Action): any => {
    switch (type) {
        case GenericActions.REQUEST_APP_REFRESH: {
            return {
                ...state,
                serviceWorkerUpdate: payload,
            };
        }
        case GenericActions.CLOSE_MESSAGE_MODAL:
            return {
                ...state,
                openMessageModal: false,
                messageModal: null,
                typeMessage: 'info',
            };
        case GenericActions.INFO_MESSAGE_MODAL:
            return {
                ...state,
                openMessageModal: true,
                messageModal: payload,
                typeMessage: 'info',
            };
        case GenericActions.SUCCESS_MESSAGE_MODAL:
            return {
                ...state,
                openMessageModal: true,
                messageModal: payload,
                typeMessage: 'success',
            };
        case GenericActions.FAIL_MESSAGE_MODAL:
            return {
                ...state,
                openMessageModal: true,
                messageModal: payload,
                typeMessage: 'error',
            };
        case GenericActions.REGISTER_SAVE_FORM:
            return {
                ...state,
                formRegister: payload,
            };
        case GenericActions.API_GENERIC_SUCCESS: {
            switch (payload?.actionType) {
                case GenericActions.EXPERIENCE_ADD:
                case GenericActions.EDUCATION_ADD:
                case GenericActions.PROFILE_USERS_FETCH:
                case GenericActions.PROFILE_USERS_UPDATE:
                    return {
                        ...state,
                        loading: false,
                        profile: { ...state.profile, ...payload.data },
                    };
                case GenericActions.EXPERIENCE_EDIT:
                case GenericActions.EXPERIENCE_DELETE:
                case GenericActions.EDUCATION_EDIT:
                case GenericActions.EDUCATION_DELETE:
                    return {
                        ...state,
                        loading: false,
                    };
                case GenericActions.FETCH_PROFIL_PARAMETER_ADMIN:
                case GenericActions.FETCH_PROFIL_PARAMETER:
                    return {
                        ...state,
                        profilParameters: payload.data,
                    };
                case GenericActions.PERCENTAGE_CANDIDATE:
                    return {
                        ...state,
                        loading: false,
                        profile: { ...state.profile, percentage: payload.data },
                    };
                default:
                    return state;
            }
        }
        case GenericActions.API_GENERIC_ERROR: {
            switch (payload?.actionType) {
                case GenericActions.EXPERIENCE_ADD:
                case GenericActions.EXPERIENCE_EDIT:
                case GenericActions.EXPERIENCE_DELETE:
                case GenericActions.FETCH_PROFIL_PARAMETER:
                case GenericActions.FETCH_PROFIL_PARAMETER_ADMIN:
                case GenericActions.EDUCATION_ADD:
                case GenericActions.EDUCATION_EDIT:
                case GenericActions.EDUCATION_DELETE:
                case GenericActions.PERCENTAGE_CANDIDATE:
                case GenericActions.PROFILE_USERS_UPDATE: {
                    return {
                        ...state,
                        loading: false,
                        error: payload.error,
                    };
                }
                default:
                    return state;
            }
        }
        case GenericActions.EXPERIENCE_ADD:
        case GenericActions.EXPERIENCE_EDIT:
        case GenericActions.EXPERIENCE_DELETE:
        case GenericActions.EDUCATION_ADD:
        case GenericActions.EDUCATION_EDIT:
        case GenericActions.EDUCATION_DELETE:
        case GenericActions.PROFILE_USERS_UPDATE:
        case GenericActions.PROFILE_USERS_FETCH:
        case GenericActions.PERCENTAGE_CANDIDATE:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default genericReducer;
