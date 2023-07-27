import React, { useEffect, useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import config from '../../config/config';
import { RootState } from '../../store/store';
import { failMessageModal } from '../../store/reducers/genericActions';
import User from '../../models/user';
import globalStyles from '../../config/globalCss';
import ChatArea from './ChatArea';
import { ChatTypeEnum, CreateRoomType } from '../../models/typeProps';
import { createChat } from '../../store/reducers/admin/adminActions';
import { setActifRoom } from '../../store/reducers/auth/authActions';
import ChatRoom from '../../models/chatRoom';

const useStyles: any = makeStyles(() => ({
    titleDiv: {
        alignItems: 'center',
        backgroundColor: '#313a46',
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        height: 72,
        paddingLeft: 10,
        paddingRight: 10,
        textTransform: 'uppercase',
        width: '100%',
    },
    title: {
        fontSize: '0.9375rem',
        fontWeight: 'bold',
        color: '#D1D5DB',
    },
}));

const ChatContentByUser = ({ userChat, connectionParam }: { userChat: User; connectionParam: HubConnection }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    const [connection, setConnection] = useState<HubConnection | null>(connectionParam);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom>();
    const dispatch = useDispatch();
    const [messageDtos, setMessageDtos] = useState<any>([]);
    const { user, actifRoom } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        actifRoom: state.authentication.actifRoom,
    }));
    const latestMessages = useRef(null);
    latestMessages.current = messageDtos;

    const joinChat = async (u: string) => {
        if (connection) {
            connection.on('FetchRooms', async (incomingRooms: any[]) => {
                const userRoom = incomingRooms.filter((r: any) => {
                    const users = r.users.filter((userInChat: User) => userInChat.id === userChat.id);
                    if (users.length > 0) return true;
                    return false;
                });
                if (userRoom.length >= 1) {
                    const romUser = userRoom[0];
                    await connection.invoke('JoinRoom', romUser.id);
                    setSelectedRoom({ ...romUser });
                    dispatch(setActifRoom(romUser));
                    setMessageDtos([...romUser.messages]);
                } else {
                    const payload: CreateRoomType = {
                        roomName: `${userChat.username}-${user.username}`,
                        type: ChatTypeEnum.Private,
                        userIds: [userChat.id || ''],
                    };
                    await dispatch(createChat(payload));
                    await connection.invoke('JoinChat', u, actifRoom?.id);
                }
            });

            connection.on('RecieveMessage', (chatMessage) => {
                if (
                    actifRoom &&
                    actifRoom.id === chatMessage.msg.chatRoomId &&
                    latestMessages &&
                    latestMessages.current
                ) {
                    const updatedMessges: any = [...latestMessages.current];
                    updatedMessges.push(chatMessage.msg);
                    setMessageDtos(updatedMessges);
                }
            });

            connection.on('ChangeRoom', (incomingMessages: any) => {
                if (latestMessages && latestMessages.current) {
                    setMessageDtos([...incomingMessages]);
                }
            });

            connection.onclose(() => {
                setConnection(null);
            });

            await connection.start();
            await setConnection(connection);
            await connection.invoke('JoinChat', u, actifRoom?.id);
        }
    };

    const sendChatMessage = async (message: any) => {
        try {
            if (connection) await connection.invoke('SendMessage', message);
        } catch (e) {
            dispatch(failMessageModal(t('errorMessage')));
        }
    };

    useEffect(() => {
        joinChat(user.id);
    }, [user]);

    useEffect(() => {
        if (!connectionParam) {
            const con = new HubConnectionBuilder()
                .withUrl(`${config.CHAT_URL}?email=${user.email}`)
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            setConnection(con);
        }
    }, [connectionParam]);

    return (
        <Grid container>
            <Box className={classes.titleDiv}>
                <Typography variant="h4" className={clsx(classes.title, globalClasses.titleDashboard)}>
                    {`${t('chat')} - ${userChat.firstName || userChat.email}`}
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Card>
                    <CardContent sx={{ padding: 0 }}>
                        {selectedRoom && messageDtos && Array.isArray(messageDtos) && (
                            <>
                                <Divider />
                                <ChatArea sendMessage={sendChatMessage} room={selectedRoom} messages={messageDtos} />
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
};

export default ChatContentByUser;
