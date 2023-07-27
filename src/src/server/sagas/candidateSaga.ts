import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import {
    apiResponseError,
    apiResponseSuccess,
    failMessageModal,
    successMessageModal,
} from '../../store/reducers/genericActions';
import { Profile } from '../../models/profile';
import { AcceptOrDeclineMatch, Action, ResponseGenerator } from '../../config/interfaces';
import {
    matchDecision,
    getUserMatches,
    consultantChangeEmail,
    changeFullName,
    fetchConsultantProfile,
    updateProfile,
    changeEmail,
    toggleIsPublic,
    toggleIsAvailableToHire,
    deleteProfile,
    addEducation,
    acceptOrDeclineMatch,
    addExperience,
    updateAdditionalDetails,
    addResume,
    deleteResume,
    getResume,
    fetchCandidatetInfo,
    consultantSetMatchViewed,
    acceptOrDeclineMatchAgreement,
    fetchUserMatchInfo,
    getMatchStatisticsApi,
} from '../CandidateServer';

import { CandidateActionTypes } from '../../store/reducers/candidate/candidateActions';
import UserMatch from '../../models/userMatch';
import { Education } from '../../models/education';
import { Experience } from '../../models/experience';
import i18n from '../../config/i18next';

export function* onLoadConsultantAync() {
    const payload: Action = {
        type: CandidateActionTypes.CANDIDATE_FETCH_INFO,
    };
    try {
        const lang = i18n.resolvedLanguage.toLocaleUpperCase();
        const response: ResponseGenerator = yield call(fetchCandidatetInfo, lang);
        const profile: Profile = response.data;
        payload.payload = profile;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

export function* onLoadUserMatchAync(data: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_FETCH_MATCH,
    };
    try {
        const response: ResponseGenerator = yield call(fetchUserMatchInfo, data.payload);
        const userMatch: UserMatch = response.data;
        payload.payload = userMatch;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onGetUserMatchesAsync(data: any) {
    const payload: Action = {
        type: CandidateActionTypes.GET_USER_JOBS_MATCHES,
    };
    try {
        const response: ResponseGenerator = yield call(getUserMatches, data.payload);
        const userMatch: UserMatch[] = response.data;
        payload.payload = userMatch;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onSendJobMatchDecision(userMatch: any) {
    const payload: Action = {
        type: CandidateActionTypes.SEND_USER_JOB_MATCH_DECISION,
    };
    try {
        const response: ResponseGenerator = yield call(matchDecision, userMatch as UserMatch);
        const newUserMatch: UserMatch = response.data;
        payload.payload = newUserMatch;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal(response.data));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangeFullNameAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME,
    };
    try {
        const response: ResponseGenerator = yield call(changeFullName, data.payload as string);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Information was saved.'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* updateToogleIsPublic(payloadIsPublic: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_TOGGLE_ISPROFILEPUBLIC,
    };
    try {
        const response: ResponseGenerator = yield call(toggleIsPublic, payloadIsPublic.payload);
        const newProfile: Profile = response.data;
        payload.payload = newProfile;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(CandidateActionTypes.CONSULTANT_API_ACTIONS_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* onFetchConsultantAsync() {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_FETCH_PROFILE,
    };
    try {
        const response: ResponseGenerator = yield call(fetchConsultantProfile);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* updateToogleIsAvailableToHire(payloadIsAvailableHire: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE,
    };
    try {
        const response: ResponseGenerator = yield call(toggleIsAvailableToHire, payloadIsAvailableHire.payload);
        const newProfile: Profile = response.data;
        payload.payload = newProfile;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(apiResponseError(CandidateActionTypes.CONSULTANT_API_ACTIONS_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* onUpdateInformationAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_UPDATE_INFORMATION,
    };
    try {
        const response: ResponseGenerator = yield call(updateProfile, data.payload as Profile);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onChangeEmailAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_CHANGE_EMAIL,
    };
    try {
        const response: ResponseGenerator = yield call(changeEmail, data.payload as string);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        
        yield put(failMessageModal(error));
    }
}

function* updateEmail(payloadEmail: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_CHANGE_EMAIL,
    };
    try {
        const response: ResponseGenerator = yield call(consultantChangeEmail, payloadEmail.payload);
        const newProfile: Profile = response.data;
        payload.payload = newProfile;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* setMatchViewed(payloadMatch: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_SET_MATCHVIEWED,
    };
    try {
        const response: ResponseGenerator = yield call(consultantSetMatchViewed, payloadMatch.payload);
        const userMatch: UserMatch = response.data;
        payload.payload = userMatch;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onToggleIsAvailibleToHireAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_TOGGLE_IS_AVAILABLE_TO_HIRE,
    };
    try {
        const response: ResponseGenerator = yield call(toggleIsAvailableToHire, data.payload as boolean);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onToggleIsPublicAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_TOGGLE_IS_PUBLIC,
    };
    try {
        const response: ResponseGenerator = yield call(toggleIsPublic, data.payload as boolean);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onDeleteProfileAsync() {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_TOGGLE_IS_PUBLIC,
    };
    try {
        const response: ResponseGenerator = yield call(deleteProfile);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onAddEducationAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_ADD_EDUCATION,
    };
    try {
        const response: ResponseGenerator = yield call(addEducation, data.payload as Education);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Information was saved.'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onAddExperienceAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_ADD_EXPERIENCE,
    };
    try {
        const response: ResponseGenerator = yield call(addExperience, data.payload as Experience);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Information was saved.'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onAcceptOrDeclineMatchAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH,
    };
    try {
        const response: ResponseGenerator = yield call(acceptOrDeclineMatch, data.payload as AcceptOrDeclineMatch);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onAcceptOrDeclineMatchAgreementAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH_AGREEMENT,
    };
    try {
        const response: ResponseGenerator = yield call(acceptOrDeclineMatchAgreement, data.payload as AcceptOrDeclineMatch);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onUpdateAdditionalInformationAsync(data: any) {
    
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS,
    };
    try {
        const response: ResponseGenerator = yield call(updateAdditionalDetails, data.payload);
        const apiResponse: any = response.data;
        payload.payload = apiResponse;
        
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        yield put(successMessageModal('Success'));
    } catch (error: any) {
        
        payload.error = error;
        yield put(apiResponseError(CandidateActionTypes.CONSULTANT_API_ACTIONS_ERROR, payload));
        yield put(failMessageModal(error));
    }
}

function* onAddResumeAsync(data: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_ADD_RESUME,
    };
    try {
        const formFile = data.payload as FormData;
        yield call(addResume, formFile);
        payload.payload = formFile.get('File');
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        // yield put(successMessageModal('Information was saved.'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onDeleteResumeAsync() {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_DELETE_RESUME,
    };
    try {
        yield call(deleteResume);
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
        // yield put(successMessageModal('Information was saved.'));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* onGetResumeAsync(data: any) {
    const payload: Action = {
        type: CandidateActionTypes.CONSULTANT_GET_RESUME,
    };
    try {
        const response: ResponseGenerator = yield call(getResume, data.payload);
        payload.payload = response.status === 204 ? undefined : new File([response.data], 'Curriculum Vitae.pdf');
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

function* getMatchStatistics(data: any) {
    const payload: Action = {
        type: CandidateActionTypes.CANDIDATE_MATCH_STATISTICS,
    };
    try {
        const response: ResponseGenerator = yield call(getMatchStatisticsApi, data.payload);
        payload.payload = response.data;
        yield put(apiResponseSuccess(CandidateActionTypes.CONSULTANT_API_ACTIONS_SUCCESS, payload));
    } catch (error: any) {
        yield put(failMessageModal(error));
    }
}

export function* onLoadConsultant() {
    yield takeLatest(CandidateActionTypes.CANDIDATE_FETCH_INFO, onLoadConsultantAync);
}

function* onGetUserMatches(): any {
    yield takeLatest(CandidateActionTypes.GET_USER_JOBS_MATCHES, onGetUserMatchesAsync);
}

function* onLoadUserMatch(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_FETCH_MATCH, onLoadUserMatchAync);
}

function* onSendUserMatchesDecision(): any {
    yield takeLatest(CandidateActionTypes.SEND_USER_JOB_MATCH_DECISION, onSendJobMatchDecision);
}
function* onChangeFullName(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME, onChangeFullNameAsync);
}
function* onFetchConsultant(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_FETCH_PROFILE, onFetchConsultantAsync);
}
function* onUpdateInformation(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_UPDATE_INFORMATION, onUpdateInformationAsync);
}
function* onChangeEmail(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_CHANGE_EMAIL, onChangeEmailAsync);
}
function* onToggleIsAvailibleToHire(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_TOGGLE_IS_AVAILABLE_TO_HIRE, onToggleIsAvailibleToHireAsync);
}
function* onToggleIsPublic(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_TOGGLE_IS_PUBLIC, onToggleIsPublicAsync);
}
function* onDeleteProfile(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_DELETE_PROFILE, onDeleteProfileAsync);
}
function* onAddEducation(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_ADD_EDUCATION, onAddEducationAsync);
}
function* onAddExperience(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_ADD_EXPERIENCE, onAddExperienceAsync);
}
function* onAcceptOrDeclineMatch(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH, onAcceptOrDeclineMatchAsync);
}

function* onAcceptOrDeclineMatchAgreement(): any {
    yield takeLatest(
        CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH_AGREEMENT,
        onAcceptOrDeclineMatchAgreementAsync
    );
}
function* onUpdateAdditionalInformation(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS, onUpdateAdditionalInformationAsync);
}
function* onAddResume(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_ADD_RESUME, onAddResumeAsync);
}
function* onDeleteResume(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_DELETE_RESUME, onDeleteResumeAsync);
}
function* onGetResume(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_GET_RESUME, onGetResumeAsync);
}

