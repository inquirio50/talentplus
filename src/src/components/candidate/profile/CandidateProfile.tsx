import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Typography, Grid, Avatar, Divider, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../../models/profile';
import { RootState } from '../../../store/store';
import TabPanel from '../../common/TabPanel';
import PersonalInformation from '../../common/PersonalInformation';
import ProfessionalInformation from '../../common/ProfessionalInformation';
import MyPreference from '../../common/MyPreference';
import ProfessionalExperience from '../../common/ProfessionalExperience';
import PersonalEducation from '../../common/PersonalEducation';
import PersonalInfoDetails from '../../common/PersonalInfoDetails';
import ProfesionalInfoDetails from '../../common/ProfesionalInfoDetails';
import PreferenceDetails from '../../common/PreferenceDetails';
import User from '../../../models/user';
import { Experience } from '../../../models/experience';
import { Education } from '../../../models/education';
import { fetchCandidatetInfo, profileUpdateInfo } from '../../../store/reducers/candidate/candidateActions';
import { fetchProfilParameters } from '../../../store/reducers/genericActions';
import { UserCircle, EditIcon, AddIcon, ResumeIcon } from '../../icons/Icons';
import ChangeEmploymentType from '../../common/ChangeEmploymentType';
import Deletion from '../../common/Deletion';
import ExperienceDisplay from '../../common/ExperienceDisplay';
import EducationDisplay from '../../common/EducationDisplay';
import i18n from '../../../config/i18next';
import globalStyles from '../../../config/globalCss';
import { CONSULTANT_ROLE } from '../../../config/constants';
// import CompanyDisplay from '../../common/CompanyDisplay';
import CompanyInfo from '../../common/CompanyInfo';

const userStyles: any = makeStyles((theme: Theme) => ({
    container: {
        padding: '40px 87px 84px 87px',
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('lg')]: {
            padding: '3rem',
        },
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
        },
    },
    content: {
        paddingTop: 33,
    },
    maxContent: {
        maxWidth: 1010,
    },
    tabsWithoutIndicator: {
        '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
        },
    },
    tab: {
        color: 'rgba(0, 0, 0, 0.6)',
        textTransform: 'none',
        padding: 0,
        margin: 0,
        alignItems: 'flex-start',
        minHeight: '30px',
        height: '30px',
        '&.Mui-selected': {
            color: theme.palette.baseColor,
            fontWeight: 400,
        },
        '&.Mui-focusVisible': {
            color: theme.palette.common.white,
        },
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        gap: '10px',
        width: '100%',
        background: theme.palette.common.white,
        boxShadow: '4px 5px 8px rgba(0, 0, 0, 0.08), -5px -5px 8px rgba(0, 0, 0, 0.04)',
        borderRadius: '20px',
        flex: 'none',
        order: 1,
        flexGrow: 0,
        height: 'auto',
        [theme.breakpoints.down('lg')]: {
            margin: '0 auto !important',
            padding: '2rem',
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '3rem !important',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
        },
    },
    boxContainerOut: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        gap: '10px',
        width: '1010px',
        background: theme.palette.common.white,
        boxShadow: '4px 5px 8px rgba(0, 0, 0, 0.08), -5px -5px 8px rgba(0, 0, 0, 0.04)',
        borderRadius: '20px',
        flex: 'none',
        order: 1,
        flexGrow: 0,
        height: 'auto',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            padding: '2rem',
        },
        [theme.breakpoints.down('md')]: {},
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
        },
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 20,
        lineHeight: '24px',
        color: theme.palette.common.black,
    },
    pictureName: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#000000',
    },
    pictureRole: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '15px',

        color: 'rgba(0, 0, 0, 0.8)',
    },

    pictureChange: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '15px',

        color: '#EC008B',
    },
}));

