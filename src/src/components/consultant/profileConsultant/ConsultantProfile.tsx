import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs, Typography, Grid, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/system';
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
import { fetchCandidatetInfo, profileUpdateInfo } from '../../../store/reducers/candidate/candidateActions';
import { fetchProfilParameters } from '../../../store/reducers/genericActions';
import { UserCircle, EditIcon, AddIcon, ResumeIcon } from '../../icons/Icons';
import ChangeEmploymentType from '../../common/ChangeEmploymentType';
import Deletion from '../../common/Deletion';
import ExperienceDisplay from '../../common/ExperienceDisplay';
import EducationDisplay from '../../common/EducationDisplay';
import { Experience } from '../../../models/experience';
import { Education } from '../../../models/education';
import i18n from '../../../config/i18next';

const userStyles: any = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        padding: '50px',
        p: 4,
        display: 'table',
    },
    title: {
        width: '89px',
        height: '45px',

        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '30px',
        lineHeight: '45px',

        letterSpacing: '0.15px',

        flex: 'none',
        order: '0',
        flexGrow: '0',
    },
    subTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '18px',
    },
    tabs: {
        '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.baseColor,
        },
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
        '&.Mui-selected': {
            color: theme.palette.baseColor,
            fontWeight: 400,
        },
        '&.Mui-focusVisible': {
            color: theme.palette.common.white,
        },
    },
    gridBox: {
        paddingTop: '93px',
        boxSizing: 'border-box',
    },
    innerContainer: {
        padding: '50px',
        gap: '10px',
        position: 'absolute',
        width: '750px',
        height: 'auto',
        border: 'none',
        borderRadius: '10px',
        boxSizing: 'border-box',
    },
    box: {
        padding: '40px',
        width: '690px',
        height: '197px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        '&:hover': {
            fontSize: 22,
            boxSizing: 'border-box',
            border: '1px solid #EB078C',
        },
        gap: '10px',
        background: 'rgba(247, 247, 247, 0.5)',
    },
    txt: {
        paddingTop: '16px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        color: theme.palette.common.black,
    },
    gridBoxSpacing: {
        marginTop: '24px',
    },
    gridLimit: {
        maxWidth: '400px',
        margin: 'auto',
    },
}));

const styles = {
    container: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        gap: '10px',

        width: '800px',

        background: '#FFFFFF',
        boxShadow: '4px 5px 8px rgba(0, 0, 0, 0.08), -5px -5px 8px rgba(0, 0, 0, 0.04)',
        borderRadius: '20px',

        flex: 'none',
        order: 1,
        flexGrow: 0,
    },

    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '29px',
        color: '#000000',
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

    edit: {
        cursor: 'pointer',
    },

    gridLine: {
        borderBottom: '0.5px solid #E8E8E8',
    },
};

