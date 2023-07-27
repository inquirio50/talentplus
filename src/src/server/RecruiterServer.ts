import UserMatch from '../models/userMatch';
import ActionBase from './ActionBase';

const actionBase = ActionBase.getInstance();

export const fetchMatches = async (): Promise<any> => {
    const result = await actionBase.get('/Profile/matches');
    if (result) {
        return result;
    }
    return null;
};

export const postMatches = async (userMatch: UserMatch): Promise<any> => {
    const result = await actionBase.post('/Employer/Matches', userMatch);
    if (result) {
        return result;
    }
    return null;
};

export const fetchJobs = async (userMatch: UserMatch): Promise<any> => {
    const result = await actionBase.post('/Profile/MatchDecision', userMatch);
    if (result) {
        return result;
    }
    return null;
};

export const fetchAllJobs = async (codeLanguage: string): Promise<any> => {
    const result = await actionBase.get(`/JobPosting?codeLanguage=${codeLanguage}`);
    if (result) {
        return result;
    }
    return null;
};

export const deleteJob = async (id: string): Promise<any> => {
    const result = await actionBase.delete(`/JobPosting/${id}`);
    if (result) return result;
    return null;
};

export const fetchEmployerProfile = async (): Promise<any> => (await actionBase.get('/Employer')) ?? null;

export const changeFirstName = async (data: any): Promise<any> =>
    (await actionBase.post(`/Employer/ChangeFirstName?firstName=${data.payload}`)) ?? null;

export const changeLastName = async (data: any): Promise<any> =>
    (await actionBase.post(`/Employer/ChangeLastName?lastName=${data.payload}`)) ?? null;

export const changeTitle = async (data: any): Promise<any> =>
    (await actionBase.post(`/Employer/ChangeTitle?title=${data.payload}`)) ?? null;

export const changeDepartment = async (data: any): Promise<any> =>
    (await actionBase.post(`/Employer/ChangeDepartment?department=${data.payload}`)) ?? null;

export const changePhoneNumber = async (data: any): Promise<any> =>
    (await actionBase.post(`/Employer/ChangePhone?phoneNumber=${data.payload}`)) ?? null;

export const changeEmail = async (data: any): Promise<any> =>
    (await actionBase.post(`Consultant/ChangeEmail?email=${data.payload}`)) ?? null;

export const fetchCompany = async (): Promise<any> => (await actionBase.get('/Company')) ?? null;

export const updateCompany = async (data: any): Promise<any> => (await actionBase.post('/Company', data)) ?? null;

export const createJob = async (data: any): Promise<any> => (await actionBase.post('/JobPosting', data)) ?? null;

export const updateJob = async (data: any): Promise<any> =>
    (await actionBase.put(`/JobPosting/${data.id}`, data)) ?? null;

export const sendAcceptOrDeclineMatch = async (data: any): Promise<any> =>
    (await actionBase.post('/Employer/AcceptOrDeclineMatch', data)) ?? null;

export const fetchUserMatches = async (codeLanguage: string): Promise<any> =>
    (await actionBase.get(`/Profile/UserMatches?codeLanguage=${codeLanguage}`)) ?? null;

export const fetchJob = async (id: string, codeLanguage: string): Promise<any> =>
    (await actionBase.get(`/JobPosting/${id}?codeLanguage=${codeLanguage}`)) ?? null;
