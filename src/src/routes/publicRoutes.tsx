import React from 'react';
import MainLandingPage from '../components/landingPage/MainLandingPage';
import NonDiscrimination from '../components/landingPage/terms/NonDiscrimination';
import PrivacyPolicy from '../components/landingPage/terms/PrivacyPolicy';
import TermsAndCondition from '../components/landingPage/terms/TermsAndCondition';
import { MultiRoutes } from '../config/interfaces';
import {
    ABOUT_US_ROUTE,
    FORGET_PASSWORD_ROUTE,
    LOGIN_ROUTE,
    REGISTER_CONTRACT_ROUTE,
    REGISTER_PERMANENT_ROUTE,
    REGISTER_ROUTE,
    RESET_PASSWORD_ROUTE,
    PRICING_ROUTE,
    VERIFY_EMAIL,
    CONSULTANT_AGREEMENT_ROUTE,
    FOR_EMPLOYER_ROUTE,
    REGISTER_CANDIDATE_ROUTE,
    REGISTER_EMPLOYER_ROUTE,
    NON_DISCRIMINATION,
    TERMS_AND_CONDITION,
    PRIVACY_POLICY,
} from './routes';

const Login = React.lazy(() => import('../components/account/Login'));
const Register = React.lazy(() => import('../components/account/register/Register'));
const RegisterCandidates = React.lazy(() => import('../components/account/register/RegisterCandidates'));
const RegisterEmployers = React.lazy(() => import('../components/account/register/RegisterEmployers'));
const RegisterContract = React.lazy(() => import('../components/account/registerContract/RegisterContract'));
const RegisterPermanent = React.lazy(() => import('../components/account/registerPermanent/RegisterPermanent'));
const ForgetPassword = React.lazy(() => import('../components/account/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../components/account/ResetPassword'));
const VerifyEmail = React.lazy(() => import('../components/account/VerifyEmail'));
const MatchViewAgreement = React.lazy(() => import('../components/consultant/matches/MatchViewAgreement'));

const publicRoutes: MultiRoutes[] = [
    {
        path: ABOUT_US_ROUTE,
        key: 'About Us',
        element: <MainLandingPage />,
    },
    {
        path: FOR_EMPLOYER_ROUTE,
        key: 'For Employers',
        element: <MainLandingPage />,
    },
    {
        path: PRICING_ROUTE,
        key: 'Services',
        element: <MainLandingPage />,
    },
    {
        path: LOGIN_ROUTE,
        key: 'Login',
        element: <Login />,
    },
    {
        path: REGISTER_ROUTE,
        key: 'AccountRegister',
        element: <Register />,
    },
    {
        path: REGISTER_CANDIDATE_ROUTE,
        key: 'AccountRegisterCandidate',
        element: <RegisterCandidates />,
    },
    {
        path: REGISTER_EMPLOYER_ROUTE,
        key: 'AccountRegisterEmployers',
        element: <RegisterEmployers />,
    },
    {
        path: FORGET_PASSWORD_ROUTE,
        key: 'AccountForgotPassword',
        element: <ForgetPassword />,
    },
    {
        path: RESET_PASSWORD_ROUTE,
        key: 'AccountResetPassword',
        element: <ResetPassword />,
    },
    {
        path: VERIFY_EMAIL,
        key: 'VerifyEmail',
        element: <VerifyEmail />,
    },
    {
        path: REGISTER_CONTRACT_ROUTE,
        key: 'RegisterContract',
        element: <RegisterContract />,
    },
    {
        path: REGISTER_PERMANENT_ROUTE,
        key: 'RegisterPermanent',
        element: <RegisterPermanent />,
    },
    {
        path: CONSULTANT_AGREEMENT_ROUTE,
        key: 'ConsultantAgreement',
        element: <MatchViewAgreement />,
    },
    {
        path: NON_DISCRIMINATION,
        key: 'NonDiscrimination',
        element: <NonDiscrimination />,
    },
    {
        path: TERMS_AND_CONDITION,
        key: 'TermsAndConditions',
        element: <TermsAndCondition />,
    },
    {
        path: PRIVACY_POLICY,
        key: 'PrivacyPolicy',
        element: <PrivacyPolicy />,
    },
];

export default publicRoutes;
