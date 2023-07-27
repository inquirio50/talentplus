import React from 'react';
import { Box, Card, CardActions, CardContent, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Theme } from '@mui/system';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import { makeStyles } from '@mui/styles';
import User from '../../models/user';
import UserMatch from '../../models/userMatch';
import { RootState } from '../../store/store';
import globalStyles from '../../config/globalCss';
import { getWelcomeDayTime } from '../helpers/utilityFunctions';
import CalendarDashBoard from '../common/CalendarDashboard';
import StyledBtnComponent from '../common/StyledBtnComponent';

const useStyles: any = makeStyles((theme: Theme) => ({
    title: {
        fontSize: '1.7rem',
    },
    gridBtnJobItems: {
        textAlign: 'right',
    },
    gridContainer: {
        marginTop: 16,
    },
    statisticsTxt: {
        color: theme.palette.baseColor,
        fontWeight: 'bold',
    },
    cardCalendar: {
        maxHeight: 380,
    },
    descriptionTxt: {
        color: theme.palette.baseColorTxt,
        fontSize: '0.9rem',
    },
}));

const AdminDashboard = () => {
    const { t } = useTranslation();
    const { user, userMatches }: { user: User; userMatches: UserMatch[] } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        userMatches: state.candidate.userMatches,
    }));
    const globalClasses = globalStyles();
    const classes = useStyles();
    const dayTime = getWelcomeDayTime();
    const isLgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'), {
        noSsr: true,
    });
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                paddingTop: '0px !important',
            }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 6, root: { paddingTop: 10 } }}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h4" className={clsx(classes.title, globalClasses.titleDashboard)}>
                                {`${t(dayTime)}, ${user.firstName}`}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                m: -1,
                            }}
                        />
                    </Grid>
                </Box>
                <Grid container spacing={2} textAlign="center">
                    {!isLgDown && (
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <EventAvailableOutlinedIcon fontSize="large" />
                                    <h3>
                                        <Typography className={classes.statisticsTxt}>0</Typography>
                                    </h3>
                                    <p className="text-muted font-15 mb-0">{t('Interview Requests')}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <LocalOfferOutlinedIcon fontSize="large" />
                                <h3>
                                    <Typography className={classes.statisticsTxt}>0</Typography>
                                </h3>
                                <p className="text-muted font-15 mb-0">{t('Offers')}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <ContactMailOutlinedIcon fontSize="large" />
                                <h3>
                                    <Typography className={classes.statisticsTxt}>0</Typography>
                                </h3>
                                <p className="text-muted font-15 mb-0">{t('Contracts')}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.gridContainer}>
                    {isLgDown && <Grid item xs={8} />}
                    <Grid item xs={isLgDown ? 8 : 4}>
                        <Card className={classes.cardCalendar}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'inherit',
                                    }}>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <Typography className={globalClasses.titleDashboard}>
                                                {t('Calendar')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <CalendarDashBoard />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        {/*! isLgDown && <JobMatchCard userMatches={userMatches} /> */}
                        {userMatches?.length < 3 && (
                            <Grid item xs={12} className={classes.gridContainer}>
                                <Card>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography className={globalClasses.titleDashboard}>
                                                    {t('Get more value on the market')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} className={classes.gridContainer}>
                                                <Typography className={classes.descriptionTxt}>
                                                    {t('Learn More')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                            <StyledBtnComponent
                                                title={t('Get started')}
                                                classesName={globalClasses.baseBtnDashboard}
                                                handleOnClick={() => {}}
                                            />
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
