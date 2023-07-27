import { Box, Container, Tabs, Tab, Theme, InputBase, Grid, LinearProgress, Fade, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { RootState } from '../../store/store';
import PageTitle from '../common/PageTitle';
import {
    ADMIN_ROLE,
    ASCENDING,
    CONFIRM_PASSWORD,
    CONSULTANT_ROLE,
    EMPLOYER_ROLE,
    PASSWORD,
    REGISTERED_USERS,
} from '../../config/constants';
import User from '../../models/user';
import globalStyles from '../../config/globalCss';
import { deleteUserAdmin, listUsers, resetPasswordAdmin } from '../../store/reducers/admin/adminActions';
import { SearchUsersParam } from '../../config/interfaces';
import TabPanel from '../common/TabPanel';
import StyledBtnComponent from '../common/StyledBtnComponent';
import PersonalInfo from '../account/PersonalInfo';
import DialogMsg from '../common/DialogMsg';
import ChatContentByUser from '../chat/ChatContentByUser';
import config from '../../config/config';
import AdminNewUser from './AdminNewUser';
import TextFieldComponent from '../common/TextFieldComponent';
import { passwordValidation } from '../helpers/utilityFunctions';
import i18next from '../../config/i18next';

const Search = styled('div')(({ theme }: { theme: Theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ced4da',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        borderColor: theme.palette.baseColor,
    },
    marginRight: theme.spacing(2),
    marginLeft: '0px !important',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    color: theme.palette.baseColorTxt,
    fontSize: '0.9rem',
    padding: '0.45rem 0.9rem',
    '&:focus': {
        borderColor: theme.palette.baseColor,
    },
    marginBottom: 16,
}));

const SearchIconWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const ActionBtnsRender = ({
    handleView,
    handleChat,
    handleResetPassword,
    id,
    t,
    handleDeleteUser,
}: {
    handleView: any;
    handleChat: any;
    handleResetPassword: any;
    id: any;
    t: any;
    handleDeleteUser?: any;
}) => {
    const cssCell = {
        minWidth: 300,
        marginRight: 16,
        overflow: 'auto',
        height: 'auto',
    };
    return (
        <Grid container className="MuiDataGrid-cell" style={cssCell}>
            <Grid item xs={2} paddingRight={2}>
                <StyledBtnComponent title={t('View')} gridWidth={50} handleOnClick={handleView(id)} />
            </Grid>
            <Grid item xs={4}>
                <StyledBtnComponent title={t('Chat')} gridWidth={50} handleOnClick={handleChat(id)} />
            </Grid>
            <Grid item xs={5} paddingRight={1}>
                <StyledBtnComponent title={t('resetPassword')} gridWidth={60} handleOnClick={handleResetPassword(id)} />
            </Grid>
            <Grid item xs={3} paddingRight={1}>
                <StyledBtnComponent title={t('deleteUser')} gridWidth={50} handleOnClick={handleDeleteUser(id)} />
            </Grid>
        </Grid>
    );
};

ActionBtnsRender.defaultProps = {
    handleDeleteUser: null,
};

const BtnComponentReset = ({
    handleSaveNewPassword,
    handleCancel,
    loading,
    t,
}: {
    handleSaveNewPassword: any;
    handleCancel: any;
    loading: boolean;
    t: any;
}) => (
    <Grid container justifyContent="center" alignItems="center" margin="auto" spacing={1}>
        <Grid item xs={7} />
        <Grid item xs={3} textAlign="right">
            <StyledBtnComponent title={t('cancel')} handleOnClick={handleCancel} />
        </Grid>
        <Grid item xs={2}>
            <StyledBtnComponent title={t('save')} handleOnClick={handleSaveNewPassword} loading={loading} />
        </Grid>
    </Grid>
);

const PersonalInfoWrapper = ({
    btnAction,
    currentUser,
    connection,
}: {
    btnAction: any;
    currentUser: any;
    connection: HubConnection;
}) => (
    <Fade in={btnAction !== 0}>
        <Box>
            {btnAction === 1 && <PersonalInfo user={currentUser || null} />}
            {btnAction === 2 && <ChatContentByUser userChat={currentUser} connectionParam={connection} />}
        </Box>
    </Fade>
);

