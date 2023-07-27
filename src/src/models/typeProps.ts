import { Skills } from './skills';

export type MenuItemType = {
    url: string;
    target: string;
    key: string;
    icon: string;
    label: string;
    children?: any;
    badge?: any;
};

export interface JobView {
    title: string;
    skills: Array<Skills>;
    startingRatePerHour: number;
    endingRatePerHour: number;
    description: string;
    typeOfWork: string;
    experience: string;
    startDate: Date;
    minSalaryRange: number;
    maxSalaryRange: number;
    createdAt: Date;
    isAccepted: boolean;
    address: string | null;
}

export interface MaterialSelectProps {
    label: string;
    value: string;
}

export enum ChatTypeEnum {
    Room,
    Private,
}

export interface CreateRoomType {
    roomName: string;
    type: ChatTypeEnum;
    userIds: string[];
}
