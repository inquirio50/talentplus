/* eslint-disable default-param-last */
import { Action, State } from '../../../config/interfaces';
import { RecruiterActionTypes } from './recruiterActions';

const initialState: State = {
    recruiterMatches: [],
    loading: false,
    profile: undefined,
    company: undefined,
    isSuccess: false,
    jobs: undefined,
    info: undefined,
    job: undefined,
};

const recruiterReducer = (state: State = initialState, action: Action): any => {
    switch (action.type) {
        case RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS: {
            switch (action.payload.actionType) {
                case RecruiterActionTypes.RECRUITER_UPDATE_PROFIL:
                case RecruiterActionTypes.EMPLOYER_FETCH_PROFILE: {
                    return {
                        ...state,
                        profile: { ...state.profile, ...action.payload.data },
                        loading: false,
                    };
                }
                case RecruiterActionTypes.EMPLOYER_FETCH_JOBS: {
                    return {
                        ...state,
                        jobs: action.payload.data,
                        loading: false,
                    };
                }
                case RecruiterActionTypes.EMPLOYER_FETCH_MATCHES: {
                    return {
                        ...state,
                        loading: false,
                        recruiterMatches: action.payload.data,
                    };
                }
                case RecruiterActionTypes.RECRUITER_CHANGE_FIRST_NAME:
                    return {
                        ...state,
                        loading: false,
                    };
                case RecruiterActionTypes.RECRUITER_CHANGE_LAST_NAME:
                    return {
                        ...state,
                        loading: false,
                    };
                case RecruiterActionTypes.RECRUITER_CHANGE_TITLE:
                    return {
                        ...state,
                        loading: false,
                    };
                case RecruiterActionTypes.RECRUITER_CHANGE_DEPARTMENT:
                    return {
                        ...state,
                        loading: false,
                    };
                case RecruiterActionTypes.RECRUITER_CHANGE_EMAIL:
                    return {
                        ...state,
                        loading: false,
                    };
                case RecruiterActionTypes.RECRUITER_CHANGE_PHONE:
                    return {
                        ...state,
                        loading: false,
                    };
                case RecruiterActionTypes.RECRUITER_UPDATE_JOB:
                case RecruiterActionTypes.RECRUITER_CREATE_JOB:
                    return {
                        ...state,
                        loading: false,
                        isSuccess: true,
                        info: { ...state.info, createdJob: action.payload.data },
                    };
                case RecruiterActionTypes.RECRUITER_ACCEPT_OR_DECLINE_MATCH:
                    return {
                        ...state,
                        loading: false,
                        isSuccess: true,
                    };
                case RecruiterActionTypes.RECRUITER_FETCH_MATCHES:
                    return {
                        ...state,
                        loading: false,
                        isSuccess: true,
                        matches: action.payload.data,
                    };
                case RecruiterActionTypes.RECRUITER_FETCH_ALL_JOBS:
                    return {
                        ...state,
                        loading: false,
                        isSuccess: true,
                        jobs: action.payload.data,
                    };
                case RecruiterActionTypes.RECRUITER_DELETE_JOB:
                    return {
                        ...state,
                        loading: false,
                        jobs: state.jobs ? [...state.jobs.filter((i) => i.id !== action.payload.data)] : [],
                        isSuccess: true,
                        info: { ...state.info, deletedJob: action.payload.data },
                    };
                case RecruiterActionTypes.RECRUITER_FETCH_JOB:
                    return {
                        ...state,
                        loading: false,
                        job: action.payload.data,
                    };
                case RecruiterActionTypes.RECRUITER_UPDATE_COMPANY:
                    return {
                        ...state,
                        loading: false,
                    };
                default:
                    return state;
            }
        }
        case RecruiterActionTypes.RECRUITER_UPDATE_PROFIL:
        case RecruiterActionTypes.EMPLOYER_FETCH_PROFILE:
        case RecruiterActionTypes.EMPLOYER_FETCH_JOBS:
        case RecruiterActionTypes.RECRUITER_CREATE_JOB:
        case RecruiterActionTypes.RECRUITER_UPDATE_JOB:
        case RecruiterActionTypes.RECRUITER_ACCEPT_OR_DECLINE_MATCH:
        case RecruiterActionTypes.RECRUITER_FETCH_MATCHES:
        case RecruiterActionTypes.RECRUITER_FETCH_ALL_JOBS:
        case RecruiterActionTypes.RECRUITER_DELETE_JOB:
        case RecruiterActionTypes.RECRUITER_FETCH_JOB:
            return { ...state, loading: true, isSuccess: false, info: { ...state.info, deletedJob: undefined } };
        case RecruiterActionTypes.RECRUITER_UPDATE_COMPANY:
            return { ...state, loading: true, isSuccess: false };
        case RecruiterActionTypes.RECRUITER_CHANGE_FIRST_NAME:
            return {
                ...state,
                loading: true,
                isSuccess: true,
                profile: { ...state.profile, firstName: action.payload },
            };
        case RecruiterActionTypes.RECRUITER_CHANGE_LAST_NAME:
            return {
                ...state,
                loading: true,
                isSuccess: true,
                profile: { ...state.profile, lastName: action.payload },
            };
        case RecruiterActionTypes.RECRUITER_CHANGE_TITLE:
            return {
                ...state,
                loading: true,
                isSuccess: true,
                profile: { ...state.profile, title: action.payload },
            };
        case RecruiterActionTypes.RECRUITER_CHANGE_DEPARTMENT:
            return {
                ...state,
                loading: true,
                isSuccess: true,
                profile: { ...state.profile, department: action.payload },
            };
        case RecruiterActionTypes.RECRUITER_CHANGE_EMAIL:
            return {
                ...state,
                loading: true,
                isSuccess: true,
                profile: { ...state.profile, email: action.payload },
            };
        case RecruiterActionTypes.RECRUITER_CHANGE_PHONE:
            return {
                ...state,
                loading: true,
                isSuccess: true,
                profile: { ...state.profile, phoneNumber: action.payload },
            };

        default:
            return state;
    }
};

export default recruiterReducer;
