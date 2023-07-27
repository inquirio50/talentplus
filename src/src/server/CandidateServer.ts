import { AcceptOrDeclineMatch, AcceptOrDeclineMatchAgreement } from '../config/interfaces';
import { Education } from '../models/education';
import { Experience } from '../models/experience';
import { Profile } from '../models/profile';
import UserMatch from '../models/userMatch';
import ActionBase from './ActionBase';
import i18next from '../config/i18next';

const actionBase = ActionBase.getInstance();

export const fetchCandidatetInfo = async (codeLanguage: string): Promise<any> => {
    const result = await actionBase.get(`/Consultant?codeLanguage=${codeLanguage}`);
    if (result) {
        return result;
    }
    return null;
};

export const fetchUserMatchInfo = async (id: String): Promise<any> => {
    const result = await actionBase.get(`/Match/GetMatch?id=${id}`);
    if (result) {
        return result;
    }
    return null;
};

export const getUserMatches = async (status?: string): Promise<any> => {
    let url = '/Profile/JobMatches?';
    if (status) {
        url = `${url}statusSearch=${status}&CodeLanguage=${i18next.resolvedLanguage.toLocaleUpperCase()}`;
    } else {
        url = `${url}CodeLanguage=${i18next.resolvedLanguage.toLocaleUpperCase()}`;
    }
    // eslint-disable-next-line no-console
    console.log('url:', url);
    const result = await actionBase.get(url);

    if (result) {
        return result;
    }
    return null;
};

export const matchDecision = async (userMatch: UserMatch): Promise<any> => {
    const result = await actionBase.post('/Profile/MatchDecision', userMatch);
    if (result) {
        return result;
    }
    return null;
};

export const fetchConsultantProfile = async (): Promise<any> => {
    const result = await actionBase.get('/Consultant');
    if (result) return result;
    return null;
};

export const changeEmail = async (data: string): Promise<any> =>
    (await actionBase.post(`Consultant/ChangeEmail?email=${data}`)) || null;

export const deleteProfile = async (): Promise<any> => actionBase.delete('Consultant/DeleteAccount');

export const changeFullName = async (data: string): Promise<any> => {
    const result = await actionBase.post(`/Consultant/ChangeName?fullName=${data}`);
    if (result) return result;
    return null;
};

export const updateProfile = async (profile: Profile): Promise<any> => {
    const result = await actionBase.post('/UpdateAdditionalDetails', profile);
    if (result) return result;
    return null;
};

export const addEducation = async (education: Education): Promise<any> => {
    const result = await actionBase.post('/Education', education);
    if (result) return result;
    return null;
};

export const addExperience = async (experience: Experience): Promise<any> => {
    const result = await actionBase.post('/Experience', experience);
    if (result) return result;
    return null;
};

export const acceptOrDeclineMatch = async (data: AcceptOrDeclineMatch): Promise<any> => {
    const result = await actionBase.post('/Consultant/AcceptOrDeclineMatch', data);
    if (result) return result;
    return null;
};

export const acceptOrDeclineMatchAgreement = async (data: AcceptOrDeclineMatchAgreement): Promise<any> => {
    const result = await actionBase.post('/Consultant/acceptOrDeclineMatchAgreement', data);
    if (result) return result;
    return null;
};

export const updateAdditionalDetails = async (data: any): Promise<any> =>
    (await actionBase.post('/Consultant/UpdateAdditionalDetails', data)) || null;

export const addResume = async (formFile: FormData): Promise<any> => {
    const result = await actionBase.post('/File/ConsultantCV', formFile);
    if (result) {
        return result;
    }
    return null;
};
export const toggleIsPublic = async (isProfilePublic: boolean): Promise<any> => {
    const result = await actionBase.post(`/Consultant/ToggleIsPublic?isProfilePublic=${isProfilePublic}`);
    if (result) {
        return result;
    }
    return null;
};

export const deleteResume = async (): Promise<any> => {
    const result = await actionBase.delete('/File/ConsultantCV');
    if (result) {
        return result;
    }
    return null;
};

export const toggleIsAvailableToHire = async (isAvailableToHire: boolean): Promise<any> => {
    const result = await actionBase.post(`/Consultant/ToggleIsAvailableToHire?isAvailableToHire=${isAvailableToHire}`);
    if (result) {
        return result;
    }
    return null;
};

export const getResume = async (id = undefined): Promise<any> => {
    const result = await actionBase.get(id ? `/File/ConsultantCV?userId=${id}` : '/File/ConsultantCV', {
        responseType: 'blob',
    });
    if (result) {
        return result;
    }
    return null;
};

export const deleteConsultantAccount = async (): Promise<any> => {
    const result = await actionBase.delete('/Consultant/DeleteAccount');
    if (result) {
        return result;
    }
    return null;
};

export const consultantChangeEmail = async (email: string): Promise<any> => {
    const payload = {
        email,
    };
    const result = await actionBase.post('/Consultant/ChangeEmail', payload);
    if (result) {
        return result;
    }
    return null;
};

export const consultantSetMatchViewed = async (jobId: string): Promise<any> => {
    const result = await actionBase.patch(`/Consultant/MatchViewed?jobId=${jobId}`);
    if (result) {
        return result;
    }
    return null;
};

export const getMatchStatisticsApi = async (userId: string): Promise<any> => {
    const result = await actionBase.get(`/Match/GetStatistics?userId=${userId}`);
    if (result) {
        return result;
    }
    return null;
};
