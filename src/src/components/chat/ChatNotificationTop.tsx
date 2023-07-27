import React, { useEffect, useRef, useState } from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutlineOutlined';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChatPopover from './ChatPopover';
import { RootState } from '../../store/store';
import config from '../../config/config';
import { failMessageModal } from '../../store/reducers/genericActions';
import { setChatRoom, setActifRoom } from '../../store/reducers/auth/authActions';
import ChatRoom from '../../models/chatRoom';

const ChatNotificationTop = () => {
    const { t } = useTranslation();
    const anchorRef = useRef(null);
    const dispatch = useDispatch();
    const [openPopover, setOpenPopover] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom>();
    const [messageDtos, setMessageDtos] = useState<any>([]);
    // const [rooms, setRooms] = useState<any>([]);
    const [connection, setConnection] = useState<HubConnection | undefined>();
    const latestMessages = useRef(null);
    latestMessages.current = messageDtos;

    const { user, rooms, actifRoom } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        rooms: state.authentication.chatRooms,
        actifRoom: state.authentication.actifRoom,
    }));

    const hubConnectionBuilder = new HubConnectionBuilder()
        .withUrl(`${config.CHAT_URL}?email=${user.email}`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    useEffect(() => {
        hubConnectionBuilder.start();
    }, []);

    hubConnectionBuilder.on('RecieveMessage', (chatMessage) => {
        dispatch(setChatRoom(chatMessage.room));
    });

    const handleOpenPopover = () => {
        setOpenPopover(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
    };

    const joinRoom = (roomId: string) => {
        connection?.invoke('JoinRoom', roomId);
    };

    const onChangeRoom = (room: ChatRoom) => {
        joinRoom(room.id);
        dispatch(setActifRoom(room));
        setSelectedRoom({ ...room });
        setMessageDtos([...room.messages]);
    };

    const onReturnRoom = () => {
        dispatch(setActifRoom(undefined));
        setSelectedRoom(undefined);
    };

    const joinChat = async (u: string) => {
        try {
            const con = new HubConnectionBuilder()
                .withUrl(`${config.CHAT_URL}?email=${user.email}`)
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            con.on('RecieveMessage', (chatMessage) => {
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

            con.on('ChangeRoom', (incomingMessages: any) => {
                if (latestMessages && latestMessages.current) {
                    setMessageDtos([...incomingMessages]);
                }
            });

            con.onclose(() => {
                setConnection(undefined);
            });

            await con.start();
            await con.invoke('JoinChat', u, actifRoom?.id);

            setConnection(con);
        } catch (e) {
            dispatch(failMessageModal(t('errorMessage')));
        }
    };

    const sendChatMessage = async (message: any) => {
        try {
            if (connection) await connection.invoke('SendMessage', message);
        } catch (e) {
            dispatch(failMessageModal(t('errorMessage')));
        }
    };

    const getLenght = () => {
        if (!rooms) return 0;
        const messages = rooms.map((x: any) => x.messages).flat();
        return messages.filter((x: any) => x.authorId !== user.id).length;
    };

    useEffect(() => {
        if (openPopover) {
            joinChat(user.id);
        }
    }, [openPopover]);

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    sx={{ ml: 1 }}
                    ref={anchorRef}
                    onClick={handleOpenPopover}>
                    <Badge badgeContent={getLenght()} color="error">
                        <MailIcon fontSize="medium" sx={{ fill: '#bdbdbd' }} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <ChatPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
                rooms={rooms}
                onChangeRoom={onChangeRoom}
                user={user}
                selectedRoom={selectedRoom}
                onReturnRoom={onReturnRoom}
                messageDtos={messageDtos}
                sendChatMessage={sendChatMessage}
            />
        </>
    );
};

export default ChatNotificationTop;
