import { VerifyEmailDto } from '../config/interfaces';
import User from '../models/user';
import ActionBase from './ActionBase';

const actionBase = ActionBase.getInstance();

export const loginAuth = async (user: User): Promise<any> => {
    const result = await actionBase.post<User>('/account/login', user);
    return result;
};

export const logoutAuth = async () => {
    await actionBase.post<User>('/Account/logout/');
};

export const forgotPassword = async (user: User): Promise<any> => {
    const result = await actionBase.post<User>('/Account/ForgotPassword/', user);
    return result;
};

export const resetPassword = async (user: User): Promise<any> => {
    const result = await actionBase.post<User>('/Account/ResetPassword/', user);
    return result;
};

export const isEmailAvailable = async (email: string): Promise<any> => {
    const result = await actionBase.get(`/Account/isEmailAvailable?email=${encodeURIComponent(email)}`);
    return result;
};

export const isUserNameAvailable = async (username: string): Promise<any> => {
    const result = await actionBase.get(`/Account/isUsernameAvailable?username=${username}`);
    return result;
};

export const signupApi = async (signUpForm: FormData): Promise<any> => {
    const result = await actionBase.post<FormData>('/Account/register', signUpForm);
    return result;
};

export const verifyEmailApi = async (data: VerifyEmailDto): Promise<any> => {
    const result = await actionBase.post('/Account/VerifyEmail', data);
    return result;
};

export const resendConfirmationEmailApi = async (email: string): Promise<any> => {
    const result = await actionBase.get(`/Account/ResendEmailConfirmationLink?email=${encodeURIComponent(email)}`);
    return result;
};

export const setMessageReadApi = async (roomId: string): Promise<any> => {
    const result = await actionBase.patch(`/Chat/SetMessageRead?roomId=${roomId}`);
    return result;
};
