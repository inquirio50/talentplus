import { Address } from './address';
import { Skills } from './skills';

export interface Jobs {
    id: string;
    address?: Address;
    description: string;
    title: string;
    startingRatePerHour: number;
    endingRatePerHour: number;
    skills: Skills[];
    typeOfWork: string;
    isAccepted: boolean;
    role: string;
    minSalaryRange?: number;
    maxSalaryRange?: number;
    createdAt: Date;
    experience: any;
    duration?: any;
    durationNumber?: number;
    durationType?: string;
    startDate?: any;
    salaryId: string;
    reference?: string;
    jobFunctions?: any[];
    titles: any[];
    experienceLevels: any[];
    owner: any;
    salary: any;
    selectLanguageEng: string;
    selectLanguageFr: string;
    localisations: any[];
}
