import React, { useRef, useState } from 'react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { UserCircle } from '../icons/Icons';
import User from '../../models/user';
import AvatarMenuAccount from './AvatarMenuAccount';

interface ProfileDropdownProps {
    user: User;
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
    const anchorRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);
    const avatar = user.image || '/static/mock-images/avatars/avatar-anika_visser.png';

    const handleOpenPopover = () => {
        setOpenPopover(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
    };

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: 2,
                }}>
                <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                    src={avatar}>
                    <UserCircle fontSize="small" />
                </Avatar>
            </Box>
            <AvatarMenuAccount
                anchorRef={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
                user={user}
            />
        </>
    );
};

export default ProfileDropdown;
