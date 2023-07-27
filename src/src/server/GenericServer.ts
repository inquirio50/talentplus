import { Education } from '../models/education';
import { Experience } from '../models/experience';
import { Profile } from '../models/profile';
import ActionBase from './ActionBase';

const actionBase = ActionBase.getInstance();

export const fetchProfileUserApi = async (codeLanguage: string): Promise<any> => {
    const result = await actionBase.get(`/Profile?CodeLanguage=${codeLanguage}`);
    if (result) {
        return result;
    }
    return null;
};

export const updateProfileUserApi = async (profile: Profile): Promise<any> => {
    const result = await actionBase.post('/Profile', profile);
    if (result) {
        return result;
    }
    return null;
};

export const profileAddExperience = async (experience: Experience) => {
    const result = await actionBase.post('/Experience', experience);
    if (result) {
        return result;
    }
    return null;
};

export const profileEditExperience = async (experience: Experience) => {
    const result = await actionBase.put(`/Experience/${experience.id}`, experience);
    if (result) {
        return result;
    }
    return null;
};

export const profileDeleteExperience = async (id: string) => {
    const result = await actionBase.delete(`/Experience/${id}`);
    if (result) {
        return result;
    }
    return null;
};

export const profileAddEducation = async (education: Education) => {
    const result = await actionBase.post('/Education', education);
    if (result) {
        return result;
    }
    return null;
};

export const profileEditEducation = async (education: Education) => {
    const result = await actionBase.put('/Education', education);
    if (result) {
        return result;
    }
    return null;
};

export const profileDeleteEducation = async (id: string) => {
    const result = await actionBase.delete(`/Education/${id}`);
    if (result) {
        return result;
    }
    return null;
};

export const fetchProfilParameters = async (codeLanguage: string) => {
    const result = await actionBase.get(`/Employer/ProfileParameters?CodeLanguage=${codeLanguage}`);
    if (result) {
        return result;
    }
    return null;
};

export const fetchProfilParametersAdminSvc = async (codeLanguage: string) => {
    const result = await actionBase.get(`/Admin/ProfileParameters?CodeLanguage=${codeLanguage}`);
    if (result) {
        return result;
    }
    return null;
};

export const getProfilePercentage = async (): Promise<any> => {
    const result = await actionBase.get('/Profile/GetFilledPercentage');
    if (result) {
        return result;
    }
    return null;
};