const CandidateProfile = () => {
    const { t } = useTranslation();
    const css = userStyles();
    const classes = globalStyles();
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState(0);
    const [currentSubTab, setCurrentSubTab] = useState(0);
    const [isOpenPersonalInformation, setIsOpenPersonalInformation] = useState(false);
    const [isOpenProfessionalInformation, setIsOpenProfessionalInformation] = useState(false);
    const [isOpenMyPreference, setIsOpenMyPreference] = useState(false);
    const [isOpenProfessionalExperience, setIsOpenProfessionalExperience] = useState(false);
    const [isOpenPersonalEducation, setIsOpenPersonalEducation] = useState(false);
    const [isOpenCompanyDetails, setIsOpenCompanyDetails] = useState(false);

    const { user, profile }: { user: User; profile: Profile } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        profile: state.candidate.profile,
    }));

    useEffect(() => {
        dispatch(fetchCandidatetInfo());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProfilParameters());
    }, []);

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        event.preventDefault();
        setCurrentTab(newTab);
    };

    const handleChangeSubTab = (event: React.SyntheticEvent, newTab: number) => {
        event.preventDefault();
        setCurrentSubTab(newTab);
    };

    const getExperience = (experience: Experience) => {
        if (!experience.appUserId) return { ...profile, experience: [...profile.experience, experience] };

        const newExperience = profile.experience.filter((x) => x.id !== experience.id);
        return { ...profile, experience: [...newExperience, experience] };
    };

    const getEducation = (education: Education) => {
        if (!education.appUserId) return { ...profile, education: [...profile.education, education] };

        const newEducation = profile.education.filter((x) => x.id !== education.id);
        return { ...profile, education: [...newEducation, education] };
    };

    const handleEdit = (updatedValue: any) => {
        dispatch(
            profileUpdateInfo({ ...profile, ...updatedValue, codeLangue: i18n.resolvedLanguage.toLocaleUpperCase() })
        );
    };

    const handleDeleteExperience = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(
            profileUpdateInfo({
                ...profile,
                experience: profile.experience.filter((x) => x.id !== id),
                codeLangue: i18n.resolvedLanguage.toLocaleUpperCase(),
            })
        );
    };

    const handleEditExperience = (updatedValue: any) => {
        dispatch(
            profileUpdateInfo({
                ...profile,
                experience: updatedValue,
                codeLangue: i18n.resolvedLanguage.toLocaleUpperCase(),
            })
        );
    };

    const handleEditEducation = (updatedValue: any) => {
        dispatch(
            profileUpdateInfo({
                ...profile,
                education: updatedValue,
                codeLangue: i18n.resolvedLanguage.toLocaleUpperCase(),
            })
        );
    };

    const handleDeleteEducation = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(
            profileUpdateInfo({
                ...profile,
                education: profile.education.filter((x) => x.id !== id),
                codeLangue: i18n.resolvedLanguage.toLocaleUpperCase(),
            })
        );
    };

    return (
        <Grid container component="main" className={css.container}>
            <Grid item xs={12}>
                <Typography color="#520231" marginTop="20px" marginBottom="20px" className={classes.titleDashboard}>
                    {t('profile')}
                </Typography>
            </Grid>
            <Grid item xs={12} className={css.content}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={12} className={css.maxContent}>
                        <Tabs
                            className={classes.tabs}
                            value={currentTab}
                            onChange={handleChange}
                            aria-label="profile options"
                            variant="fullWidth">
                            <Tab label={t('details')} id="tab-0" aria-controls="tabpanel-0" className={classes.tab} />
                            {user.role === CONSULTANT_ROLE && (
                                <Tab
                                    label={t('company')}
                                    id="tab-1"
                                    aria-controls="tabpanel-1"
                                    className={classes.tab}
                                />
                            )}
                            <Tab
                                label={t('experience')}
                                id={`${user.role === CONSULTANT_ROLE ? 'tab-2' : 'tab-1'}`}
                                aria-controls={`${user.role === CONSULTANT_ROLE ? 'tabpanel-2' : 'tabpanel-1'}`}
                                className={classes.tab}
                            />
                            <Tab
                                label={t('education')}
                                id={`${user.role === CONSULTANT_ROLE ? 'tab-3' : 'tab-2'}`}
                                aria-controls={`${user.role === CONSULTANT_ROLE ? 'tabpanel-3' : 'tabpanel-2'}`}
                                className={classes.tab}
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '40px', marginTop: '3rem' }}>
                        <TabPanel value={currentTab} index={0}>
                            <Grid container>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ textAlign: 'left' }}>
                                    <Tabs
                                        className={css.tabsWithoutIndicator}
                                        orientation="vertical"
                                        value={currentSubTab}
                                        onChange={handleChangeSubTab}>
                                        <Tab
                                            label={t('personalInformation')}
                                            id="tab-00"
                                            aria-controls="tabpanel-00"
                                            className={css.tab}
                                            sx={{
                                                alignItems: 'flex-start',
                                                textAlign: 'left',
                                                minHeight: '30px',
                                                height: '30px',
                                                marginTop: '30px',
                                                borderRight: 'red',
                                            }}
                                        />
                                        <Tab
                                            label={t('professionalInformation')}
                                            id="tab-01"
                                            aria-controls="tabpanel-01"
                                            className={css.tab}
                                            sx={{
                                                textAlign: 'left',
                                                marginTop: '16px !important',
                                            }}
                                        />
                                        <Tab
                                            label={t('myPreferences')}
                                            id="tab-02"
                                            aria-controls="tabpanel-02"
                                            className={css.tab}
                                            sx={{
                                                textAlign: 'left',
                                                marginTop: '16px !important',
                                            }}
                                        />
                                        <Tab
                                            label={t('changeEmploymentType')}
                                            id="tab-01"
                                            aria-controls="tabpanel-01"
                                            className={css.tab}
                                            sx={{ textAlign: 'left', marginTop: '16px !important' }}
                                        />
                                        <Tab
                                            label={t('deleteAccount')}
                                            id="tab-02"
                                            aria-controls="tabpanel-02"
                                            className={css.tab}
                                            sx={{ textAlign: 'left', marginTop: '16px !important' }}
                                        />
                                    </Tabs>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} className={css.boxContainer}>
                                    <TabPanel value={currentSubTab} index={0}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item xs={11} sx={{ paddingTop: '8px' }}>
                                                        <Typography className={css.title}>
                                                            {t('personalInformation')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} textAlign="right" className={css.edit}>
                                                        <IconButton onClick={() => setIsOpenPersonalInformation(true)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                                <Divider
                                                    sx={{ color: '#EFE7EC', marginTop: '24px', marginBottom: '24px' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item lg={2} md={2} xs={2}>
                                                        <Avatar
                                                            src={user.image || undefined}
                                                            sx={{
                                                                height: {
                                                                    xs: 50,
                                                                    sm: 80,
                                                                    md: 80,
                                                                },
                                                                width: {
                                                                    xs: 50,
                                                                    sm: 80,
                                                                    md: 80,
                                                                },
                                                            }}>
                                                            <UserCircle fontSize="small" />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        lg={10}
                                                        md={10}
                                                        xs={10}
                                                        sx={{
                                                            paddingLeft: '16px',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                        }}>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <Typography className={css.pictureName}>
                                                                    {profile?.firstName} {profile?.lastName}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sx={{ paddingTop: '4px' }}>
                                                                <Typography className={css.pictureRole}>
                                                                    {user?.role}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sx={{ paddingTop: '4px' }}>
                                                                <Typography className={css.pictureChange}>
                                                                    {t('change')}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <PersonalInfoDetails profile={profile} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={currentSubTab} index={1}>
                                        <Grid container direction="row">
                                            <Grid container height="40px">
                                                <Grid item xs={11}>
                                                    <Typography className={css.title}>
                                                        {t('professionalInformation')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1} textAlign="right" className={css.edit}>
                                                    <IconButton onClick={() => setIsOpenProfessionalInformation(true)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLine} />
                                            <Grid container>
                                                {profile?.resume && (
                                                    <Grid item xs={12}>
                                                        <ResumeIcon fontSize="large" sx={{ width: 150, height: 211 }} />
                                                    </Grid>
                                                )}
                                                <Grid item xs={12}>
                                                    <ProfesionalInfoDetails />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={currentSubTab} index={2}>
                                        <Grid container direction="row">
                                            <Grid container height="40px">
                                                <Grid item xs={11}>
                                                    <Typography id="modal-modal-title" className={css.title}>
                                                        {t('myPreferences')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1} textAlign="right" className={css.edit}>
                                                    <IconButton onClick={() => setIsOpenMyPreference(true)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid item xs={12}>
                                                    <PreferenceDetails />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={currentSubTab} index={3}>
                                        <Grid container direction="row">
                                            <Grid container height="40px">
                                                <Grid item xs={12}>
                                                    <Typography id="modal-modal-title" className={css.title}>
                                                        {t('changeEmploymentType')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '24px' }}>
                                                <ChangeEmploymentType
                                                    // profile={profile}
                                                    user={user}
                                                    // handleUpdateProfile={handleUpdateProfile}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={currentSubTab} index={4}>
                                        <Grid container direction="row">
                                            <Grid container height="40px">
                                                <Grid item xs={12}>
                                                    <Typography id="modal-modal-title" className={css.title}>
                                                        {t('deleteAccount')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '24px' }}>
                                                <Deletion
                                                    // profile={profile}
                                                    user={user}
                                                    // handleUpdateProfile={handleUpdateProfile}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* user.role === CONSULTANT_ROLE && (
                            <TabPanel value={currentTab} index={1}>
                                <Grid container direction="row" className={css.boxContainerOut}>
                                    <Grid container marginBottom={3}>
                                        <Grid item xs={11}>
                                            <Typography id="modal-modal-title" className={css.title}>
                                                {t('companyInformation')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1} textAlign="right" className={css.edit}>
                                            <IconButton onClick={() => setIsOpenCompanyDetails(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider
                                        sx={{
                                            color: '#E8E8E8',
                                            marginBottom: '24px',
                                            width: '100%',
                                            maxWidth: '732px',
                                        }}
                                    />
                                    <Grid container>
                                        <CompanyDisplay />
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        ) */}

                        <TabPanel value={currentTab} index={user.role === CONSULTANT_ROLE ? 2 : 1}>
                            <Grid container direction="row" className={css.boxContainerOut}>
                                <Grid container marginBottom={3}>
                                    <Grid item xs={11}>
                                        <Typography id="modal-modal-title" className={css.title}>
                                            {t('Experience')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} textAlign="right" className={css.edit}>
                                        <AddIcon onClick={() => setIsOpenProfessionalExperience(true)} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={css.gridLine} />
                                <Grid container>
                                    <ExperienceDisplay
                                        experiences={profile?.experience}
                                        handleEdit={(experience: any) => handleEdit(getExperience(experience))}
                                        handleDelete={handleDeleteExperience}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={currentTab} index={user.role === CONSULTANT_ROLE ? 3 : 2}>
                            <Grid container direction="row" className={css.boxContainerOut}>
                                <Grid container marginBottom={3}>
                                    <Grid item xs={11}>
                                        <Typography id="modal-modal-title" className={css.title}>
                                            {t('Education')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} textAlign="right" className={css.edit}>
                                        <AddIcon onClick={() => setIsOpenPersonalEducation(true)} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={css.gridLine} />
                                <Grid container>
                                    <EducationDisplay
                                        educations={profile?.education}
                                        handleEdit={(education: any) => handleEdit(getEducation(education))}
                                        handleDelete={handleDeleteEducation}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                </Grid>
                <PersonalInformation
                    profile={profile}
                    handleUpdateProfile={(newProfile: any) => handleEdit(newProfile)}
                    isOpen={isOpenPersonalInformation}
                    onClose={() => setIsOpenPersonalInformation(!isOpenPersonalInformation)}
                />
                <ProfessionalInformation
                    profile={profile}
                    handleUpdateProfile={(newProfile: any) => handleEdit(newProfile)}
                    isOpen={isOpenProfessionalInformation}
                    onClose={() => setIsOpenProfessionalInformation(!isOpenProfessionalInformation)}
                />
                {isOpenProfessionalExperience && (
                    <ProfessionalExperience
                        handleUpdateProfile={(updatedExperience: any) =>
                            handleEditExperience([...profile.experience, updatedExperience])
                        }
                        experience={undefined}
                        isOpen={isOpenProfessionalExperience}
                        onClose={() => setIsOpenProfessionalExperience(!isOpenProfessionalExperience)}
                    />
                )}
                {isOpenPersonalEducation && (
                    <PersonalEducation
                        handleUpdateProfile={(updatedEducation: any) =>
                            handleEditEducation([...profile.education, updatedEducation])
                        }
                        education={undefined}
                        isOpen={isOpenPersonalEducation}
                        onClose={() => setIsOpenPersonalEducation(!isOpenPersonalEducation)}
                    />
                )}
                <CompanyInfo
                    isOpen={isOpenCompanyDetails}
                    onClose={() => setIsOpenCompanyDetails(!isOpenCompanyDetails)}
                />
                <MyPreference
                    profile={profile}
                    handleUpdateProfile={(newProfile: any) => handleEdit(newProfile)}
                    isOpen={isOpenMyPreference}
                    onClose={() => setIsOpenMyPreference(!isOpenMyPreference)}
                />
            </Grid>
        </Grid>
    );
};

export default CandidateProfile;
