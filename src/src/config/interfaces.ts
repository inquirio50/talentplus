import { CSSProperties } from 'react';
import { Jobs } from '../models/jobs';
import { Profile } from '../models/profile';
import { Notification } from '../models/notification';
import User from '../models/user';
import Category from '../models/category';
import UserMatch from '../models/userMatch';
import ChatRoom from '../models/chatRoom';
import { CommonTypeOptions } from '../components/helpers/typeOptions';
import Legend from '../models/legend';
import { Skills } from '../models/skills';

declare module '@mui/material/styles' {
    interface Theme {
        root?: {};
        appDrawer?: {
            width?: CSSProperties['width'];
        };
        background?: string;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        root?: {};
        appDrawer?: {
            width?: CSSProperties['width'];
        };
        background?: string;
    }
}

declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        success?: PaletteColorOptions;
        warning?: PaletteColorOptions;
        baseColor?: string;
        baseColorTxt?: string;
        roseTxt?: string;
        lightGreyTxt?: string;
        backgroundGray?: string;
        titleDarkRed?: string;
        fontColorRed?: string;
    }

    interface Palette {
        success: PaletteColor;
        warning: PaletteColor;
        baseColor: string;
        baseColorTxt?: string;
        lightGreyTxt?: string;
        roseTxt?: string;
    }
}

export interface Action {
    type: string;
    payload?: any;
    error?: any;
}
export interface State {
    // Common Usage
    loading?: boolean;
    openMessageModal?: boolean;
    typeMessage?: string;
    messageModal?: string;
    profile?: Profile;
    serviceWorkerUpdate?: boolean;
    isSuccess?: boolean;
    info?: any;
    formRegister?: FormDataType;
    percentage?: any;

    // Auth interface
    user?: any;
    accessToken?: any;
    isAuthenticated?: boolean;
    resetPasswordEmailSent?: any;
    isEmailAvailable?: boolean;
    isUserNameAvailable?: boolean;
    finishSignUp?: boolean;
    trackEmailOrUserNameVerification?: boolean;
    isEmailConfirmed?: boolean;
    notifications?: Notification[];
    chatRooms?: ChatRoom[];
    actifRoom?: ChatRoom;

    // Layout interface
    layoutType?: string;
    layoutWidth?: string;
    leftSideBarTheme?: string;
    leftSideBarType?: string;
    showRightSidebar?: boolean;

    // Consultant Interface
    userMatches?: UserMatch[];
    currentMatch?: UserMatch;
    profilParameters?: [];
    statisticsMatch?: StatisticsMatch;

    // Admin
    users?: User[];
    // Recruiter Interface
    jobs?: Jobs[];
    recruiterMatches?: UserMatch[];
    company?: any;
    job?: Jobs;
    categories?: Category[];
    legends?: Legend[];
}

export interface StatisticsMatch {
    accepted?: number;
    declined?: number;
    interview?: number;
    offers?: number;
    pending?: number;
}

export interface ResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}

export interface ProfileMenuItem {
    label: string;
    icon: any;
    redirectTo: string;
    onClick?: any;
}

export interface MultiRoutes {
    path: string;
    key: string;
    element: any;
}

export interface SignUpForm {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    company?: string;
    url?: string;

    agreementRead?: boolean;
    agreementLocalization?: boolean;

    incorporated?: boolean;
    incorporatedHelp?: boolean;
    typeSearch?: string;
    searchOpportunity?: string;
    title?: string;
    jobFunction?: string;
    skills?: Skills[];
    additionalsSkills?: Skills[];
    experienceLevel?: string;
    salaryId?: string;
    industry?: string;
    unWantedIndustry?: string;
    sizeOfWork?: string;
    legallyWork?: boolean;
    needSponsor?: boolean;
    duration?: string | CommonTypeOptions[];
    selectLanguageEng?: string;
    selectLanguageFr?: string;
    processWithCompany?: boolean;
    companyProcess?: string;
    noCompany?: boolean;
    noCompanyList?: string;
    startingSalary?: number;
    endingSalary?: number;
    startingRatePerHour?: number;
    endingRatePerHour?: number;
    typeOfWork?: string;
    localisation?: string;
    culture?: string;
    personality?: string;
    notified?: string;
    phone?: string;
    resume?: any;
    relocate?: boolean;
    benefits?: string | CommonTypeOptions[];
    questionaire?: any;
}

export interface SearchUsersParam {
    role: string;
    userName: string;
    currentPage: number;
    orderBy: string;
    orderByItem: string;
    codeLanguage: string;
}

export interface AcceptOrDeclineMatch {
    matchId: string;
    isAccepted: boolean;
}

export interface AcceptOrDeclineMatchAgreement {
    matchId: string;
    isAccepted: boolean;
}

export interface VerifyEmailDto {
    email: string;
    token: string;
}

export interface FormDataType {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    company?: string;
    agreementRead: boolean;
    finished: boolean;
    agreementLocalization: boolean;

    incorporated?: boolean;
    incorporatedHelp?: boolean;
    typeSearch?: string;
    searchOpportunity?: string;
    title?: CommonTypeOptions[];
    jobFunction?: CommonTypeOptions[];
    skills?: CommonTypeOptions[];
    additionalsSkills?: CommonTypeOptions[];
    experienceLevel?: string;
    industry?: CommonTypeOptions[];
    unWantedIndustry?: CommonTypeOptions[];
    sizeOfWork?: string;
    legallyWork?: boolean;
    needSponsor?: boolean;
    duration?: CommonTypeOptions[];
    selectLanguageEng?: string;
    selectLanguageFr?: string;
    processWithCompany?: boolean;
    companyProcess?: string;
    noCompany?: boolean;
    noCompanyList?: string;
    payRange?: number[];
    typeOfWork?: string;
    localisation?: string;
    culture?: CommonTypeOptions[];
    personality?: CommonTypeOptions[];
    notified?: string;
    phone?: string;
    resume?: any;
    relocate?: boolean;
    benefits?: CommonTypeOptions[];
    salaryId?: string;
    yourself?: string;
}
