import { Skills } from './skills';

export interface Experience {
    appUserId?: string;
    id?: string;
    companyName: string;
    roleId?: string;
    title: string;
    description?: string;
    startingDate?: string;
    startDate?: string;
    endingDate?: string | null;
    endDate?: string;
    isCurrent: boolean;
    sizeCompany?: any;
    skills?: Skills[];
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
}