interface TabWrapper {
    columns: GridColDef[];
    pageSize: number;
    onPageChange: any;
    onPageSizeChange: any;
    totalRows: number;
    users: User[];
    loading: boolean;
}

const TabPanelWrapper = ({
    columns,
    pageSize,
    onPageChange,
    onPageSizeChange,
    totalRows,
    users,
    loading,
}: TabWrapper) => (
    <DataGrid
        style={{ height: 400 }}
        columns={columns}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={[10, 20, 25]}
        pagination
        autoPageSize
        rowCount={totalRows}
        rows={users}
        components={{
            LoadingOverlay: LinearProgress,
        }}
        loading={loading}
    />
);

const searchParamDefault: SearchUsersParam = {
    role: CONSULTANT_ROLE,
    userName: '',
    currentPage: 0,
    orderBy: ASCENDING,
    orderByItem: 'Id',
    codeLanguage: i18next.resolvedLanguage.toLocaleUpperCase(),
};

const BtnComponentDeleteUser = ({
    handleDeleteUser,
    handleCancel,
    loading,
    t,
}: {
    handleDeleteUser: any;
    handleCancel: any;
    loading: boolean;
    t: any;
}) => (
    <Grid container justifyContent="center" alignItems="center" margin="auto" spacing={1}>
        <Grid item xs={7} />
        <Grid item xs={3} textAlign="right">
            <StyledBtnComponent title={t('cancel')} handleOnClick={handleCancel} />
        </Grid>
        <Grid item xs={2}>
            <StyledBtnComponent title={t('delete')} handleOnClick={handleDeleteUser} loading={loading} />
        </Grid>
    </Grid>
);

