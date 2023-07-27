import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { Action, ResponseGenerator, VerifyEmailDto } from '../../config/interfaces';
import { persistor } from '../..';
import User from '../../models/user';
import {
    forgotPassword,
    loginAuth,
    logoutAuth,
    resetPassword,
    signupApi,
    isEmailAvailable as isEmailAvailableApi,
    isUserNameAvailable as isUserNameAvailableApi,
    verifyEmailApi,
    resendConfirmationEmailApi,
    setMessageReadApi,
} from '../AuthServer';
import { AuthActionTypes } from '../../store/reducers/auth/authActions';
import {
    apiResponseError,
    apiResponseSuccess,
    failMessageModal,
    infoMessageModal,
    successMessageModal,
} from '../../store/reducers/genericActions';
import ChatRoom from '../../models/chatRoom';

function* login({ payload: { usernameOrEmail, password } }: any) {
    const payload: Action = {
        type: AuthActionTypes.LOGIN_USER,
    };
    try {
        const userObj: User = {
            usernameOrEmail,
            password,
        };
        const response: ResponseGenerator = yield call(loginAuth, userObj);
        const user: User = response.data;
        payload.payload = user;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        if (!user.isEmailConfirmed) yield put(failMessageModal('Email not confirmed'));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* logout() {
    const payload: Action = {
        type: AuthActionTypes.LOGOUT_USER,
    };
    try {
        yield call(logoutAuth);
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        persistor.purge();
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* forgotPasswordSaga({ payload: { email } }: any) {
    const payload: Action = {
        type: AuthActionTypes.FORGOT_PASSWORD,
    };
    try {
        const userObj: User = {
            email,
        };
        const response: ResponseGenerator = yield call(forgotPassword, userObj);
        payload.payload = response.data;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        yield put(successMessageModal(response.data));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
    }
}

function* resetPasswordSaga(data: any) {
    const payload: Action = {
        type: AuthActionTypes.RESET_PASSWORD,
    };
    try {
        const userObj: User = {
            ...data.payload,
        };
        const response: ResponseGenerator = yield call(resetPassword, userObj);
        payload.payload = response.data;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        yield put(successMessageModal(response.data));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* isEmailAvailable({ payload: { email } }: any) {
    const payload: Action = {
        type: AuthActionTypes.IS_EMAIL_AVAILABLE,
    };
    try {
        const response: ResponseGenerator = yield call(isEmailAvailableApi, email);
        const isSuccess = response.status === 200;
        payload.payload = { isEmailAvailable: isSuccess };
        if (isSuccess) yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        else {
            yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, { ...payload, error: 'emailExists' }));
            yield put(failMessageModal('emailExists'));
        }
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(infoMessageModal(error));
    }
}

function* setMessageReadAsync(payloadMatch: any) {
    const payload: Action = {
        type: AuthActionTypes.SET_MESSAGE_READ,
    };
    try {
        const response: ResponseGenerator = yield call(setMessageReadApi, payloadMatch.payload);
        const chatRooms: ChatRoom[] = response.data;
        payload.payload = { chatRooms };
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* isUserNameAvailable({ payload: { username } }: any) {
    const payload: Action = {
        type: AuthActionTypes.IS_USERNAME_AVAILABLE,
    };
    try {
        const response: ResponseGenerator = yield call(isUserNameAvailableApi, username);

        payload.payload = { isUserNameAvailable: response.status === 200 };

        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(infoMessageModal(error));
    }
}

function* signup({ payload: { ...formData } }: any) {
    const payload: Action = {
        type: AuthActionTypes.SIGNUP_USER,
    };
    try {
        const registerData = new FormData();
        registerData.append('File', formData.resume);
        registerData.append(
            'Data',
            JSON.stringify({ ...formData, resume: undefined, questionaire: JSON.stringify(formData.questionaire) })
        );

        const response: ResponseGenerator = yield call(signupApi, registerData);

        const user: User = response.data;
        payload.payload = user;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        yield put(successMessageModal(response.data));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* verifyEmail({ payload: { ...data } }: any) {
    const payload: Action = {
        type: AuthActionTypes.VERIFY_EMAIL,
    };
    try {
        const verifyEmailDto: VerifyEmailDto = {
            ...data,
        };
        const response: ResponseGenerator = yield call(verifyEmailApi, verifyEmailDto);
        const info = response.data;
        payload.payload = info;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        yield put(successMessageModal(response.data));
    } catch (error: any) {
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* resendConfirmationEmail({ payload: { email } }: any) {
    const payload: Action = {
        type: AuthActionTypes.RESEND_CONFIRMATION_EMAIL,
    };
    try {
        const response: ResponseGenerator = yield call(resendConfirmationEmailApi, email);
        const info = response.data;
        payload.payload = info;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        yield put(successMessageModal('ConfirmationResent'));
    } catch (error: any) {
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPasswordSaga);
}

export function* watchResetPassword(): any {
    yield takeEvery(AuthActionTypes.RESET_PASSWORD, resetPasswordSaga);
}

export function* watchIsEmailAvailable(): any {
    yield takeEvery(AuthActionTypes.IS_EMAIL_AVAILABLE, isEmailAvailable);
}

export function* watchIsUsernameAvailable(): any {
    yield takeEvery(AuthActionTypes.IS_USERNAME_AVAILABLE, isUserNameAvailable);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchLogout(): any {
    yield takeLatest(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchVerifyEmail(): any {
    yield takeLatest(AuthActionTypes.VERIFY_EMAIL, verifyEmail);
}

export function* watchResendConfirmationEmail(): any {
    yield takeLatest(AuthActionTypes.RESEND_CONFIRMATION_EMAIL, resendConfirmationEmail);
}

export function* onSetMessageRead() {
    yield takeLatest(AuthActionTypes.SET_MESSAGE_READ, setMessageReadAsync);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchForgotPassword),
        fork(watchResetPassword),
        fork(watchIsEmailAvailable),
        fork(watchIsUsernameAvailable),
        fork(watchSignup),
        fork(watchVerifyEmail),
        fork(watchResendConfirmationEmail),
        fork(onSetMessageRead),
    ]);
}

export default authSaga;
