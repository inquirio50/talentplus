import { Action } from '../../../config/interfaces';
import { Jobs } from '../../../models/jobs';
import { Profile } from '../../../models/profile';

export const RecruiterActionTypes = {
    EMPLOYER_API_ACTIONS_SUCCESS: 'EMPLOYER_API_ACTIONS_SUCCESS',
    EMPLOYER_FETCH_PROFILE: 'EMPLOYER_FETCH_PROFILE',
    EMPLOYER_FETCH_JOBS: 'EMPLOYER_FETCH_JOBS',
    UPDATE_EMPLOYER_PROFILE: 'UPDATE_EMPLOYER_PROFILE',
    USER_MATCHES_LIST: 'USER_MATCHES_LIST',
    EMPLOYER_ACCEPT_OR_DECLINE_MATCH: 'EMPLOYER_ACCEPT_OR_DECLINE_MATCH',
    EMPLOYER_FETCH_MATCHES: 'EMPLOYER_FETCH_MATCHES',
    RECRUITER_CHANGE_TITLE: 'RECRUITER_CHANGE_TITLE',
    RECRUITER_CHANGE_DEPARTMENT: 'RECRUITER_CHANGE_DEPARTMENT',
    RECRUITER_CHANGE_PHONE: 'RECRUITER_CHANGE_PHONE',
    RECRUITER_CHANGE_EMAIL: 'RECRUITER_CHANGE_EMAIL',
    RECRUITER_UPDATE_COMPANY: 'RECRUITER_UPDATE_COMPANY',
    RECRUITER_FETCH_COMPANY: 'RECRUITER_FETCH_COMPANY',
    RECRUITER_CREATE_JOB: 'RECRUITER_CREATE_JOB',
    RECRUITER_UPDATE_JOB: 'RECRUITER_UPDATE_JOB',
    RECRUITER_ACCEPT_OR_DECLINE_MATCH: 'RECRUITER_ACCEPT_OR_DECLINE_MATCH',
    RECRUITER_FETCH_MATCHES: 'RECRUITER_FETCH_MATCHES',
    RECRUITER_FETCH_ALL_JOBS: 'RECRUITER_FETCH_ALL_JOBS',
    RECRUITER_DELETE_JOB: 'RECRUITER_DELETE_JOB',
    RECRUITER_FETCH_JOB: 'RECRUITER_FETCH_JOB',
    RECRUITER_CHANGE_FIRST_NAME: 'RECRUITER_CHANGE_FIRST_NAME',
    RECRUITER_CHANGE_LAST_NAME: 'RECRUITER_CHANGE_LAST_NAME',
    RECRUITER_UPDATE_PROFIL: 'RECRUITER_UPDATE_PROFIL',
};

export const dispatchEmployerFetchProfile = (data?: Profile): Action => ({
    type: RecruiterActionTypes.EMPLOYER_FETCH_PROFILE,
    payload: data,
});

export const recruiterProfileUpdateInfo = (profile: any): Action => ({
    type: RecruiterActionTypes.RECRUITER_UPDATE_PROFIL,
    payload: profile,
});

export const dispatchFetchAllJobs = (data?: Jobs[]): Action => ({
    type: RecruiterActionTypes.EMPLOYER_FETCH_JOBS,
    payload: data,
});

export const dispatchFetchMatches = (data?: any): Action => ({
    type: RecruiterActionTypes.EMPLOYER_FETCH_MATCHES,
    payload: data,
});

export const dispatchChangeFirstName = (data: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_CHANGE_FIRST_NAME,
    payload: data,
});

export const dispatchChangeLastName = (data: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_CHANGE_LAST_NAME,
    payload: data,
});

export const dispatchChangeTitle = (data: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_CHANGE_TITLE,
    payload: data,
});

export const dispatchChangeDepartment = (data: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_CHANGE_DEPARTMENT,
    payload: data,
});

export const dispatchChangeEmail = (data: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_CHANGE_EMAIL,
    payload: data,
});

export const dispatchChangePhoneNumber = (data: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_CHANGE_PHONE,
    payload: data,
});

export const dispatchFetchCompany = (): Action => ({
    type: RecruiterActionTypes.RECRUITER_FETCH_COMPANY,
});

export const dispatchUpdateCompany = (data: any): Action => ({
    type: RecruiterActionTypes.RECRUITER_UPDATE_COMPANY,
    payload: data,
});

export const createJob = (data: any): Action => ({
    type: RecruiterActionTypes.RECRUITER_CREATE_JOB,
    payload: data,
});

export const updateJob = (data: any): Action => ({
    type: RecruiterActionTypes.RECRUITER_UPDATE_JOB,
    payload: data,
});

export const recruiterAcceptOrDeclineMatch = (data: any): Action => ({
    type: RecruiterActionTypes.RECRUITER_ACCEPT_OR_DECLINE_MATCH,
    payload: data,
});

export const recruiterFetchMatches = (): Action => ({
    type: RecruiterActionTypes.RECRUITER_FETCH_MATCHES,
});

export const recruiterFetchAllJobs = (): Action => ({
    type: RecruiterActionTypes.RECRUITER_FETCH_ALL_JOBS,
});

export const recruiterDeleteJob = (id: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_DELETE_JOB,
    payload: id,
});

export const recruiterFetchJob = (id: string): Action => ({
    type: RecruiterActionTypes.RECRUITER_FETCH_JOB,
    payload: id,
});
