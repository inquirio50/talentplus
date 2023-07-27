import React from 'react';
import {
    CHAT,
    CONTRACTS,
    DASHBOARD,
    INTERVIEWS,
    JOBS,
    MATCHES,
    PAYMENTS,
    PROFILE,
    REGISTERED_USERS,
    TIMESHEET,
    SETTINGS,
    // OFFERS,
    DOCUMENTS,
    // LOGOUT,
} from '../../config/constants';
import i18next from '../../config/i18next';
import {
    Calendar,
    Cash,
    ChartPie,
    Home,
    MailOpen,
    OfficeBuilding,
    ReceiptTax,
    Share,
    Truck,
    UserCircle,
    Users,
    // Offer,
    Document,
    // LogoutIcon,
    SettingsIcon,
} from '../icons/Icons';

interface MenuItem {
    key: string;
    label: string;
    url?: any;
    isTitle?: boolean;
    icon?: any;
    parentKey?: string;
    children?: MenuItem[];
}

const menuMap = new Map<string, MenuItem>([
    [
        DASHBOARD,
        {
            key: 'dashboard-key',
            label: i18next.t(DASHBOARD),
            url: '',
            isTitle: false,
            icon: <Home fontSize="small" />,
        },
    ],
    [
        PROFILE,
        {
            key: 'profile-key',
            label: i18next.t('profile'),
            url: '',
            isTitle: false,
            icon: <UserCircle fontSize="small" />,
        },
    ],
    [
        JOBS,
        {
            key: 'jobs-key',
            label: i18next.t('Jobs'),
            isTitle: false,
            icon: <OfficeBuilding fontSize="small" />,
            children: [
                {
                    key: 'jobs-list-key',
                    label: i18next.t('List'),
                    url: '',
                    parentKey: 'r-jobs',
                },
                {
                    key: 'jobs-add-key',
                    label: i18next.t('Add'),
                    url: '',
                    parentKey: 'r-jobs',
                },
            ],
        },
    ],
    [
        MATCHES,
        {
            key: 'matches-key',
            label: i18next.t('matches'),
            url: null,
            isTitle: false,
            icon: <Share fontSize="small" />,
            children: [
                {
                    key: 'match-view-key',
                    label: i18next.t('Match View'),
                    url: '',
                    parentKey: 'matches-key',
                    icon: <Users fontSize="small" />,
                },
                {
                    key: 'match-list-key',
                    label: i18next.t('Match List'),
                    url: '',
                    parentKey: 'matches-key',
                    icon: <Cash fontSize="small" />,
                },
            ],
        },
    ],
    [
        INTERVIEWS,
        {
            key: 'interview-key',
            label: i18next.t('Interviews'),
            url: '',
            isTitle: false,
            icon: <Calendar fontSize="small" />,
        },
    ],
    [
        CONTRACTS,
        {
            key: 'contract-key',
            label: i18next.t('Contracts'),
            url: '',
            isTitle: false,
            icon: <ChartPie fontSize="small" />,
        },
    ],
    [
        TIMESHEET,
        {
            key: 'timesheet-key',
            label: i18next.t('Timesheet'),
            url: '',
            isTitle: false,
            icon: <Truck fontSize="small" />,
        },
    ],
    [
        PAYMENTS,
        {
            key: 'payments-key',
            label: i18next.t('Payments'),
            url: '',
            isTitle: false,
            icon: <ReceiptTax fontSize="small" />,
        },
    ],
    [
        REGISTERED_USERS,
        {
            key: 'a-interview',
            label: i18next.t('registeredUsers'),
            url: '',
            isTitle: false,
            icon: <Users fontSize="small" />,
        },
    ],
    [
        CHAT,
        {
            key: 'a-chat',
            label: i18next.t('chat'),
            url: '',
            isTitle: false,
            icon: <MailOpen fontSize="small" />,
        },
    ],
    [
        SETTINGS,
        {
            key: 'settings-key',
            label: i18next.t(SETTINGS),
            url: '',
            isTitle: false,
            icon: <SettingsIcon fontSize="small" />,
            // children: [
            //     {
            //         key: 'settings-key-category',
            //         label: i18next.t('Category'),
            //         url: '',
            //         parentKey: 'r-jobs',
            //     },
            //     {
            //         key: 'settings-key-legend',
            //         label: i18next.t('Legend'),
            //         url: '',
            //         parentKey: 'settings-key',
            //     },
            // ],
        },
    ],
    // [
    //     LOGOUT,
    //     {
    //         key: 'offers-key',
    //         label: i18next.t('Offers'),
    //         url: '',
    //         isTitle: false,
    //         icon: <LogoutIcon fontSize="small" />,
    //     },
    // ],
    // [
    //     OFFERS,
    //     {
    //         key: 'offers-key',
    //         label: i18next.t('Offers'),
    //         url: '',
    //         isTitle: false,
    //         icon: <Offer fontSize="small" />,
    //     },
    // ],
    [
        DOCUMENTS,
        {
            key: 'documents-key',
            label: i18next.t('Documents'),
            url: '',
            isTitle: false,
            icon: <Document fontSize="small" />,
        },
    ],
]);

export default menuMap;
