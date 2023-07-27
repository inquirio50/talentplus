import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Badge, IconButton, Tooltip } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Bell } from '../icons/Icons';
import NotificationsPopover from './NotificationPopover';
import config from '../../config/config';
import { setNotification } from '../../store/reducers/auth/authActions';
import { Notification } from '../../models/notification';

const NotificationTopComponent = () => {
    const anchorRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);
    const dispatch = useDispatch();
    const { user, notifications } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        notifications: state.authentication.notifications,
    }));

    const hubConnectionBuilder = new HubConnectionBuilder()
        .withUrl(`${config.NOTIFICATION_URL}?email=${user.email}`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    useEffect(() => {
        hubConnectionBuilder.start();
    }, []);

    hubConnectionBuilder.on('NotificationRooms', (notification: Notification) => {
        dispatch(setNotification(notification));
    });

    const handleOpenPopover = () => {
        setOpenPopover(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
    };

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
                    <Badge color="error" badgeContent={notifications.length}>
                        <Bell fontSize="medium" />
                    </Badge>
                </IconButton>
            </Tooltip>
            {openPopover && (
                <NotificationsPopover
                    anchorEl={anchorRef.current}
                    onClose={handleClosePopover}
                    open={openPopover}
                    notifications={notifications}
                    role={user.role}
                />
            )}
        </>
    );
};

export default NotificationTopComponent;
