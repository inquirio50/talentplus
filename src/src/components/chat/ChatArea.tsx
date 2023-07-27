import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SimpleBar from 'simplebar-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Avatar, Card, CardActions, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';

// components
import clsx from 'clsx';
import FormInput from '../common/FormInput';
import Loader from '../common/Loader';
import { RootState } from '../../store/store';
import { UserCircle } from '../icons/Icons';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { setMessageRead } from '../../store/reducers/auth/authActions';
import ChatRoom from '../../models/chatRoom';

const useStyles: any = makeStyles(() => ({
    scroll: {
        maxHeight: 500,
        overflow: 'auto',
    },
    name: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#98a6ad',
    },
    message: {
        fontSize: '0.8375rem',
        color: '#98a6ad',
    },
    otherUsrCard: {
        backgroundColor: '#98a6ad',
    },
    otherUsrName: {
        fontSize: '14px',
        fontWeight: '700',
    },
    otherUsrMessage: {
        fontSize: '0.8375rem',
        color: 'white',
    },
}));

interface UserMessageProps {
    t: any;
    message: {
        id: string;
        chatRoomId: string;
        createAt: Date;
        type: string;
        value: string;
        authorId: string;
        author: any;
        image: any;
        size: string;
    };

    toUser: {
        id: string;
    };

    anchorEl: any;
    currentId: string | null;
    openMenu: boolean;
    handleClick: any;
    handleClose: any;
    handleCopy: any;
    handleDelete: any;
    classes: any;
}

const UserMessage = ({
    t,
    message,
    toUser,
    anchorEl,
    currentId,
    openMenu,
    handleClick,
    handleClose,
    handleCopy,
    handleDelete,
    classes,
}: UserMessageProps) => (
    <Grid item xs={12} paddingBottom={2}>
        <Card>
            <CardContent className={message.authorId === toUser.id ? classes.otherUsrCard : null} sx={{ padding: 2 }}>
                <Grid container>
                    <Grid item xs={2} alignContent="center" margin="auto">
                        <Avatar
                            src={message.image || undefined}
                            sx={{
                                height: 40,
                                width: 40,
                            }}>
                            <UserCircle fontSize="small" />
                        </Avatar>
                    </Grid>
                    <Grid item xs={9} alignContent="center" margin="auto">
                        <Grid container>
                            <Grid item xs={message.type === 'file' ? 8 : 12}>
                                <Typography
                                    className={message.authorId === toUser.id ? classes.otherUsrName : classes.name}>
                                    {message?.author?.email || 'unknown'}
                                </Typography>
                                {(message.type === 'text' || message.type === 'Text' || message.type === null) && (
                                    <Typography
                                        className={
                                            message.authorId === toUser.id ? classes.otherUsrMessage : classes.message
                                        }>
                                        {message.value}
                                    </Typography>
                                )}
                            </Grid>
                            {message.type === 'file' && (
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className="avatar-sm">
                                                <span className="avatar-title rounded">
                                                    <i className="uil uil-file-upload-alt font-20" />
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item xs={12} className="text-muted fw-bold">
                                                <Typography className={classes.message}>{message.value}</Typography>
                                            </Grid>
                                            <p className="mb-0">{message.size}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item xs={12} className="btn btn-link btn-lg text-muted">
                                                <i className="dripicons-download" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={1} alignContent="center" margin="auto">
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={openMenu ? 'long-menu' : undefined}
                            aria-expanded={openMenu ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick(message.id)}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                },
                            }}>
                            <MenuItem onClick={handleCopy(currentId)}>{t('copy')}</MenuItem>
                            <MenuItem onClick={handleDelete(currentId)}>{t('delete')}</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
);

interface ChatAreaProps {
    isPopUp?: boolean;
    sendMessage: (message: string) => void;
    room: {
        id: string;
        messages: any;
        name: string;
        type: number;
        users: any;
        contacts: any[];
    };
    messages: any;
}

// ChatArea
const ChatArea = ({ sendMessage, room, messages, isPopUp }: ChatAreaProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const classes = useStyles();
    const [loading] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const openMenu = Boolean(anchorEl);
    const { chatRooms }: { chatRooms: ChatRoom[] } = useSelector((state: RootState) => ({
        chatRooms: state.authentication.chatRooms,
    }));

    const { u } = useSelector((state: RootState) => ({
        u: state.authentication.user,
    }));

    const user = room.users.find((el: any) => el.email !== u.email);

    const schemaResolver = yupResolver(
        yup.object().shape({
            newMessage: yup.string().required('Please enter your messsage'),
        })
    );

    /*
     * form methods
     */
    const methods = useForm({ resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = methods;

    /**
     * sends the chat message
     */
    const sendChatMessage = (value: any, event: any) => {
        event.preventDefault();
        sendMessage(value.newMessage);
        reset();
    };

    const messageRef: any = useRef();

    const handleClick = (id: string | undefined) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        if (id) {
            setCurrentId(id);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnMouseEnter = () => {
        const chatmessages = chatRooms.map((x: any) => x.messages).flat();
        if (chatmessages.some((x) => x.authorId !== user.id && !x.isRead)) dispatch(setMessageRead(room.id)); // x.authorId !== user.id &&
    };

    useEffect(() => {
        if (messageRef && messageRef.current) {
            messageRef.current?.scrollIntoView();
        }
    }, [messages]);

    return (
        <Card>
            <CardContent className={clsx('position-relative', classes.scroll)} sx={{ padding: 0 }}>
                {loading && <Loader />}

                <SimpleBar style={{ minHeight: 150, maxHeight: isPopUp ? 300 : 500, width: '100%' }}>
                    <Grid container>
                        {messages.map((message: any) => (
                            <UserMessage
                                key={message.id}
                                message={message}
                                toUser={user}
                                t={t}
                                anchorEl={anchorEl}
                                currentId={currentId}
                                openMenu={openMenu}
                                handleClick={handleClick}
                                handleClose={handleClose}
                                handleCopy={() => {}}
                                handleDelete={() => {}}
                                classes={classes}
                            />
                        ))}
                    </Grid>
                    <Grid item ref={messageRef} />
                </SimpleBar>
            </CardContent>
            <CardActions>
                <form
                    noValidate
                    name="chat-form"
                    id="chat-form"
                    onSubmit={handleSubmit(sendChatMessage)}
                    onFocus={() => handleOnMouseEnter()}
                    style={{ width: '100%', paddingRight: 5 }}>
                    <Grid container>
                        <Grid item xs={10} paddingRight={2}>
                            <FormInput
                                type="text"
                                name="newMessage"
                                placeholder={t('typeYourMessage')}
                                register={register}
                                key="newMessage"
                                errors={errors}
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledBtnComponent
                                title=""
                                startIcon={<i className="uil uil-message" style={{ fontSize: 14 }} />}
                                isSubmit
                                gridWidth="100%"
                            />
                        </Grid>
                    </Grid>
                </form>
            </CardActions>
        </Card>
    );
};

ChatArea.defaultProps = {
    isPopUp: false,
};

export default ChatArea;
