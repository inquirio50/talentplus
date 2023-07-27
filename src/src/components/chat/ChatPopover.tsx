import React from 'react';
import {
    Badge,
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Popover,
    Tooltip,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MailIcon from '@mui/icons-material/MailOutlineOutlined';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import globalStyles from '../../config/globalCss';
import ChatUsers from './ChatUsers';
import User from '../../models/user';
import ChatArea from './ChatArea';
import StyledBtnComponent from '../common/StyledBtnComponent';

const useStyles: any = makeStyles(() => ({
    titleDiv: {
        alignItems: 'center',
        backgroundColor: '#313a46',
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        height: 72,
        paddingLeft: 10,
        paddingRight: 10,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: '0.9375rem',
        fontWeight: 'bold',
        color: '#D1D5DB',
    },
}));

interface ChatPopOverProps {
    anchorEl: any;
    onClose: any;
    open: boolean;
    rooms: any[];
    onChangeRoom: any;
    user: User;
    selectedRoom: any;
    messageDtos: any;
    sendChatMessage: any;
    onReturnRoom: any;
}

const ChatPopover = ({
    anchorEl,
    onClose,
    open,
    rooms,
    onChangeRoom,
    user,
    selectedRoom,
    messageDtos,
    sendChatMessage,
    onReturnRoom,
}: ChatPopOverProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    return (
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
            <Box className={classes.titleDiv}>
                <Typography variant="h4" className={clsx(classes.title, globalClasses.titleDashboard)}>
                    {t('chat')}
                </Typography>
                <Tooltip title="Notifications">
                    <IconButton
                        size="small"
                        aria-label="show new messages"
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={() => {}}>
                        <Badge color="error">
                            <MailIcon fontSize="small" sx={{ fill: '#bdbdbd' }} />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ p: 2 }}>
                <Card>
                    <CardContent sx={{ padding: 0 }}>
                        {!selectedRoom && rooms && rooms[0] !== undefined && (
                            <ChatUsers onRoomSelect={onChangeRoom} rooms={rooms} user={user} />
                        )}
                        {selectedRoom && messageDtos && Array.isArray(messageDtos) && (
                            <>
                                <Divider />
                                <ChatArea
                                    sendMessage={sendChatMessage}
                                    room={selectedRoom}
                                    messages={messageDtos}
                                    isPopUp
                                />
                            </>
                        )}
                    </CardContent>
                    <CardActions>
                        {selectedRoom && (
                            <Grid item xs={12} sx={{ textAlign: 'right', flex: 'auto' }}>
                                <StyledBtnComponent title={t('returnToRooms')} handleOnClick={onReturnRoom} />
                            </Grid>
                        )}
                    </CardActions>
                </Card>
            </Box>
        </Popover>
    );
};

export default ChatPopover;
