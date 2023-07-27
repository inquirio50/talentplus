import { AcceptOrDeclineMatch, AcceptOrDeclineMatchAgreement, Action } from '../../../config/interfaces';
import { Education } from '../../../models/education';
import { Experience } from '../../../models/experience';
import { Profile } from '../../../models/profile';
import UserMatch from '../../../models/userMatch';

export const CandidateActionTypes = {
    CONSULTANT_API_ACTIONS_SUCCESS: 'CONSULTANT_API_ACTIONS_SUCCESS',
    CONSULTANT_API_ACTIONS_ERROR: 'CONSULTANT_API_ACTIONS_ERROR',
    CANDIDATE_FETCH_INFO: 'CANDIDATE_FETCH_INFO',
    GET_USER_JOBS_MATCHES: 'GET_USER_JOBS_MATCHES',
    SEND_USER_JOB_MATCH_DECISION: 'SEND_USER_JOB_MATCH_DECISION',
    CONSULTANT_CHANGE_FULL_NAME: 'CHANGE_FULL_NAME_CAT',
    CONSULTANT_FETCH_PROFILE: 'FETCH_CONSULTANT_CAT',
    CONSULTANT_UPDATE_INFORMATION: 'CONSULTANT_UPDATE_INFORMATION',
    CONSULTANT_CHANGE_EMAIL: 'CONSULTANT_CHANGE_EMAIL',
    CONSULTANT_TOGGLE_IS_PUBLIC: 'CONSULTANT_TOGGLE_IS_PUBLIC',
    CONSULTANT_TOGGLE_IS_AVAILABLE_TO_HIRE: 'CONSULTANT_TOGGLE_IS_AVAILABLE_TO_HIRE',
    CONSULTANT_DELETE_PROFILE: 'CONSULTANT_DELETE_PROFILE',
    CONSULTANT_ADD_EDUCATION: 'CONSULTANT_ADD_EDUCATION',
    CONSULTANT_EDIT_EDUCATION: 'CONSULTANT_EDIT_EDUCATION',
    CONSULTANT_DELETE_EDUCATION: 'CONSULTANT_DELETE_EDUCATION',
    CONSULTANT_ADD_EXPERIENCE: 'CONSULTANT_ADD_EXPERIENCE',
    CONSULTANT_EDIT_EXPERIENCE: 'CONSULTANT_EDIT_EXPERIENCE',
    CONSULTANT_DELETE_EXPERIENCE: 'CONSULTANT_DELETE_EXPERIENCE',
    CONSULTANT_ACCEPT_OR_DECLINE_MATCH: 'CONSULTANT_ACCEPT_OR_DECLINE_MATCH',
    CONSULTANT_UPDATE_ADDITIONAL_DETAILS: 'CONSULTANT_UPDATE_ADDITIONAL_DETAILS',
    CONSULTANT_ADD_RESUME: 'CONSULTANT_ADD_RESUME',
    CONSULTANT_DELETE_RESUME: 'CONSULTANT_DELETE_RESUME',
    CONSULTANT_GET_RESUME: 'CONSULTANT_GET_RESUME',
    CONSULTANT_TOGGLE_ISPROFILEPUBLIC: 'CONSULTANT_TOGGLE_ISPROFILEPUBLIC',
    CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE: 'CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE',
    CONSULTANT_SET_MATCHVIEWED: 'CONSULTANT_SET_MATCHVIEWED',
    CONSULTANT_SET_CURRENT_MATCH: 'CONSULTANT_SET_CURRENT_MATCH',
    CONSULTANT_ACCEPT_OR_DECLINE_MATCH_AGREEMENT: 'CONSULTANT_ACCEPT_OR_DECLINE_MATCH_AGREEMENT',
    CONSULTANT_FETCH_MATCH: 'CONSULTANT_FETCH_MATCH',
    CANDIDATE_MATCH_STATISTICS: 'CANDIDATE_MATCH_STATISTICS',
};

export const fetchCandidatetInfo = (): Action => ({
    type: CandidateActionTypes.CANDIDATE_FETCH_INFO,
});

export const getUserJobsMatch = (status?: any): Action => ({
    type: CandidateActionTypes.GET_USER_JOBS_MATCHES,
    payload: status,
});

