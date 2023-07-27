import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { Action, ResponseGenerator } from '../../config/interfaces';
import { Profile } from '../../models/profile';
import { apiResponseSuccess, failMessageModal, successMessageModal } from '../../store/reducers/genericActions';
import { RecruiterActionTypes } from '../../store/reducers/recruiter/recruiterActions';
import {
    fetchEmployerProfile,
    changeTitle,
    changeDepartment,
    changePhoneNumber,
    changeEmail,
    createJob,
    updateJob,
    sendAcceptOrDeclineMatch,
    fetchUserMatches,
    fetchAllJobs,
    deleteJob,
    fetchJob,
    changeFirstName,
    changeLastName,
    updateCompany,
} from '../RecruiterServer';
import { updateProfileUserApi } from '../GenericServer';
import i18n from '../../config/i18next';

function* onFetchEmployerProfileAsync() {
    const payload: Action = {
        type: RecruiterActionTypes.EMPLOYER_FETCH_PROFILE,
    };
    try {
        const response: ResponseGenerator = yield call(fetchEmployerProfile);
        const profile: Profile = response.data;
        payload.payload = profile;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* updateProfileCompany(profilePayload: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_UPDATE_PROFIL,
    };
    try {
        yield call(updateProfileUserApi, profilePayload.payload as Profile);
        payload.payload = profilePayload.payload;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangeFirstName(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CHANGE_FIRST_NAME,
    };
    try {
        const response: ResponseGenerator = yield call(changeFirstName, data);
        const firstName: string = response.data;
        payload.payload = firstName;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('profileUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}
function* onChangeLastName(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CHANGE_LAST_NAME,
    };
    try {
        const response: ResponseGenerator = yield call(changeLastName, data);
        const lastName: string = response.data;
        payload.payload = lastName;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('profileUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangeTitleAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CHANGE_TITLE,
    };
    try {
        const response: ResponseGenerator = yield call(changeTitle, data);
        const title: string = response.data;
        payload.payload = title;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('profileUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangeEmailAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CHANGE_EMAIL,
    };
    try {
        const response: ResponseGenerator = yield call(changeEmail, data);
        const email: string = response.data;
        payload.payload = email;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('profileUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangeDepartmentAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CHANGE_DEPARTMENT,
    };
    try {
        const response: ResponseGenerator = yield call(changeDepartment, data);
        const department: string = response.data;
        payload.payload = department;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('profileUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangePhoneAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CHANGE_PHONE,
    };
    try {
        const response: ResponseGenerator = yield call(changePhoneNumber, data);
        const phoneNumber: string = response.data;
        payload.payload = phoneNumber;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('profileUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onCreateJobAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_CREATE_JOB,
    };
    try {
        const response: ResponseGenerator = yield call(createJob, data.payload);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onUpdateJobAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_UPDATE_JOB,
    };
    try {
        const response: ResponseGenerator = yield call(updateJob, data.payload);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('jobUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onAcceptOrDeclineMatchAsync(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_ACCEPT_OR_DECLINE_MATCH,
    };
    try {
        const response: ResponseGenerator = yield call(sendAcceptOrDeclineMatch, data.payload);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onFetchMatchesAsync() {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_FETCH_MATCHES,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchUserMatches, lang);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onFetchAllJobsAsync() {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_FETCH_ALL_JOBS,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchAllJobs, lang);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onDeleteJob(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_DELETE_JOB,
    };
    try {
        const response: ResponseGenerator = yield call(deleteJob, data.payload);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onFetchJob(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_FETCH_JOB,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchJob, data.payload, lang);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}
function* onUpdateCompany(data: any) {
    const payload: Action = {
        type: RecruiterActionTypes.RECRUITER_UPDATE_COMPANY,
    };
    try {
        const response: ResponseGenerator = yield call(updateCompany, data.payload);
        payload.payload = response.data;
        yield put(apiResponseSuccess(RecruiterActionTypes.EMPLOYER_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('companyUpdateSuccess'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* watchFetchEmployerProfile(): any {
    yield takeLatest(RecruiterActionTypes.EMPLOYER_FETCH_PROFILE, onFetchEmployerProfileAsync);
}
function* watchChangeTitle(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CHANGE_TITLE, onChangeTitleAsync);
}
function* watchChangeDepartment(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CHANGE_DEPARTMENT, onChangeDepartmentAsync);
}
function* watchChangeEmail(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CHANGE_EMAIL, onChangeEmailAsync);
}
function* watchChangePhone(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CHANGE_PHONE, onChangePhoneAsync);
}
function* watchCreateJob(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CREATE_JOB, onCreateJobAsync);
}
function* watchUpdateJob(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_UPDATE_JOB, onUpdateJobAsync);
}
function* watchAcceptOrDeclineMatch(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_ACCEPT_OR_DECLINE_MATCH, onAcceptOrDeclineMatchAsync);
}
function* watchFetchMatches(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_FETCH_MATCHES, onFetchMatchesAsync);
}
function* watchFetchAllJobs(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_FETCH_ALL_JOBS, onFetchAllJobsAsync);
}
function* watchDeleteJob(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_DELETE_JOB, onDeleteJob);
}
function* watchFetchJob(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_FETCH_JOB, onFetchJob);
}
function* watchFirstName(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CHANGE_FIRST_NAME, onChangeFirstName);
}
function* watchLastName(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_CHANGE_LAST_NAME, onChangeLastName);
}
function* watchUpdateCompany(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_UPDATE_COMPANY, onUpdateCompany);
}
function* watchUpdateProfileCompany(): any {
    yield takeLatest(RecruiterActionTypes.RECRUITER_UPDATE_PROFIL, updateProfileCompany);
}

function* recruiterSaga(): any {
    yield all([
        fork(watchFetchEmployerProfile),
        fork(watchChangeTitle),
        fork(watchChangeDepartment),
        fork(watchChangeEmail),
        fork(watchChangePhone),
        fork(watchCreateJob),
        fork(watchUpdateJob),
        fork(watchAcceptOrDeclineMatch),
        fork(watchFetchMatches),
        fork(watchFetchAllJobs),
        fork(watchDeleteJob),
        fork(watchFetchJob),
        fork(watchFirstName),
        fork(watchLastName),
        fork(watchUpdateCompany),
        fork(watchUpdateProfileCompany),
    ]);
}

export default recruiterSaga;
