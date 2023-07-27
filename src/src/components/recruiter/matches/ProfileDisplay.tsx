import React from 'react';
import PageTitle from '../../common/PageTitle';

const ProfileDisplay = () => (
    <PageTitle
        breadCrumbItems={[{ label: 'Matches', path: '/consultant/matches/profile', active: true }]}
        title="Profile"
        icon={<span>|</span>}
    />
);

export default ProfileDisplay;
