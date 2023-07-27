import React, { useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { RootState } from '../../store/store';
import ChatUsers from './ChatUsers';
import ChatArea from './ChatArea';
import { setActifRoom } from '../../store/reducers/auth/authActions';
import config from '../../config/config';
import ChatRoom from '../../models/chatRoom';

const ChatLobby = () => {
    const { user, actifRoom } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        actifRoom: state.authentication.actifRoom,
    }));

    const [connection, setConnection] = useState<HubConnection | undefined>();
    const [isChatJoined, setIsChatJoined] = useState(false);
    const [messageDtos, setMessageDtos] = useState<any>([]);
    const [rooms] = useState<any>([]);
    const dispatch = useDispatch();
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom>();
    const latestMessages = useRef(null);
    latestMessages.current = messageDtos;

    const JoinRoom = (roomId: string) => {
        connection?.invoke('JoinRoom', roomId);
    };

    const joinChat = async (u: string) => {
        try {
            const con = new HubConnectionBuilder()
                .withUrl(`${config.CHAT_URL}?email=${user.email}`)
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            // con.on('FetchRooms', (incomingRooms) => {
            //     setRooms(incomingRooms);
            // });
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
            // console.log(e);
        }
    };

    const onChangeRoom = (room: ChatRoom) => {
        // closeConnection();
        JoinRoom(room.id);
        setSelectedRoom({ ...room });
        dispatch(setActifRoom(room));
        setMessageDtos([...room.messages]);
    };
    const sendChatMessage = async (message: any) => {
        try {
            if (connection) await connection.invoke('SendMessage', message);
        } catch (e) {
            // console.log(e);
        }
    };

    if (!isChatJoined) {
        setIsChatJoined(true);
        joinChat(user.id);
    }

    return (
        <Row>
            <Col xxl={4} xl={{ span: 6, order: 1 }}>
                {rooms && rooms[0] !== undefined && <ChatUsers onRoomSelect={onChangeRoom} rooms={rooms} user={user} />}
            </Col>

            <Col xxl={8} xl={{ span: 12, order: 2 }}>
                {selectedRoom && messageDtos && Array.isArray(messageDtos) && (
                    <ChatArea sendMessage={sendChatMessage} room={selectedRoom} messages={messageDtos} />
                )}
            </Col>

            {/* <Col xxl={{ span: 3, order: 2 }} xl={{ span: 6, order: 1 }}>
                <ChatProfile selectedUser={selectedUser} />
            </Col> */}
        </Row>
    );
};

export default ChatLobby;
