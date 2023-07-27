import { Address } from './address';
import { Skills } from './skills';

export interface Consultant {
    id: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    address: Address;
    province: string;
    phone: string;
    phoneNumber: string;
    isTextSubscriber: boolean;
    ratePerHour: number;
    projectDescription: string;
    skills: Skills[];
    endingRatePerHour: number;
    startingRatePerHour: number;
    experience: any[];
    photos: any[];
    role: string;
    typeOfWork: string;
    title: string;
}
