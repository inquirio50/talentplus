import React, { useState } from 'react';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { UserCircle } from '../icons/Icons';
import ChatRoom from '../../models/chatRoom';

const useStyles: any = makeStyles((theme: Theme) => ({
    fromMessage: {
        fontSize: 12,
        color: theme.palette.baseColorTxt,
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    message: {
        fontSize: 12,
        color: theme.palette.baseColorTxt,
        textDecoration: 'none',
        marginTop: 5,
    },
    date: {
        textDecoration: 'none',
        color: theme.palette.baseColorTxt,
        fontSize: 10,
        fontWeight: 'bold',
    },
}));

interface ChatUsersProps {
    onRoomSelect: (value: ChatRoom) => void;
    rooms: any[];
    user: any;
}

const ChatUsers = ({ onRoomSelect, rooms, user }: ChatUsersProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [selectedRoom, setSelectedRoom] = useState<any>();

    const activateRoom = (room: any) => {
        setSelectedRoom(room);
        if (onRoomSelect) {
            onRoomSelect(room);
        }
    };

    return (
        <>
            {!rooms && <Typography>{t('noMessages')}</Typography>}
            {rooms && (
                <Grid item xs={12} className="tab-content">
                    <SimpleBar style={{ maxHeight: 550, width: '100%', overflow: 'auto' }}>
                        {rooms.map((room) => (
                            <Button
                                key={room.id}
                                sx={{ padding: 0, width: '100%' }}
                                onClick={() => {
                                    activateRoom(room);
                                }}>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={2}
                                        className={classnames('d-flex', 'align-items-start', 'mt-1', 'p-2', {
                                            'bg-light': room.id === selectedRoom?.id,
                                        })}>
                                        <Avatar
                                            sx={{
                                                height: 40,
                                                width: 40,
                                            }}
                                            src={user.image}>
                                            <UserCircle fontSize="small" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={8} alignContent="center" alignItems="center" margin="auto">
                                        <Typography className={classes.fromMessage}>
                                            {Array.isArray(room.users.find((el: any) => el.email !== user.email))
                                                ? room.users
                                                      .find((el: any) => el.email !== user.email)
                                                      .map((x: any) => `${x.email} `)
                                                : room.users.find((el: any) => el.email !== user.email).email}
                                        </Typography>
                                        <Typography className={classes.message}>
                                            {room?.messages.at(-1)?.value}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography className={classes.date}>
                                            {room?.messages[0]?.createdAt.substring(
                                                0,
                                                room?.messages.at(-1)?.createdAt.indexOf('T')
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        ))}
                    </SimpleBar>
                </Grid>
            )}
        </>
    );
};

export default ChatUsers;