const ConsultantProfile = () => {
    const { t } = useTranslation();
    const css = userStyles();
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState(0);
    const [currentSubTab, setCurrentSubTab] = useState(0);
    const [isOpenPersonalInformation, setIsOpenPersonalInformation] = useState(false);
    const [isOpenProfessionalInformation, setIsOpenProfessionalInformation] = useState(false);
    const [isOpenMyPreference, setIsOpenMyPreference] = useState(false);
    const [isOpenProfessionalExperience, setIsOpenProfessionalExperience] = useState(false);
    const [isOpenPersonalEducation, setIsOpenPersonalEducation] = useState(false);

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

    const handleEdit = (newProfile: Profile) => {
        dispatch(profileUpdateInfo({ ...newProfile, codeLangue: i18n.resolvedLanguage.toLocaleUpperCase() }));
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

    const handleDelete = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        return id;
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                paddingTop: '0px !important',
            }}>
            <Container maxWidth="xl">
                <Typography color="#520231" marginTop="20px" marginBottom="20px" className={css.title}>
                    {t('profile')}
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '300px' }}>
                    <Tabs
                        className={css.tabs}
                        centered
                        value={currentTab}
                        onChange={handleChange}
                        aria-label="profile options"
                        variant="fullWidth">
                        <Tab label={t('details')} id="tab-0" aria-controls="tabpanel-0" className={css.tab} />
                        <Tab label={t('experience')} id="tab-1" aria-controls="tabpanel-1" className={css.tab} />
                        <Tab label={t('education')} id="tab-2" aria-controls="tabpanel-2" className={css.tab} />
                    </Tabs>
                </Box>
                <Box sx={{ width: '100%', marginTop: '30px' }}>
                    <TabPanel value={currentTab} index={0}>
                        <Grid container>
                            <Grid item xs={2} sx={{ textAlign: 'left' }}>
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
                                        sx={{ alignItems: 'flex-start', minHeight: '30px', height: '30px' }}
                                    />
                                    <Tab
                                        label={t('myPreferences')}
                                        id="tab-02"
                                        aria-controls="tabpanel-02"
                                        className={css.tab}
                                        sx={{ alignItems: 'flex-start', minHeight: '30px', height: '30px' }}
                                    />
                                    <Tab
                                        label={t('changeEmploymentType')}
                                        id="tab-01"
                                        aria-controls="tabpanel-01"
                                        className={css.tab}
                                        sx={{ alignItems: 'flex-start', minHeight: '30px', height: '30px' }}
                                    />
                                    <Tab
                                        label={t('deleteAccount')}
                                        id="tab-02"
                                        aria-controls="tabpanel-02"
                                        className={css.tab}
                                        sx={{ alignItems: 'flex-start', minHeight: '30px', height: '30px' }}
                                    />
                                </Tabs>
                            </Grid>
                            <Grid item xs={10}>
                                <TabPanel value={currentSubTab} index={0}>
                                    <Grid container direction="row" sx={styles.container} height="591px">
                                        <Grid container height="40px">
                                            <Grid item xs={11}>
                                                <Typography id="modal-modal-title" sx={styles.title}>
                                                    {t('personalInformation')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} textAlign="right" sx={styles.edit}>
                                                <EditIcon onClick={() => setIsOpenPersonalInformation(true)} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sx={styles.gridLine} />
                                        <Grid container sx={{ height: '551px' }}>
                                            <Grid item xs={12} sx={{ height: '80px', padding: '10px' }}>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                    }}>
                                                    <Avatar
                                                        src={user.image || undefined}
                                                        sx={{
                                                            height: 80,
                                                            width: 80,
                                                        }}>
                                                        <UserCircle fontSize="small" />
                                                    </Avatar>
                                                    <Grid
                                                        container
                                                        spacing={1}
                                                        sx={{
                                                            marginLeft: '9px',
                                                        }}>
                                                        <Grid item xs={12}>
                                                            <Typography sx={styles.pictureName}>
                                                                {profile?.firstName} {profile?.lastName}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={styles.pictureRole}>
                                                                {user?.role}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={styles.pictureChange}>
                                                                {t('change')}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sx={{ height: '431px' }}>
                                                <PersonalInfoDetails profile={profile} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={currentSubTab} index={1}>
                                    <Grid container direction="row" sx={styles.container} height="756.28px">
                                        <Grid container sx={{ height: '40px' }}>
                                            <Grid item xs={11}>
                                                <Typography id="modal-modal-title" sx={styles.title}>
                                                    {t('professionalInformation')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} textAlign="right" sx={styles.edit}>
                                                <EditIcon onClick={() => setIsOpenProfessionalInformation(true)} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sx={styles.gridLine} />
                                        <Grid container sx={{ height: '716.28px' }}>
                                            <Grid item xs={12} sx={{ height: '150px' }}>
                                                <ResumeIcon fontSize="large" />
                                            </Grid>
                                            <Grid item xs={12} sx={{ height: '485.28px' }}>
                                                <ProfesionalInfoDetails />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value={currentSubTab} index={2}>
                                    <Grid container direction="row" sx={styles.container} height="886px">
                                        <Grid container height="40px">
                                            <Grid item xs={11}>
                                                <Typography id="modal-modal-title" sx={styles.title}>
                                                    {t('myPreferences')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} textAlign="right" sx={styles.edit}>
                                                <EditIcon onClick={() => setIsOpenMyPreference(true)} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sx={styles.gridLine} />
                                        <Grid container sx={{ height: '846px', marginTop: 2 }}>
                                            <Grid item xs={12}>
                                                <PreferenceDetails />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value={currentSubTab} index={3}>
                                    <Grid container direction="row" sx={styles.container} height="Hug(181px)">
                                        <Grid container height="40px">
                                            <Grid item xs={12}>
                                                <Typography id="modal-modal-title" sx={styles.title}>
                                                    {t('changeEmploymentType')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sx={styles.gridLine} />
                                        <Grid container sx={{ height: '141px', marginTop: 2 }}>
                                            <ChangeEmploymentType
                                                // profile={profile}
                                                user={user}
                                                // handleUpdateProfile={handleUpdateProfile}
                                            />
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value={currentSubTab} index={4}>
                                    <Grid container direction="row" sx={styles.container} height="Hug(199px)">
                                        <Grid container height="40px">
                                            <Grid item xs={12}>
                                                <Typography id="modal-modal-title" sx={styles.title}>
                                                    {t('deleteAccount')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sx={styles.gridLine} />
                                        <Grid container sx={{ height: '159px', marginTop: 2 }}>
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

                    <TabPanel value={currentTab} index={1}>
                        <Grid container direction="row" sx={styles.container}>
                            <Grid container marginBottom={3}>
                                <Grid item xs={11}>
                                    <Typography id="modal-modal-title" sx={styles.title}>
                                        {t('Experience')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} textAlign="right" sx={styles.edit}>
                                    <AddIcon onClick={() => setIsOpenProfessionalExperience(true)} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={styles.gridLine} />
                            <Grid container>
                                <ExperienceDisplay
                                    experiences={profile?.experience}
                                    handleEdit={(experience: any) => handleEdit(getExperience(experience))}
                                    handleDelete={handleDelete}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={currentTab} index={2}>
                        <Grid container direction="row" sx={styles.container}>
                            <Grid container marginBottom={3}>
                                <Grid item xs={11}>
                                    <Typography id="modal-modal-title" sx={styles.title}>
                                        {t('Education')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} textAlign="right" sx={styles.edit}>
                                    <AddIcon onClick={() => setIsOpenPersonalEducation(true)} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={styles.gridLine} />
                            <Grid container>
                                <EducationDisplay
                                    educations={profile?.education}
                                    handleEdit={(education: any) => handleEdit(getEducation(education))}
                                    handleDelete={handleDelete}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Box>
            </Container>
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
                        handleEdit({ ...profile, experience: [...profile.experience, updatedExperience] })
                    }
                    experience={undefined}
                    isOpen={isOpenProfessionalExperience}
                    onClose={() => setIsOpenProfessionalExperience(!isOpenProfessionalExperience)}
                />
            )}
            {isOpenPersonalEducation && (
                <PersonalEducation
                    handleUpdateProfile={(updatedEducation: any) =>
                        handleEdit({ ...profile, education: [...profile.education, updatedEducation] })
                    }
                    education={undefined}
                    isOpen={isOpenPersonalEducation}
                    onClose={() => setIsOpenPersonalEducation(!isOpenPersonalEducation)}
                />
            )}
            <MyPreference
                profile={profile}
                handleUpdateProfile={(newProfile: any) => handleEdit(newProfile)}
                isOpen={isOpenMyPreference}
                onClose={() => setIsOpenMyPreference(!isOpenMyPreference)}
            />
        </Box>
    );
};

export default ConsultantProfile;
