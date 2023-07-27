import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { Action, ResponseGenerator } from '../../config/interfaces';
import {
    getListUsers,
    createChat as createChatApi,
    createUser,
    changePasswordUser,
    deleteUser,
    getCategories,
    editCategory,
    getLegends,
    editLegend,
    editLegendCategory,
} from '../AdminServer';
import { AdminActionTypes } from '../../store/reducers/admin/adminActions';
import {
    apiResponseError,
    apiResponseSuccess,
    infoMessageModal,
    successMessageModal,
} from '../../store/reducers/genericActions';

function* listUsersSaga({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_REGISTERED_USERS_LIST,
    };
    try {
        const response: ResponseGenerator = yield call(getListUsers, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* listCategoriesSaga() {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_CATEGORIES_LIST,
    };
    try {
        const response: ResponseGenerator = yield call(getCategories);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* listLegendsSaga() {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_LEGENDS_LIST,
    };
    try {
        const response: ResponseGenerator = yield call(getLegends);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* createChat({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_CREATE_CHAT,
    };
    try {
        const response: ResponseGenerator = yield call(createChatApi, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
    }
}

function* createUserAdmin({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_CREATE_USER,
    };
    try {
        const response: ResponseGenerator = yield call(createUser, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
        yield put(successMessageModal('New User was created.'));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* updateCategory({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_CATEGORY_UPDATE,
    };
    try {
        const response: ResponseGenerator = yield call(editCategory, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* updateLegend({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_LEGEND_UPDATE,
    };
    try {
        const response: ResponseGenerator = yield call(editLegend, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* updateLegendCategory({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_LEGEND_CATEGORY_UPDATE,
    };
    try {
        const response: ResponseGenerator = yield call(editLegendCategory, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* changeUserPassword({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_RESET_PASSWORD,
    };
    try {
        const response: ResponseGenerator = yield call(changePasswordUser, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
        yield put(successMessageModal('The password was changed.'));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

function* deleteUserAdmin({ payload }: any) {
    const returnPayload: Action = {
        type: AdminActionTypes.ADMIN_DELETE_USER,
    };
    try {
        const response: ResponseGenerator = yield call(deleteUser, payload);
        returnPayload.payload = response.data;
        yield put(apiResponseSuccess(AdminActionTypes.ADMIN_RESPONSE_SUCCESS, returnPayload));
        yield put(successMessageModal('The user was removed.'));
    } catch (error: any) {
        returnPayload.error = error;
        yield put(apiResponseError(AdminActionTypes.ADMIN_RESPONSE_ERROR, returnPayload));
        yield put(infoMessageModal(error));
    }
}

export function* watchListUsers(): any {
    yield takeLatest(AdminActionTypes.ADMIN_REGISTERED_USERS_LIST, listUsersSaga);
}
export function* watchListCategories(): any {
    yield takeLatest(AdminActionTypes.ADMIN_CATEGORIES_LIST, listCategoriesSaga);
}
export function* watchListLegends(): any {
    yield takeLatest(AdminActionTypes.ADMIN_LEGENDS_LIST, listLegendsSaga);
}
export function* watchCreateChat(): any {
    yield takeLatest(AdminActionTypes.ADMIN_CREATE_CHAT, createChat);
}
export function* watchCreateUser(): any {
    yield takeLatest(AdminActionTypes.ADMIN_CREATE_USER, createUserAdmin);
}

export function* watchResetPassword(): any {
    yield takeLatest(AdminActionTypes.ADMIN_RESET_PASSWORD, changeUserPassword);
}

export function* watchDeleteUser(): any {
    yield takeLatest(AdminActionTypes.ADMIN_DELETE_USER, deleteUserAdmin);
}

export function* watchUpdatecategory(): any {
    yield takeLatest(AdminActionTypes.ADMIN_CATEGORY_UPDATE, updateCategory);
}

export function* watchUpdateLegend(): any {
    yield takeLatest(AdminActionTypes.ADMIN_LEGEND_UPDATE, updateLegend);
}

export function* watchUpdateLegendCategory(): any {
    yield takeLatest(AdminActionTypes.ADMIN_LEGEND_CATEGORY_UPDATE, updateLegendCategory);
}

function* adminSaga(): any {
    yield all([
        fork(watchListUsers),
        fork(watchCreateChat),
        fork(watchCreateUser),
        fork(watchResetPassword),
        fork(watchDeleteUser),
        fork(watchListCategories),
        fork(watchUpdatecategory),
        fork(watchListLegends),
        fork(watchUpdateLegend),
        fork(watchUpdateLegendCategory),
    ]);
}

export default adminSaga;
