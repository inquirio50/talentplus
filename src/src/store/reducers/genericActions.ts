import { Experience } from '../../models/experience';
import { Profile } from '../../models/profile';
import { Action, FormDataType } from '../../config/interfaces';
import { Education } from '../../models/education';

export const GenericActions = {
    API_GENERIC_SUCCESS: 'API_GENERIC_SUCCESS',
    API_GENERIC_ERROR: 'API_GENERIC_ERROR',
    CLOSE_MESSAGE_MODAL: 'CLOSE_MESSAGE_MODAL',
    SUCCESS_MESSAGE_MODAL: 'SUCCESS_MESSAGE_MODAL',
    FAIL_MESSAGE_MODAL: 'FAIL_MESSAGE_MODAL',
    INFO_MESSAGE_MODAL: 'INFO_MESSAGE_MODAL',
    PROFILE_USERS_FETCH: 'PROFILE_USERS_FETCH',
    PROFILE_USERS_UPDATE: 'PROFILE_USERS_UPDATE',
    REQUEST_APP_REFRESH: 'REQUEST_APP_REFRESH',
    EXPERIENCE_ADD: 'EXPERIENCE_ADD',
    EXPERIENCE_EDIT: 'EXPERIENCE_EDIT',
    EXPERIENCE_DELETE: 'EXPERIENCE_DELETE',
    EDUCATION_ADD: 'EDUCATION_ADD',
    EDUCATION_EDIT: 'EDUCATION_EDIT',
    EDUCATION_DELETE: 'EDUCATION_DELETE',
    FETCH_PROFIL_PARAMETER: 'FETCH_PROFIL_PARAMETER',
    FETCH_PROFIL_PARAMETER_ADMIN: 'FETCH_PROFIL_PARAMETER_ADMIN',
    REGISTER_SAVE_FORM: 'REGISTER_SAVE_FORM',
    PERCENTAGE_CANDIDATE: 'PERCENTAGE_CANDIDATE',
};

// Service Worker request

export const refreshApp = (update: Boolean): Action => ({
    type: GenericActions.REQUEST_APP_REFRESH,
    payload: update,
});

// Generic Api Response Generic Action
export const apiResponseSuccess = (actionType: string, payload: Action): Action => ({
    type: actionType,
    payload: { actionType: payload.type, data: payload.payload },
});

export const apiResponseError = (actionType: string, payload: Action): Action => ({
    type: actionType,
    payload: { actionType: payload.type, data: payload.error },
});

export const infoMessageModal = (message: string): Action => ({
    type: GenericActions.INFO_MESSAGE_MODAL,
    payload: message,
});

export const successMessageModal = (message: string): Action => ({
    type: GenericActions.SUCCESS_MESSAGE_MODAL,
    payload: message,
});

export const failMessageModal = (message: string): Action => ({
    type: GenericActions.FAIL_MESSAGE_MODAL,
    payload: message,
});

export const closeMessageModal = (): Action => ({
    type: GenericActions.CLOSE_MESSAGE_MODAL,
    payload: false,
});

// Profile Action

export const profileFetchAction = (): Action => ({
    type: GenericActions.PROFILE_USERS_FETCH,
});

export const profileUpdateAction = (profile: Profile): Action => ({
    type: GenericActions.PROFILE_USERS_FETCH,
    payload: profile,
});

export const profileUpdateInfo = (profile: Profile): Action => ({
    type: GenericActions.PROFILE_USERS_UPDATE,
    payload: profile,
});

export const prodileAddExperience = (experience: Experience): Action => ({
    type: GenericActions.EXPERIENCE_ADD,
    payload: experience,
});

export const prodileEditExperience = (experience: Experience): Action => ({
    type: GenericActions.EXPERIENCE_EDIT,
    payload: experience,
});

export const prodileDeleteExperience = (id: string): Action => ({
    type: GenericActions.EXPERIENCE_DELETE,
    payload: id,
});

export const prodileAddEducation = (education: Education): Action => ({
    type: GenericActions.EDUCATION_ADD,
    payload: education,
});

export const prodileEditEducation = (education: Education): Action => ({
    type: GenericActions.EDUCATION_EDIT,
    payload: education,
});

export const prodileDeleteEducation = (id: string): Action => ({
    type: GenericActions.EDUCATION_DELETE,
    payload: id,
});

export const fetchProfilParameters = (): Action => ({
    type: GenericActions.FETCH_PROFIL_PARAMETER,
});

export const fetchParametersAdmin = (): Action => ({
    type: GenericActions.FETCH_PROFIL_PARAMETER_ADMIN,
});

export const saveRegisterForm = (form: FormDataType): Action => ({
    type: GenericActions.REGISTER_SAVE_FORM,
    payload: form,
});

export const getPercentageProfile = (): Action => ({
    type: GenericActions.PERCENTAGE_CANDIDATE,
});