export const sendJobMatchApplicationDecision = (data: any): Action => ({
    type: CandidateActionTypes.SEND_USER_JOB_MATCH_DECISION,
    payload: data,
});

export const changeFullName = (fullName: string | undefined): Action => ({
    type: CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME,
    payload: fullName,
});

export const fetchConsultant = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_FETCH_PROFILE,
});

export const updateInformation = (profile: Profile): Action => ({
    type: CandidateActionTypes.CONSULTANT_UPDATE_INFORMATION,
    payload: profile,
});

export const changeEmail = (email: string): Action => ({
    type: CandidateActionTypes.CONSULTANT_CHANGE_EMAIL,
    payload: email,
});

export const toggleIsAvailableToHire = (isAvailable: boolean): Action => ({
    type: CandidateActionTypes.CONSULTANT_TOGGLE_IS_AVAILABLE_TO_HIRE,
    payload: isAvailable,
});

export const toggleIsPublic = (isPublic: boolean): Action => ({
    type: CandidateActionTypes.CONSULTANT_TOGGLE_IS_PUBLIC,
    payload: isPublic,
});

export const deleteProfile = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_DELETE_PROFILE,
});

export const addEducation = (education: Education): Action => ({
    type: CandidateActionTypes.CONSULTANT_ADD_EDUCATION,
    payload: education,
});

export const editEducation = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_EDIT_EDUCATION,
});

export const deleteEducation = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_DELETE_EDUCATION,
});

export const addExperience = (experience: Experience): Action => ({
    type: CandidateActionTypes.CONSULTANT_ADD_EXPERIENCE,
    payload: experience,
});

export const editExperience = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_EDIT_EXPERIENCE,
});

export const deleteExperience = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_DELETE_EXPERIENCE,
});

export const acceptOrDeclineMatchAction = (data?: AcceptOrDeclineMatch): Action => ({
    type: CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH,
    payload: data,
});

export const acceptOrDeclineAgreementAction = (data?: AcceptOrDeclineMatchAgreement): Action => ({
    type: CandidateActionTypes.CONSULTANT_ACCEPT_OR_DECLINE_MATCH_AGREEMENT,
    payload: data,
});

export const addAdditionalDetails = (data: any): Action => ({
    type: CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS,
    payload: data,
});

export const profileUpdateInfo = (data: any): Action => ({
    type: CandidateActionTypes.CONSULTANT_UPDATE_ADDITIONAL_DETAILS,
    payload: data,
});
export const addResume = (data: FormData): Action => ({
    type: CandidateActionTypes.CONSULTANT_ADD_RESUME,
    payload: data,
});

export const deleteResume = (): Action => ({
    type: CandidateActionTypes.CONSULTANT_DELETE_RESUME,
});

export const getResume = (id: any = undefined): Action => ({
    type: CandidateActionTypes.CONSULTANT_GET_RESUME,
    payload: id,
});

export const changeToggleIsPublicProfile = (checked: boolean): Action => ({
    type: CandidateActionTypes.CONSULTANT_TOGGLE_ISPROFILEPUBLIC,
    payload: checked,
});

export const changeToggleIsAvailableToHire = (data: any): Action => ({
    type: CandidateActionTypes.CONSULTANT_TOGGLE_ISAVAILABLE_TO_HIRE,
    payload: data,
});

export const changeFullNameConsultant = (name: string): Action => ({
    type: CandidateActionTypes.CONSULTANT_CHANGE_FULL_NAME,
    payload: name,
});

export const changeEmailConsultant = (email: string): Action => ({
    type: CandidateActionTypes.CONSULTANT_CHANGE_EMAIL,
    payload: email,
});

export const setMatchViewed = (jobId: string): Action => ({
    type: CandidateActionTypes.CONSULTANT_SET_MATCHVIEWED,
    payload: jobId,
});

export const setCurrentMatch = (currentMatch: UserMatch | undefined): Action => ({
    type: CandidateActionTypes.CONSULTANT_SET_CURRENT_MATCH,
    payload: currentMatch,
});

export const dispatchFetchUseMatch = (id: string): Action => ({
    type: CandidateActionTypes.CONSULTANT_FETCH_MATCH,
    payload: id,
});

export const getStatisticsMatch = (userId: string): Action => ({
    type: CandidateActionTypes.CANDIDATE_MATCH_STATISTICS,
    payload: userId,
});
