import { SETTINGS, LOGOUT } from '../../config/constants';
import { SETTINGS_ROUTE, LOGIN_ROUTE } from '../../routes/routes';
import menuMap from './allMenuItems';

const generateBottomMenu = () => [
    {
        ...menuMap.get(SETTINGS),
        url: SETTINGS_ROUTE,
    },
    {
        ...menuMap.get(LOGOUT),
        url: LOGIN_ROUTE,
        children: null,
    },
];

export default generateBottomMenu;
