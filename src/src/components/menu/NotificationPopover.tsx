import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Avatar,
    Box,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Tooltip,
    Typography,
    styled,
} from '@mui/material';
import { t } from 'i18next';
import SimpleBar from 'simplebar-react';
import { ChatAlt, MailOpen, UserCircle, XIcon } from '../icons/Icons';
import { Notification } from '../../models/notification';
import { ADMIN_ROLE, CONSULTANT_ROLE, PERMANENT_ROLE, EMPLOYER_ROLE, RECRUITER_ROLE } from '../../config/constants';
import { RootState } from '../../store/store';

import DialogMsg from '../common/DialogMsg';
import MatchView from '../consultant/matches/MatchView';
import { setMatchViewed, setCurrentMatch } from '../../store/reducers/candidate/candidateActions';
import { setNotifications } from '../../store/reducers/auth/authActions';

const Scrollbar = styled(SimpleBar)``;

const getDescription = (role: string) => {
    let description = '';
    if (role === ADMIN_ROLE) {
        description = t('YouGotmatchAdmin');
    } else if (role === CONSULTANT_ROLE || role === PERMANENT_ROLE) {
        description = t('YouGotmatchConsultant');
    } else if (role === RECRUITER_ROLE || role === EMPLOYER_ROLE) {
        description = t('YouGotmatchEmployer');
    }

    return description;
};

const getNotificationContent = (notification: any, role: string) => {
    switch (notification.type) {
        case 'job_add':
            return (
                <>
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                        <Avatar src={notification.avatar}>
                            <UserCircle fontSize="small" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                <Typography sx={{ mr: 0.5 }} variant="subtitle2">
                                    {notification.author}
                                </Typography>
                                <Typography sx={{ mr: 0.5 }} variant="body2">
                                    {t('added a new job')}
                                </Typography>
                                <Link href="/dashboard/jobs" underline="always" variant="body2">
                                    {notification.job}
                                </Link>
                            </Box>
                        }
                        secondary={
                            <Typography color="textSecondary" variant="caption">
                                {notification.createdAt}
                            </Typography>
                        }
                        sx={{ my: 0 }}
                    />
                </>
            );
        case 'new_feature':
            return (
                <>
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                        <Avatar>
                            <ChatAlt fontSize="small" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                <Typography variant="subtitle2" sx={{ mr: 0.5 }}>
                                    {t('New feature!')}
                                </Typography>
                                <Typography variant="body2">{notification.description}</Typography>
                            </Box>
                        }
                        secondary={
                            <Typography color="textSecondary" variant="caption">
                                {notification.createdAt}
                            </Typography>
                        }
                        sx={{ my: 0 }}
                    />
                </>
            );
        case 'company_created':
            return (
                <>
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                        <Avatar src={notification.avatar}>
                            <UserCircle fontSize="small" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    m: 0,
                                }}>
                                <Typography sx={{ mr: 0.5 }} variant="subtitle2">
                                    {notification.author}
                                </Typography>
                                <Typography variant="body2" sx={{ mr: 0.5 }}>
                                    {t('created')}
                                </Typography>
                                <Link href="/dashboard/jobs" underline="always" variant="body2">
                                    {notification.company}
                                </Link>
                            </Box>
                        }
                        secondary={<Typography color="textSecondary" variant="caption" />}
                        sx={{ my: 0 }}
                    />
                </>
            );
        case 'job_matched':
            return (
                <>
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                        <Avatar src={notification.avatar}>
                            <UserCircle fontSize="small" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    m: 0,
                                }}>
                                <Typography variant="body2" sx={{ mr: 0.5 }}>
                                    {`${getDescription(role)} ${notification.title}`}
                                </Typography>
                            </Box>
                        }
                        secondary={<Typography color="textSecondary" variant="caption" />}
                        sx={{ my: 0 }}
                    />
                </>
            );
        default:
            return null;
    }
};

interface NotificationsPopoverProps {
    anchorEl: any;
    onClose: any;
    open: boolean;
    notifications: Notification[];
    role: string;
}

const NotificationsPopover = ({ anchorEl, onClose, open, notifications, role }: NotificationsPopoverProps) => {
    const { currentMatch } = useSelector((state: RootState) => ({
        currentMatch: state.candidate.currentMatch,
        user: state.authentication.user,
    }));
    const dispatch = useDispatch();
    const handleCloseMatch = () => {
        dispatch(setCurrentMatch(undefined));
    };
    const handleRemoveOne = () => {};

    const handleOnClick = (jobId: string) => {
        dispatch(setMatchViewed(jobId));
        dispatch(setNotifications(notifications.filter((x) => x.id !== jobId)));
    };

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom',
                }}
                onClose={onClose}
                open={open}
                PaperProps={{ sx: { width: 380 } }}
                transitionDuration={0}>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: '#313a46',
                        color: 'primary.contrastText',
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: 3,
                        py: 2,
                    }}>
                    <Typography color="inherit" variant="h6">
                        Notifications
                    </Typography>
                    <Tooltip title="Mark all as read">
                        <IconButton onClick={() => {}} size="small" sx={{ color: 'inherit' }}>
                            <MailOpen fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                {notifications.length === 0 ? (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2">{t('There are no notifications')}</Typography>
                    </Box>
                ) : (
                    <Scrollbar sx={{ maxHeight: 400 }}>
                        <List disablePadding>
                            {notifications.map((notification: any) => (
                                <ListItem
                                    divider
                                    key={notification.id}
                                    sx={{
                                        alignItems: 'flex-start',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                        '& .MuiListItemSecondaryAction-root': {
                                            top: '24%',
                                        },
                                    }}
                                    onClick={() => handleOnClick(notification.id)}
                                    secondaryAction={
                                        <Tooltip title="Remove">
                                            <IconButton edge="end" onClick={() => handleRemoveOne()} size="small">
                                                <XIcon sx={{ fontSize: 14 }} />
                                            </IconButton>
                                        </Tooltip>
                                    }>
                                    {getNotificationContent(notification, role)}
                                </ListItem>
                            ))}
                        </List>
                    </Scrollbar>
                )}
            </Popover>
            <DialogMsg
                open={currentMatch !== undefined}
                title={t('match')}
                handleClose={handleCloseMatch}
                isAction={false}>
                <MatchView currentMatch={currentMatch} />
            </DialogMsg>
            ;
        </>
    );
};

export default NotificationsPopover;
