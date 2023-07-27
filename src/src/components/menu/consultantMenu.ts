import {
    DASHBOARD, // , INTERVIEWS
    MATCHES,
    // , OFFERS, DOCUMENTS
} from '../../config/constants';
import {
    // CONSULTANT_INTERVIEWS_ROUTE,
    CANDIDATE_DASHBOARD_ROUTE,
    CANDIDATE_MATCHES_ROUTE,
    // CONSULTANT_OFFERS_ROUTE,
    // CONSULTANT_DOCUMENTS_ROUTE,
} from '../../routes/routes';
import menuMap from './allMenuItems';

const generateConsultantMenu = () => [
    {
        ...menuMap.get(DASHBOARD),
        url: CANDIDATE_DASHBOARD_ROUTE,
    },
    {
        ...menuMap.get(MATCHES),
        url: CANDIDATE_MATCHES_ROUTE,
        children: null,
    },
    /* ,
    {
        ...menuMap.get(INTERVIEWS),
        url: CONSULTANT_INTERVIEWS_ROUTE,
    },
    {
        ...menuMap.get(OFFERS),
        url: CONSULTANT_OFFERS_ROUTE,
    },
    {
        ...menuMap.get(DOCUMENTS),
        url: CONSULTANT_DOCUMENTS_ROUTE,
    }, */
];

export default generateConsultantMenu;
