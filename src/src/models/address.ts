export interface Address {
    id?: string;
    appUserId?: string;
    suite?: string;
    street: string;
    province: string;
    city: string;
    postalCode: string;
    country?: string;
    latitude?: string;
    longitude?: string;
}