const AdminUsers = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = globalStyles();
    const [currentTab, setCurrentTab] = useState(0);
    const [openNewUser, setOpenNewUser] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [searchParam, setSearchParam] = useState<SearchUsersParam>(searchParamDefault);
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [btnAction, setBtnAction] = useState(0);

    const { users, loading, connectedUser }: { users: User[]; loading: boolean; connectedUser: User } = useSelector(
        (state: RootState) => ({
            users: state.admin.users,
            loading: state.admin.loading,
            connectedUser: state.authentication.user,
        })
    );
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());
    const [isResetingPassword, setIsResetingPassword] = useState<boolean>(false);
    const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false);
    const connection = new HubConnectionBuilder()
        .withUrl(`${config.CHAT_URL}?email=${connectedUser.email}`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    const totalRows = users.length;

    const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
        event.preventDefault();
        setCurrentTab(newTab);
        const newRoleEmAdmin = newTab === 1 ? EMPLOYER_ROLE : ADMIN_ROLE;
        const newRole = newTab === 0 ? CONSULTANT_ROLE : newRoleEmAdmin;
        setSearchParam({
            ...searchParamDefault,
            role: newRole,
        });
    };

    const handleChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newMap: Map<string, string> = msgErr;
        if (type === 'name') {
            setSearchParam({
                ...searchParam,
                userName: value,
            });
        }
        if (type === PASSWORD) {
            const errPass = passwordValidation(value || '', confirmPassword || '', t);
            const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';
            const errTxtPassword = errPass.get(PASSWORD) || '';

            if (errTxtPassword) {
                newMap.set(PASSWORD, errTxtPassword);
            } else {
                newMap.delete(PASSWORD);
            }

            if (errTxtConfirm) {
                newMap.set(CONFIRM_PASSWORD, errTxtConfirm);
            } else {
                newMap.delete(CONFIRM_PASSWORD);
            }
            setMsgErr(newMap);
            setPassword(value);
        }
        if (type === CONFIRM_PASSWORD) {
            const errPass = passwordValidation(password || '', value || '', t);
            const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';
            if (errTxtConfirm) {
                newMap.set(CONFIRM_PASSWORD, errTxtConfirm);
            } else {
                newMap.delete(CONFIRM_PASSWORD);
            }
            setMsgErr(newMap);
            setConfirmPassword(value);
        }
    };

    const handleView = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        const user: User = users.filter((u) => u.id === rowId)[0];
        if (user) {
            setCurrentUser(user);
            setBtnAction(1);
        }
    };

    const handleChat = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        const user: User = users.filter((u) => u.id === rowId)[0];
        if (user) {
            setCurrentUser(user);
            setBtnAction(2);
        }
    };

    const onPageChange = (pageNumber: number) => {
        setPage(pageNumber);
        setSearchParam({
            ...searchParam,
            currentPage: pageNumber,
        });
    };

    const handleOpenNewUser = () => {
        setOpenNewUser(!openNewUser);
    };

    const handleResetPassword = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        const user: User = users.filter((u) => u.id === rowId)[0];
        if (user) {
            setCurrentUser(user);
            setOpenResetPassword(true);
        }
    };

    const handleOpenDeleteUser = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        const user: User = users.filter((u) => u.id === rowId)[0];
        if (user) {
            setCurrentUser(user);
            setOpenDeleteUser(true);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: t('id'), width: 150 },
        { field: 'firstName', headerName: t('firstName'), width: 150 },
        { field: 'lastName', headerName: t('lastName'), width: 200 },
        { field: 'username', headerName: t('userName'), width: 150 },
        { field: 'email', headerName: t('email'), width: 250 },
        {
            field: 'actions',
            headerName: t('actions'),
            width: 400,
            renderCell: (params) => (
                <ActionBtnsRender
                    handleChat={handleChat}
                    handleView={handleView}
                    handleResetPassword={handleResetPassword}
                    id={params.id}
                    t={t}
                    handleDeleteUser={handleOpenDeleteUser}
                />
            ),
        },
    ];

    const columnsAdmin: GridColDef[] = [
        { field: 'id', headerName: t('id'), width: 150 },
        { field: 'firstName', headerName: t('firstName'), width: 150 },
        { field: 'lastName', headerName: t('lastName'), width: 200 },
        { field: 'email', headerName: t('email'), width: 250 },
        {
            field: 'actions',
            headerName: t('actions'),
            width: 500,
            renderCell: (params) => (
                <ActionBtnsRender
                    handleChat={handleChat}
                    handleView={handleView}
                    id={params.id}
                    t={t}
                    handleResetPassword={handleResetPassword}
                    handleDeleteUser={handleOpenDeleteUser}
                />
            ),
        },
    ];

    const handleDeleteUser = () => {
        if (currentUser) {
            dispatch(deleteUserAdmin(currentUser.id || ''));
            setIsDeletingUser(true);
        }
    };

    const handleSaveNewPassword = () => {
        if (msgErr.size === 0) {
            const payload = {
                userName: currentUser?.userName,
                newPassword: password,
            };
            dispatch(resetPasswordAdmin(payload));
            setIsResetingPassword(true);
        }
    };

    useEffect(() => {
        dispatch(listUsers(searchParam));
    }, [dispatch, page, currentTab]);

    useEffect(() => {
        if (!loading && isResetingPassword) {
            setIsResetingPassword(false);
            setOpenResetPassword(false);
            setPassword('');
            setConfirmPassword('');
        }
        if (!loading && isDeletingUser) {
            setIsDeletingUser(false);
            setOpenDeleteUser(false);
            dispatch(listUsers(searchParam));
        }
    }, [loading]);

    const BtnComponentResetPassword = (
        <BtnComponentReset
            handleSaveNewPassword={handleSaveNewPassword}
            handleCancel={() => setOpenResetPassword(false)}
            loading={loading}
            t={t}
        />
    );

    const BtnComponentDeleteAccount = (
        <BtnComponentDeleteUser
            handleDeleteUser={handleDeleteUser}
            handleCancel={() => setOpenDeleteUser(false)}
            t={t}
            loading={loading}
        />
    );

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                paddingTop: '0px !important',
            }}>
            <Container maxWidth="xl">
                <PageTitle
                    breadCrumbItems={[{ label: t(REGISTERED_USERS), path: '', active: true }]}
                    title={t(REGISTERED_USERS)}
                    icon={<PeopleAltOutlinedIcon fontSize="small" />}
                />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Grid container>
                            <Grid item xs={4} marginLeft={0}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder={`${t('searchBy')} ${t('name')}`}
                                        inputProps={{ 'aria-label': `${t('searchBy')} ${t('name')}` }}
                                        onChange={handleChange('name')}
                                    />
                                </Search>
                            </Grid>
                            <Grid item xs={8} />
                            <Grid item xs={12}>
                                <Tabs
                                    className={classes.tabs}
                                    centered
                                    value={currentTab}
                                    onChange={handleChangeTab}
                                    aria-label="profile options"
                                    variant="fullWidth">
                                    <Tab
                                        label={t(CONSULTANT_ROLE)}
                                        id="tab-0"
                                        aria-controls="tabpanel-0"
                                        className={classes.tab}
                                    />
                                    <Tab
                                        label={t(EMPLOYER_ROLE)}
                                        id="tab-1"
                                        aria-controls="tabpanel-1"
                                        className={classes.tab}
                                    />
                                    <Tab
                                        label={t(ADMIN_ROLE)}
                                        id="tab-2"
                                        aria-controls="tabpanel-2"
                                        className={classes.tab}
                                    />
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Box>
                    <TabPanel value={currentTab} index={0}>
                        <TabPanelWrapper
                            columns={columns}
                            pageSize={pageSize}
                            onPageChange={onPageChange}
                            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            totalRows={totalRows}
                            loading={loading}
                            users={users}
                        />
                    </TabPanel>
                    <TabPanel value={currentTab} index={1}>
                        <TabPanelWrapper
                            columns={columns}
                            pageSize={pageSize}
                            onPageChange={onPageChange}
                            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            totalRows={totalRows}
                            loading={loading}
                            users={users}
                        />
                    </TabPanel>
                    <TabPanel value={currentTab} index={2}>
                        <TabPanelWrapper
                            columns={columnsAdmin}
                            pageSize={pageSize}
                            onPageChange={onPageChange}
                            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            totalRows={totalRows}
                            loading={loading}
                            users={users}
                        />
                    </TabPanel>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <StyledBtnComponent title={t('newAdminUser')} handleOnClick={handleOpenNewUser} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <DialogMsg
                title={btnAction === 1 ? t('profileDetails') : t('chat')}
                open={btnAction !== 0}
                isAction={false}
                handleClose={() => setBtnAction(0)}>
                <PersonalInfoWrapper btnAction={btnAction} currentUser={currentUser} connection={connection} />
            </DialogMsg>
            <AdminNewUser open={openNewUser} handleClose={() => setOpenNewUser(false)} />
            <DialogMsg
                title={t('resetPassword')}
                open={openResetPassword}
                handleClose={() => setOpenResetPassword(false)}
                isAction
                ActionComponent={BtnComponentResetPassword}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextFieldComponent
                            id={PASSWORD}
                            label={t('Password')}
                            name="password"
                            placeholder={t('Enter your password')}
                            type="password"
                            value={password}
                            handleChange={handleChange('password')}
                            required
                            autoCompleteInput="new-password"
                            error={msgErr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldComponent
                            id={CONFIRM_PASSWORD}
                            label={t('ConfirmPassword')}
                            name="confirmPassword"
                            placeholder={t('ConfirmPassword')}
                            type="password"
                            value={confirmPassword}
                            handleChange={handleChange('confirmPassword')}
                            error={msgErr}
                            autoCompleteInput="new-password"
                        />
                    </Grid>
                </Grid>
            </DialogMsg>
            <DialogMsg
                title={t('deleteUser')}
                open={openDeleteUser}
                handleClose={() => setOpenDeleteUser(false)}
                isAction
                ActionComponent={BtnComponentDeleteAccount}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{t('deleteAccountTxt')}</Typography>
                    </Grid>
                </Grid>
            </DialogMsg>
        </Box>
    );
};

export default AdminUsers;
