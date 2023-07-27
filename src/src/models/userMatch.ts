import { Jobs } from './jobs';
import { Profile } from './profile';
import StatusMatch from './statusMatch';

export default interface UserMatch {
    id: string;
    job: Jobs;
    profile: Profile;
    owner?: Profile;

    isApprovedByAdmin: boolean;
    isDeclinedByAdmin: boolean;
    isApprovedByCompany: boolean;
    isDeclinedByCompany: boolean;
    isApprovedByUser: boolean;
    isDeclinedByUser: boolean;
    isAgreementSigned: boolean;

    isAccepted: boolean;
    skillPoints: number;
    experiencePoints: number;
    enterprisePoints: number;
    locationPoints: number;
    salaryPoints: number;
    score: number;
    status: StatusMatch;
}
