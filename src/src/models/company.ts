import { Address } from './address';

export interface Company {
    id: string;
    name: string;
    nameEmployer: string;
    size: number;
    website: string;
    linkedIn: string;
    twitter: string;
    vision: string;
    mission: string;
    values: string;
    createdAt: Date;
    phoneNumber: string;
    address: Address;
    email: string;
    culture: string;
    sizeOfWork: string;
    industry: string;
}
