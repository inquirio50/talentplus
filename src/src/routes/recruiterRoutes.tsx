import React from 'react';
import { Box } from '@mui/material';
import { MultiRoutes } from '../config/interfaces';

import {
    RECRUITER_DASHBOARD_ROUTE,
    RECRUITER_TIMESHEET_ROUTE,
    RECRUITER_PAYMENTS_ROUTE,
    RECRUITER_INTERVIEWS_ROUTE,
    RECRUITER_MATCHES_ROUTE,
    RECRUITER_MATCHES_VIEW_ROUTE,
    RECRUITER_MATCHES_LIST_ROUTE,
    RECRUITER_CONTRACTS_ROUTE,
    RECRUITER_JOBS_ADD_ROUTE,
    RECRUITER_JOBS_LIST_ROUTE,
    RECRUITER_PROFILE_ROUTE,
    RECRUITER_CHAT_ROUTE,
    RECRUITER_JOBS_VIEW_ROUTE,
    RECRUITER_JOBS_EDIT_ROUTE,
} from './routes';

// Recruiter Components
const RecruiterDashboard = React.lazy(() => import('../components/recruiter/RecruiterDashboard'));
const RecruiterTimeSheet = React.lazy(() => import('../components/recruiter/RecruiterTimeSheet'));
const RecruiterPayments = React.lazy(() => import('../components/recruiter/RecruiterPayments'));
const RecruiterInterview = React.lazy(() => import('../components/recruiter/RecruiterInterview'));
const RecruiterMatches = React.lazy(() => import('../components/recruiter/RecruiterMatches'));
const RecruiterMatchViewList = React.lazy(() => import('../components/recruiter/RecruiterMatchViewList'));
const RecruiterContracts = React.lazy(() => import('../components/recruiter/RecruiterContracts'));
const RecruiterJobList = React.lazy(() => import('../components/recruiter/RecruiterJobList'));
const RecruiterJobsAdd = React.lazy(() => import('../components/recruiter/RecruiterJobsAdd'));
const RecruiterProfile = React.lazy(() => import('../components/recruiter/RecruiterProfile'));
const RecruiterChatLobby = React.lazy(() => import('../components/chat/ChatLobby'));
const RecruiterJobView = React.lazy(() => import('../components/recruiter/job/JobView'));
const RecruiterJobEdit = React.lazy(() => import('../components/recruiter/job/JobDescriptionStep'));

const recruiterRoutes: MultiRoutes[] = [
    {
        path: RECRUITER_DASHBOARD_ROUTE,
        key: 'RecruiterDashboard',
        element: <RecruiterDashboard />,
    },
    {
        path: RECRUITER_TIMESHEET_ROUTE,
        key: 'RecruiterTimeSheet',
        element: <RecruiterTimeSheet />,
    },
    {
        path: RECRUITER_PAYMENTS_ROUTE,
        key: 'RecruiterPayments',
        element: <RecruiterPayments />,
    },
    {
        path: RECRUITER_INTERVIEWS_ROUTE,
        key: 'RecruiterInterview',
        element: <RecruiterInterview />,
    },
    {
        path: RECRUITER_MATCHES_ROUTE,
        key: 'RecruiterMatches',
        element: <RecruiterMatches />,
    },
    {
        path: RECRUITER_MATCHES_VIEW_ROUTE,
        key: 'RecruiterViewMatch',
        element: <RecruiterMatches />,
    },
    {
        path: RECRUITER_MATCHES_LIST_ROUTE,
        key: 'RecruiterMatchesList',
        element: <RecruiterMatchViewList />,
    },
    {
        path: RECRUITER_CONTRACTS_ROUTE,
        key: 'RecruiterContracts',
        element: <RecruiterContracts />,
    },
    {
        path: RECRUITER_JOBS_LIST_ROUTE,
        key: 'RecruiterJobList',
        element: <RecruiterJobList />,
    },
    {
        path: RECRUITER_JOBS_ADD_ROUTE,
        key: 'RecruiterJobAdds',
        element: <RecruiterJobsAdd />,
    },
    {
        path: RECRUITER_PROFILE_ROUTE,
        key: 'RecruiterProfile',
        element: <RecruiterProfile />,
    },
    {
        path: RECRUITER_CHAT_ROUTE,
        key: 'RecruiterChatLobby',
        element: <RecruiterChatLobby />,
    },
    {
        path: RECRUITER_JOBS_VIEW_ROUTE,
        key: 'RecruiterJobView',
        element: <RecruiterJobView />,
    },
    {
        path: RECRUITER_JOBS_EDIT_ROUTE,
        key: 'RecruiterJobEdit',
        element: (
            <Box sx={{ padding: '50px' }}>
                <RecruiterJobEdit />
            </Box>
        ),
    },
];

export default recruiterRoutes;
