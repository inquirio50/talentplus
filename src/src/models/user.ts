import { Address } from './address';
import { Notification } from './notification';

export default interface User {
    id?: string;
    usernameOrEmail?: string;
    userName?: string;
    password?: string;
    token?: string;
    address?: Address;
    username?: string;
    displayName?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    image?: any;
    isTextSubscriber?: boolean;
    phone?: string;
    role?: string;
    email?: string;
    isEmailConfirmed?: boolean;
    notifications?: Notification[];
}
