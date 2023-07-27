import { Action, SignUpForm, VerifyEmailDto } from '../../../config/interfaces';
import User from '../../../models/user';
import { Notification } from '../../../models/notification';
import ChatRoom from '../../../models/chatRoom';

export const AuthActionTypes = {
    AUTH_RESPONSE_SUCCESS: 'AUTH_RESPONSE_SUCCESS',
    AUTH_RESPONSE_ERROR: 'AUTH_RESPONSE_ERROR',
    SET_FINISHSIGNUP: 'SET_FINISHSIGNUP',
    RESEND_CONFIRMATION_EMAIL: 'RESEND_CONFIRMATION_EMAIL',
    INTIALIZE_LOGIN: 'INTIALIZE_LOGIN',
    SET_NOTIFICATION: 'SET_NOTIFICATION',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    SET_CHATROOM: 'SET_CHATROOM',
    SET_CHATROOMS: 'SET_CHATROOMS',
    SET_MESSAGE_READ: 'SET_MESSAGE_READ',
    SET_ACTIF_ROOM: 'SET_ACTIF_ROOM',

    LOGIN_USER: '@@auth/LOGIN_USER',
    LOGOUT_USER: '@@auth/LOGOUT_USER',
    FORGOT_PASSWORD: '@@auth/FORGOT_PASSWORD',
    RESET_PASSWORD: '@@auth/RESET_PASSWORD',
    IS_EMAIL_AVAILABLE: '@@auth/IS_EMAIL_AVAILABLE',
    IS_USERNAME_AVAILABLE: '@@auth/IS_USERNAME_AVAILABLE',
    SIGNUP_USER: '@@auth/SIGNUP_USER',
    VERIFY_EMAIL: '@@auth/VERIFY_EMAIL',
};

export const loginUser = (usernameOrEmail: string, password: string): Action => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { usernameOrEmail, password },
});

export const logoutUser = (): Action => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const forgotPassword = (email: string): Action => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { email },
});

export const resetPassword = (user: User): Action => ({
    type: AuthActionTypes.RESET_PASSWORD,
    payload: user,
});

export const isEmailAvailable = (email: string): Action => ({
    type: AuthActionTypes.IS_EMAIL_AVAILABLE,
    payload: { email },
});

export const isUserNameAvailable = (username: string): Action => ({
    type: AuthActionTypes.IS_USERNAME_AVAILABLE,
    payload: { username },
});

export const signupUser = (payload: SignUpForm): Action => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload,
});

export const verifyEmailAction = (payload: VerifyEmailDto): Action => ({
    type: AuthActionTypes.VERIFY_EMAIL,
    payload,
});

export const setFinishSignUp = (finishSignUp: boolean) => ({
    type: AuthActionTypes.SET_FINISHSIGNUP,
    payload: { finishSignUp },
});

export const resendConfirmationEmail = (email: string) => ({
    type: AuthActionTypes.RESEND_CONFIRMATION_EMAIL,
    payload: { email },
});

export const initializeLogin = () => ({
    type: AuthActionTypes.INTIALIZE_LOGIN,
});

export const setNotification = (notification: Notification) => ({
    type: AuthActionTypes.SET_NOTIFICATION,
    payload: { notification },
});

export const setNotifications = (notifications: Notification[]) => ({
    type: AuthActionTypes.SET_NOTIFICATIONS,
    payload: { notifications },
});

export const setChatRoom = (chatRoom: ChatRoom) => ({
    type: AuthActionTypes.SET_CHATROOM,
    payload: { chatRoom },
});

export const setChatRooms = (chatRooms: ChatRoom[]) => ({
    type: AuthActionTypes.SET_CHATROOMS,
    payload: { chatRooms },
});

export const setMessageRead = (roomId: string): Action => ({
    type: AuthActionTypes.SET_MESSAGE_READ,
    payload: roomId,
});

export const setActifRoom = (room: ChatRoom | undefined): Action => ({
    type: AuthActionTypes.SET_ACTIF_ROOM,
    payload: room,
});
