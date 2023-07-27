/* eslint-disable default-param-last */
import { CandidateActionTypes } from './candidateActions';
import { State, Action } from '../../../config/interfaces';
import UserMatch from '../../../models/userMatch';

const initialState: State = {
    userMatches: [],
    loading: false,
};

const consultantReducer = (state: State = initialState, { type, payload }: Action): any => {
    switch (type) {
        case CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS: {
            switch (payload.actionType) {
                case CandidateActionTypes.GET_USER_JOBS_MATCHES:
                case CandidateActionTypes.SEND_USER_JOB_MATCH_DECISION: {
                    return {
                        ...state,
                        userMatches: payload.data,
                        loading: false,
                    };
                }
                case CandidateActionTypes.CONSULTANT_FETCH_MATCH: {
                    return {
                        ...state,
                        currentMatch: payload.data,
                        loading: false,
                    };
                }
                case CandidateActionTypes.CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE:
                case CandidateActionTypes.CONSULTANT_TOGGLE_ISPROFILEPUBLIC: {
                    return {
                        ...state,
                        loading: false,
                    };
                }
                case CandidateActionTypes.CONSULTANT_FETCH_PROFILE:
                case CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS:
                case CandidateActionTypes.CANDIDATE_FETCH_INFO:
                case CandidateActionTypes.CONSULTANT_CHANGE_EMAIL: {
                    return {
                        ...state,
                        loading: false,
                        profile: { ...state.profile, ...payload.data },
                    };
                }
                case CandidateActionTypes.CONSULTANT_SET_MATCHVIEWED: {
                    return {
                        ...state,
                        loading: false,
                        currentMatch: payload.data,
                    };
                }
                case CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME: {
                    return {
                        ...state,
                        loading: true,
                        profile: { ...state.profile, fullName: payload },
                    };
                }
                case CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH_AGREEMENT:
                case CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH: {
                    return {
                        ...state,
                        loading: true,
                        userMatches: state.userMatches?.filter(
                            (userMatch: UserMatch) => userMatch.id !== payload.matchId
                        ),
                    };
                }
                case CandidateActionTypes.CONSULTANT_ADD_EDUCATION: {
                    const education = state.profile?.education || [];
                    education.push(payload.data);
                    return {
                        ...state,
                        loading: false,
                        profile: { ...state.profile, education },
                    };
                }
                case CandidateActionTypes.CONSULTANT_ADD_EXPERIENCE: {
                    const experience = state.profile?.experience || [];
                    experience.push(payload.data);
                    return {
                        ...state,
                        loading: false,
                        profile: { ...state.profile, experience },
                    };
                }
                case CandidateActionTypes.CONSULTANT_ADD_RESUME:
                case CandidateActionTypes.CONSULTANT_GET_RESUME:
                    return {
                        ...state,
                        profile: { ...state.profile, resume: payload.data },
                    };
                case CandidateActionTypes.CONSULTANT_DELETE_RESUME:
                    return {
                        ...state,
                        profile: { ...state.profile, resume: undefined },
                    };
                case CandidateActionTypes.CANDIDATE_MATCH_STATISTICS:
                    return {
                        ...state,
                        statisticsMatch: payload.data,
                    };
                default:
                    return state;
            }
        }

        case CandidateActionTypes.CONSULTANT_API_ACTIONS_ERROR: {
            switch (payload.actionType) {
                case CandidateActionTypes.CANDIDATE_FETCH_INFO:
                case CandidateActionTypes.CONSULTANT_CHANGE_EMAIL:
                case CandidateActionTypes.CONSULTANT_SET_MATCHVIEWED:
                case CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME:
                case CandidateActionTypes.GET_USER_JOBS_MATCHES:
                case CandidateActionTypes.SEND_USER_JOB_MATCH_DECISION:
                case CandidateActionTypes.CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE:
                case CandidateActionTypes.CONSULTANT_TOGGLE_ISPROFILEPUBLIC:
                case CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS:
                case CandidateActionTypes.CONSULTANT_ADD_EDUCATION:
                case CandidateActionTypes.CONSULTANT_EDIT_EDUCATION:
                case CandidateActionTypes.CONSULTANT_DELETE_EDUCATION:
                case CandidateActionTypes.CONSULTANT_ADD_EXPERIENCE:
                case CandidateActionTypes.CONSULTANT_EDIT_EXPERIENCE:
                case CandidateActionTypes.CONSULTANT_DELETE_EXPERIENCE:
                case CandidateActionTypes.CONSULTANT_FETCH_PROFILE:
                case CandidateActionTypes.CONSULTANT_ADD_RESUME:
                case CandidateActionTypes.CONSULTANT_GET_RESUME:
                case CandidateActionTypes.CANDIDATE_MATCH_STATISTICS: {
                    return {
                        ...state,
                        error: payload.error,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }
        case CandidateActionTypes.CONSULTANT_SET_CURRENT_MATCH: {
            return {
                ...state,
                currentMatch: payload,
            };
        }
        case CandidateActionTypes.CANDIDATE_FETCH_INFO:
        case CandidateActionTypes.SEND_USER_JOB_MATCH_DECISION:
        case CandidateActionTypes.CONSULTANT_TOGGLE_ISPROFILEPUBLIC:
        case CandidateActionTypes.CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE:
        case CandidateActionTypes.CONSULTANT_CHANGE_EMAIL:
        case CandidateActionTypes.CONSULTANT_SET_MATCHVIEWED:
        case CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME:
        case CandidateActionTypes.CONSULTANT_ADD_EDUCATION:
        case CandidateActionTypes.CONSULTANT_EDIT_EDUCATION:
        case CandidateActionTypes.CONSULTANT_DELETE_EDUCATION:
        case CandidateActionTypes.CONSULTANT_ADD_EXPERIENCE:
        case CandidateActionTypes.CONSULTANT_EDIT_EXPERIENCE:
        case CandidateActionTypes.CONSULTANT_DELETE_EXPERIENCE:
        case CandidateActionTypes.CONSULTANT_FETCH_PROFILE:
        case CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS:
        case CandidateActionTypes.CONSULTANT_ADD_RESUME:
        case CandidateActionTypes.CONSULTANT_GET_RESUME:
        case CandidateActionTypes.GET_USER_JOBS_MATCHES:
        case CandidateActionTypes.CANDIDATE_MATCH_STATISTICS: {
            return {
                ...state,
                loading: true,
            };
        }
        default:
            return state;
    }
};

export default consultantReducer;
