/* eslint-disable default-param-last */

import { Action, State } from '../../../config/interfaces';
import { AuthActionTypes } from './authActions';
import { Notification } from '../../../models/notification';
import ChatRoom from '../../../models/chatRoom';

const initialState: State = {
    user: {},
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    resetPasswordEmailSent: null,
    trackEmailOrUserNameVerification: false,
    isEmailConfirmed: true,
    notifications: [],
    chatRooms: [],
};

const authReducer = (state: State = initialState, action: Action): any => {
    switch (action.type) {
        case AuthActionTypes.AUTH_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        user: action.payload.data,
                        isAuthenticated: action.payload.data.isEmailConfirmed,
                        accessToken: action.payload.data.token,
                        loading: false,
                        isEmailConfirmed: action.payload.data.isEmailConfirmed,
                        notifications: action.payload.data.notifications,
                        chatRooms: action.payload.data.chatRooms,
                    };
                }
                case AuthActionTypes.LOGOUT_USER: {
                    return {
                        ...state,
                        accessToken: null,
                        isAuthenticated: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.FORGOT_PASSWORD: {
                    return {
                        ...state,
                        resetPasswordEmailSent: action.payload.data,
                        loading: false,
                        passwordReset: false,
                    };
                }
                case AuthActionTypes.RESET_PASSWORD: {
                    return {
                        ...state,
                        loading: false,
                        resetPasswordSuccessmsg: action.payload.data,
                        passwordReset: true,
                    };
                }
                case AuthActionTypes.IS_EMAIL_AVAILABLE: {
                    return {
                        ...state,
                        loading: false,
                        isEmailAvailable: action.payload.data.isEmailAvailable,
                        trackEmailOrUserNameVerification: !state.trackEmailOrUserNameVerification,
                    };
                }
                case AuthActionTypes.IS_USERNAME_AVAILABLE: {
                    return {
                        ...state,
                        loading: false,
                        isUserNameAvailable: action.payload.data.isUserNameAvailable,
                        trackEmailOrUserNameVerification: !state.trackEmailOrUserNameVerification,
                    };
                }
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        loading: false,
                        finishSignUp: true,
                    };
                }
                case AuthActionTypes.VERIFY_EMAIL: {
                    return {
                        ...state,
                        loading: false,
                        info: action.payload,
                    };
                }
                case AuthActionTypes.RESEND_CONFIRMATION_EMAIL: {
                    return {
                        ...state,
                        loading: false,
                    };
                }
                case AuthActionTypes.SET_MESSAGE_READ:
                    return {
                        ...state,
                        chatRooms: action.payload.data.chatRooms,
                    };
                default:
                    return state;
            }
        }

        case AuthActionTypes.AUTH_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isAuthenticated: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.FORGOT_PASSWORD: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        isAuthenticated: false,
                    };
                }
                case AuthActionTypes.RESET_PASSWORD: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isAuthenticated: false,
                    };
                }
                case AuthActionTypes.IS_EMAIL_AVAILABLE: {
                    return {
                        ...state,
                        loading: false,
                        isEmailAvailable: false,
                        error: action.payload.error,
                        trackEmailOrUserNameVerification: !state.trackEmailOrUserNameVerification,
                    };
                }
                case AuthActionTypes.IS_USERNAME_AVAILABLE: {
                    return {
                        ...state,
                        loading: false,
                        isUserNameAvailable: false,
                        error: action.payload.error,
                        trackEmailOrUserNameVerification: !state.trackEmailOrUserNameVerification,
                    };
                }
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        finishSignUp: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.RESEND_CONFIRMATION_EMAIL:
                case AuthActionTypes.VERIFY_EMAIL: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    };
                }
                default:
                    return state;
            }
        }
        case AuthActionTypes.SET_FINISHSIGNUP:
            return { ...state, finishSignUp: action.payload.finishSignUp };
        case AuthActionTypes.SET_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications?.some((x: Notification) => x.id === action.payload.notification.id)
                    ? state.notifications
                    : [...(state.notifications || []), action.payload.notification],
            };
        case AuthActionTypes.SET_CHATROOM:
            return {
                ...state,
                chatRooms: state.chatRooms?.some((x: ChatRoom) => x.id === action.payload.chatRoom.id)
                    ? [
                          ...state.chatRooms.filter((x: ChatRoom) => x.id !== action.payload.chatRoom.id),
                          action.payload.chatRoom,
                      ]
                    : [...(state.chatRooms || []), action.payload.chatRoom],
            };
        case AuthActionTypes.SET_ACTIF_ROOM:
            return {
                ...state,
                actifRoom: action.payload,
            };

        case AuthActionTypes.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload.notifications,
            };
        case AuthActionTypes.SET_CHATROOMS:
            return {
                ...state,
                chatRooms: action.payload.chatRooms,
            };
        case AuthActionTypes.RESEND_CONFIRMATION_EMAIL:
            return { ...state, loading: false };
        case AuthActionTypes.INTIALIZE_LOGIN: {
            return {
                ...state,
                isEmailConfirmed: true,
                notifications: state.notifications === undefined ? [] : state.notifications,
                chatRooms: state.chatRooms === undefined ? [] : state.chatRooms,
            };
        }
        case AuthActionTypes.LOGOUT_USER:
        case AuthActionTypes.LOGIN_USER:
        case AuthActionTypes.FORGOT_PASSWORD:
        case AuthActionTypes.RESET_PASSWORD:
        case AuthActionTypes.IS_EMAIL_AVAILABLE:
        case AuthActionTypes.IS_USERNAME_AVAILABLE:
        case AuthActionTypes.SIGNUP_USER:
        case AuthActionTypes.VERIFY_EMAIL:
            return { ...state, loading: true };
        default:
            return state;
    }
};

export default authReducer;
