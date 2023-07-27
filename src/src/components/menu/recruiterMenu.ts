import { CHAT, MATCHES, PROFILE } from '../../config/constants';
import {
    RECRUITER_DASHBOARD_ROUTE,
    RECRUITER_PROFILE_ROUTE,
    RECRUITER_JOBS_LIST_ROUTE,
    RECRUITER_JOBS_ADD_ROUTE,
    RECRUITER_MATCHES_ROUTE,
    RECRUITER_MATCHES_VIEW_ROUTE,
    RECRUITER_MATCHES_LIST_ROUTE,
    // RECRUITER_INTERVIEWS_ROUTE,
    // RECRUITER_CONTRACTS_ROUTE,
    // RECRUITER_TIMESHEET_ROUTE,
    // RECRUITER_PAYMENTS_ROUTE,
    RECRUITER_CHAT_ROUTE,
} from '../../routes/routes';
import menuMap from './allMenuItems';

const generateRecruiterMenu = () => {
    // Adding Routes to Jobs children
    const menuJobs: any = { ...menuMap.get('Jobs') };
    menuJobs.children[0].url = RECRUITER_JOBS_LIST_ROUTE;
    menuJobs.children[1].url = RECRUITER_JOBS_ADD_ROUTE;

    // Adding Routes to Match children
    const menuMatch: any = { ...menuMap.get(MATCHES) };
    menuMatch.children[0].url = RECRUITER_MATCHES_VIEW_ROUTE;
    menuMatch.children[1].url = RECRUITER_MATCHES_LIST_ROUTE;

    return [
        {
            ...menuMap.get('Dashboard'),
            url: RECRUITER_DASHBOARD_ROUTE,
        },
        {
            ...menuMap.get(PROFILE),
            url: RECRUITER_PROFILE_ROUTE,
        },
        {
            ...menuJobs,
        },
        {
            ...menuMatch,
            url: RECRUITER_MATCHES_ROUTE,
        },
        /* {
            ...menuMap.get('Interviews'),
            url: RECRUITER_INTERVIEWS_ROUTE,
        }, */
        {
            ...menuMap.get(CHAT),
            url: RECRUITER_CHAT_ROUTE,
        },
        /* {
            ...menuMap.get('Contracts'),
            url: RECRUITER_CONTRACTS_ROUTE,
        },
        {
            ...menuMap.get('Timesheet'),
            url: RECRUITER_TIMESHEET_ROUTE,
        },
        {
            ...menuMap.get('Payments'),
            url: RECRUITER_PAYMENTS_ROUTE,
        }, */
    ];
};

export default generateRecruiterMenu;