function* onChangeConsultantIsPublic(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_TOGGLE_ISPROFILEPUBLIC, updateToogleIsPublic);
}

function* onChangeConsultantIsAvailableHire(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE, updateToogleIsAvailableToHire);
}

function* onChangeConsultantEmail(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_CHANGE_EMAIL, updateEmail);
}

function* onSetMatchViewed(): any {
    yield takeLatest(CandidateActionTypes.CONSULTANT_SET_MATCHVIEWED, setMatchViewed);
}

function* onGetMatchStatistics(): any {
    yield takeLatest(CandidateActionTypes.CANDIDATE_MATCH_STATISTICS, getMatchStatistics);
}

function* consultantSaga(): any {
    yield all([
        fork(onSendUserMatchesDecision),
        fork(onChangeFullName),
        fork(onFetchConsultant),
        fork(onUpdateInformation),
        fork(onChangeEmail),
        fork(onToggleIsAvailibleToHire),
        fork(onToggleIsPublic),
        fork(onDeleteProfile),
        fork(onAddEducation),
        fork(onAddExperience),
        fork(onAcceptOrDeclineMatch),
        fork(onAcceptOrDeclineMatchAgreement),
        fork(onUpdateAdditionalInformation),
        fork(onAddResume),
        fork(onDeleteResume),
        fork(onGetResume),
        fork(onLoadConsultant),
        fork(onGetUserMatches),
        fork(onSendUserMatchesDecision),
        fork(onChangeConsultantIsPublic),
        fork(onChangeConsultantIsAvailableHire),
        fork(onChangeConsultantEmail),
        fork(onSetMatchViewed),
        fork(onLoadUserMatch),
        fork(onGetMatchStatistics),
    ]);
}

export default consultantSaga;
