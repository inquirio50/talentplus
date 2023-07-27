import { takeLatest, all, fork, call, put } from 'redux-saga/effects';
import i18n from '../../config/i18next';
import {
    successMessageModal,
    failMessageModal,
    apiResponseSuccess,
    GenericActions,
    apiResponseError,
} from '../../store/reducers/genericActions';
import {
    updateProfileUserApi,
    fetchProfileUserApi,
    profileAddExperience,
    profileEditExperience,
    profileDeleteExperience,
    profileAddEducation,
    profileEditEducation,
    profileDeleteEducation,
    fetchProfilParameters,
    fetchProfilParametersAdminSvc,
    getProfilePercentage,
} from '../GenericServer';
import { Profile } from '../../models/profile';
import { ResponseGenerator, Action } from '../../config/interfaces';
import { Experience } from '../../models/experience';
import { Education } from '../../models/education';

function* fetchProfileUser() {
    const payload: Action = {
        type: GenericActions.PROFILE_USERS_FETCH,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchProfileUserApi, lang);
        const profile: Profile = response.data;
        payload.payload = profile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* updateProfileUser(profilePayload: any) {
    const payload: Action = {
        type: GenericActions.PROFILE_USERS_UPDATE,
    };
    try {
        const response: ResponseGenerator = yield call(updateProfileUserApi, profilePayload.payload as Profile);
        const updatedProfile: Profile = response.data;
        payload.payload = updatedProfile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* profileAddExperienceAsync(payloadExperience: any) {
    const payload: Action = {
        type: GenericActions.EXPERIENCE_ADD,
    };
    try {
        const response: ResponseGenerator = yield call(profileAddExperience, payloadExperience.payload as Experience);
        const updatedProfile: Profile = response.data;
        payload.payload = updatedProfile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* profileEditExperienceAsync(payloadExperience: any) {
    const payload: Action = {
        type: GenericActions.EXPERIENCE_EDIT,
    };
    try {
        const response: ResponseGenerator = yield call(profileEditExperience, payloadExperience.payload as Experience);
        const updatedProfile: Profile = response.data;
        payload.payload = updatedProfile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* profileDeleteExperienceAsync(payloadExperienceId: any) {
    const payload: Action = {
        type: GenericActions.EXPERIENCE_DELETE,
    };
    try {
        const response: ResponseGenerator = yield call(profileDeleteExperience, payloadExperienceId.payload);
        const updatedProfile: Profile = response.data;
        payload.payload = updatedProfile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* fetchProfilParametersAsync() {
    const payload: Action = {
        type: GenericActions.FETCH_PROFIL_PARAMETER,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchProfilParameters, lang);
        payload.payload = response.data;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* fetchProfilParametersAdmin() {
    const payload: Action = {
        type: GenericActions.FETCH_PROFIL_PARAMETER_ADMIN,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchProfilParametersAdminSvc, lang);
        payload.payload = response.data;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* profileAddEducationAsync(payloadEducation: any) {
    const payload: Action = {
        type: GenericActions.EDUCATION_ADD,
    };
    try {
        const response: ResponseGenerator = yield call(profileAddEducation, payloadEducation.payload as Education);
        const updatedProfile: Profile = response.data;
        payload.payload = updatedProfile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* profileEditEducationAsync(payloadEducation: any) {
    const payload: Action = {
        type: GenericActions.EDUCATION_EDIT,
    };
    try {
        yield call(profileEditEducation, payloadEducation.payload as Education);
        // Success Edit
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* profileDeleteEducationAsync(payloadEducation: any) {
    const payload: Action = {
        type: GenericActions.EDUCATION_DELETE,
    };
    try {
        const response: ResponseGenerator = yield call(profileDeleteEducation, payloadEducation.payload);
        const updatedProfile: Profile = response.data;
        payload.payload = updatedProfile;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* getProfilePercentageAsync() {
    const payload: Action = {
        type: GenericActions.PERCENTAGE_CANDIDATE,
    };
    try {
        const response: ResponseGenerator = yield call(getProfilePercentage);
        const percentage: any = response.data;
        payload.payload = percentage;
        yield put(apiResponseSuccess(GenericActions.API_GENERIC_SUCCESS, payload));
    } catch (error: any) {
        yield put(apiResponseError(GenericActions.API_GENERIC_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

export function* onFetchProfile() {
    yield takeLatest(GenericActions.PROFILE_USERS_FETCH, fetchProfileUser);
}

export function* onUpdateProfile() {
    yield takeLatest(GenericActions.PROFILE_USERS_UPDATE, updateProfileUser);
}

export function* onProfileAddExperience() {
    yield takeLatest(GenericActions.EXPERIENCE_ADD, profileAddExperienceAsync);
}

export function* onProfileEditExperience() {
    yield takeLatest(GenericActions.EXPERIENCE_EDIT, profileEditExperienceAsync);
}

export function* onProfileDeleteExperience() {
    yield takeLatest(GenericActions.EXPERIENCE_DELETE, profileDeleteExperienceAsync);
}

export function* onProfileAddEducation() {
    yield takeLatest(GenericActions.EDUCATION_ADD, profileAddEducationAsync);
}

export function* onProfileEditEducation() {
    yield takeLatest(GenericActions.EDUCATION_EDIT, profileEditEducationAsync);
}

export function* onProfileDeleteEducation() {
    yield takeLatest(GenericActions.EDUCATION_DELETE, profileDeleteEducationAsync);
}

export function* onFetchProfilParameters() {
    yield takeLatest(GenericActions.FETCH_PROFIL_PARAMETER, fetchProfilParametersAsync);
}

export function* onFetchProfilParametersAdmin() {
    yield takeLatest(GenericActions.FETCH_PROFIL_PARAMETER_ADMIN, fetchProfilParametersAdmin);
}

export function* onGetPercentageProfile() {
    yield takeLatest(GenericActions.PERCENTAGE_CANDIDATE, getProfilePercentageAsync);
}

function* profileSaga(): any {
    yield all([
        fork(onFetchProfile),
        fork(onUpdateProfile),
        fork(onProfileAddExperience),
        fork(onProfileEditExperience),
        fork(onProfileDeleteExperience),
        fork(onProfileAddEducation),
        fork(onProfileEditEducation),
        fork(onProfileDeleteEducation),
        fork(onFetchProfilParameters),
        fork(onFetchProfilParametersAdmin),
        fork(onGetPercentageProfile),
    ]);
}

export default profileSaga;
