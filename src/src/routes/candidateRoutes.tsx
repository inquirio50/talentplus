import React from 'react';
import { MultiRoutes } from '../config/interfaces';
import {
    CANDIDATE_DASHBOARD_ROUTE,
    CONSULTANT_TIMESHEET_ROUTE,
    CONSULTANT_PAYMENTS_ROUTE,
    CONSULTANT_INTERVIEWS_ROUTE,
    CONSULTANT_CONTRACTS_ROUTE,
    CANDIDATE_MATCHES_ROUTE,
    CONSULTANT_JOBS_ROUTE,
    CANDIDATE_PROFILE_ROUTE,
    CONSULTANT_CHAT_ROUTE,
} from './routes';

// Candidate Components
const CandidateDashboard = React.lazy(() => import('../components/candidate/CandidateDashboard'));
const CandidateMatches = React.lazy(() => import('../components/candidate/CandidateMatches'));
const ConsultantTimesheet = React.lazy(() => import('../components/consultant/ConsultantTimeSheet'));
const ConsultantPayments = React.lazy(() => import('../components/consultant/ConsultantPayments'));
const ConsultantInterview = React.lazy(() => import('../components/consultant/ConsultantPayments'));
const ConsultantContract = React.lazy(() => import('../components/consultant/ConsultantContract'));
const ConsultantJobs = React.lazy(() => import('../components/consultant/ConsultantJobs'));
const CandidateAccountProfile = React.lazy(() => import('../components/candidate/profile/CandidateProfile'));
const ConsultantChatLobby = React.lazy(() => import('../components/chat/ChatLobby'));

// consultant dashboard
const consultantRoutes: MultiRoutes[] = [
    {
        path: CANDIDATE_DASHBOARD_ROUTE,
        key: 'CandidateDashboard',
        element: <CandidateDashboard />,
    },
    {
        path: CONSULTANT_TIMESHEET_ROUTE,
        key: 'ConsultantTimeSheet',
        element: <ConsultantTimesheet />,
    },
    {
        path: CONSULTANT_PAYMENTS_ROUTE,
        key: 'ConsultantPayments',
        element: <ConsultantPayments />,
    },
    {
        path: CONSULTANT_INTERVIEWS_ROUTE,
        key: 'ConsultantInterview',
        element: <ConsultantInterview />,
    },
    {
        path: CONSULTANT_CONTRACTS_ROUTE,
        key: 'ConsultantContracts',
        element: <ConsultantContract />,
    },
    {
        path: CANDIDATE_MATCHES_ROUTE,
        key: 'CandidateMatches',
        element: <CandidateMatches />,
    },
    {
        path: CONSULTANT_JOBS_ROUTE,
        key: 'ConsultantJobList',
        element: <ConsultantJobs />,
    },
    {
        path: CANDIDATE_PROFILE_ROUTE,
        key: 'CandidateProfile',
        element: <CandidateAccountProfile />,
    },
    {
        path: CONSULTANT_CHAT_ROUTE,
        key: 'ConsultantChatLobby',
        element: <ConsultantChatLobby />,
    },
];

export default consultantRoutes;
