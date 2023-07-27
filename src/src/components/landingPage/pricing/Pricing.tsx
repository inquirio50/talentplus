import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Button, CardMedia, Divider, Grid, Tab, Typography, useMediaQuery } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import clsx from 'clsx';
import CheckIcon from '@mui/icons-material/Check';
import Sme from '../../../assets/images/landingPage/sme.png';
import Startups from '../../../assets/images/landingPage/startups.png';
import Custom from '../../../assets/images/landingPage/custom.png';
import { REGISTER_ROUTE } from '../../../routes/routes';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        backgroundColor: theme.palette.backgroundGray,
    },
    content: {
        maxWidth: '1440px',
        padding: '100px 120px 100px 120px',
        [theme.breakpoints.down('md')]: {
            padding: '35px 0px 35px 0px',
            maxWidth: '100%',
        },
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        lineHeight: '54px',
        textAlign: 'center',
        color: theme.palette.titleDarkRed,
        fontSize: 45,
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            fontSize: '24px',
            lineHeight: '29.8px',
        },
    },
    gridBoard: {
        paddingTop: '50px',
        [theme.breakpoints.down('md')]: {
            paddingTop: 'unset',
        },
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '61.85px 84px 61.85px 84px',
        gap: '10px',
        width: '588px',
        height: 'auto',
        background: theme.palette.common.white,
        borderRadius: '20px',
        alignContent: 'baseline',
        [theme.breakpoints.down('md')]: {
            width: '414px',
            height: 'auto',
            padding: '30px 0px 30px 0px',
        },
    },
    titleBox: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '28.8px',
        color: theme.palette.common.black,
        textAlign: 'center',
    },
    gridTabs: {
        paddingTop: '24px',
    },
    gridImg: {
        paddingTop: '59px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
    },
    smeImg: {
        width: '200px',
        height: '93.48px',
        [theme.breakpoints.down('md')]: {
            width: '150px',
            height: '70.11px',
        },
    },
    gridPercentage: {
        paddingTop: '24px',
    },
    percentage: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: 54,
        lineHeight: '65px',
        textAlign: 'center',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 36,
            lineHeight: '43.57px',
        },
    },
    gridMonthly: {
        paddingTop: '4px',
    },
    monthly: {
        fontFamily: 'Inter',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '19.36px',
        textAlign: 'center',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
            lineHeight: '14.52px',
        },
    },
    gridBtn: {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        paddingTop: '24px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '4px',
        },
    },
    btnContained: {
        width: '420px',
        height: '70px',
        background: theme.palette.baseColor,
        borderRadius: '10px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 20,
        lineHeight: '24px',
        textTransform: 'capitalize',
        color: theme.palette.common.white,
        border: '1px solid #EB078C',
        borderColor: theme.palette.baseColor,
        '&:hover': {
            border: 0,
            fontSize: 22,
            lineHeight: '26px',
            color: theme.palette.common.white,
            background:
                'linear-gradient(110.16deg, rgba(82, 2, 49, 0.8) -3.22%, rgba(249, 178, 219, 0.8) 104.03%), #EB078C',
        },
        [theme.breakpoints.down('md')]: {
            width: '247px',
            height: '50px',
            fontSize: 16,
            lineHeight: '19.36px',
            '&:hover': {
                fontSize: 18,
                lineHeight: '21px',
            },
        },
    },
    tabList: {
        '& button': {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: '24px',
            textTransform: 'none',
            [theme.breakpoints.down('md')]: {
                fontSize: 14,
            },
        },
        '& button:hover': {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: '24px',
            textTransform: 'none',
            color: theme.palette.baseColor,
            [theme.breakpoints.down('md')]: {
                fontSize: 14,
            },
        },
        '& button.Mui-selected': {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: '24px',
            textTransform: 'none',
            color: theme.palette.baseColor,
            [theme.breakpoints.down('md')]: {
                fontSize: 14,
            },
        },
    },
    indicator: {
        backgroundColor: theme.palette.baseColor,
    },
    gridText: {
        maxWidth: '420px',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '247px',
        },
    },
    txtDesc: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '19px',
        color: '#878787',
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
            lineHeight: '14.52px',
        },
    },
    lastBoxGrid: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
    },
    gridCheck: {
        paddingTop: '50px',
    },
    txtFees: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 15,
        lineHeight: '22.5px',
        color: theme.palette.titleDarkRed,
    },
    gridTxtFee: {
        paddingTop: '50px',
        maxWidth: '420px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '300px',
        },
    },
    btnMenu: {
        color: theme.palette.baseColor,
        textTransform: 'none',
        fontSize: 15,
        fontWeight: 400,
        fontFamily: 'Inter',
        fontStyle: 'italic',
    },
    gridTerms: {
        paddingTop: '24px',
    },
    gridDivider: {
        paddingTop: '24px',
        maxWidth: '420px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '300px',
        },
    },
    tabPanel: {
        padding: '24px 0px 0px 0px',
    },
}));

const CheckItems = ({ css, t, type, value }: { css: any; t: any; type: string; value: string }) => (
    <Grid container className={css.gridText}>
        <Grid item xs={12}>
            <Typography className={css.txtDesc}>{t('reelcruitService')}</Typography>
        </Grid>
        {(value === '1' || type === 'custom') && (
            <Grid item xs={12} className={css.gridCheck}>
                <Grid container>
                    <Grid item xs={1}>
                        <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography className={css.txtDesc}>{t('publicYourJob')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )}
        <Grid item xs={12} className={css.gridCheck}>
            <Grid container>
                <Grid item xs={1}>
                    <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                </Grid>
                <Grid item xs={11}>
                    <Typography className={css.txtDesc}>{t('anAnalysisOfJob')}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} className={css.gridCheck}>
            <Grid container>
                <Grid item xs={1}>
                    <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                </Grid>
                <Grid item xs={11}>
                    <Typography className={css.txtDesc}>{t('recommendationOfAvailable')}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} className={css.gridCheck}>
            <Grid container>
                <Grid item xs={1}>
                    <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                </Grid>
                <Grid item xs={11}>
                    <Typography className={css.txtDesc}>{t('automatedSearch')}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} className={css.gridCheck}>
            <Grid container>
                <Grid item xs={1}>
                    <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                </Grid>
                <Grid item xs={11}>
                    <Typography className={css.txtDesc}>{t('qualifiedCandidates')}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} className={css.gridCheck}>
            <Grid container>
                <Grid item xs={1}>
                    <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                </Grid>
                <Grid item xs={11}>
                    <Typography className={css.txtDesc}>{t('presentationOfCandidates')}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} className={css.gridCheck}>
            <Grid container>
                <Grid item xs={1}>
                    <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                </Grid>
                <Grid item xs={11}>
                    <Typography className={css.txtDesc}>{t('referenceAndBackground')}</Typography>
                </Grid>
            </Grid>
        </Grid>
        {value === '2' && type !== 'custom' && (
            <Grid item xs={12} className={css.gridCheck}>
                <Grid container>
                    <Grid item xs={1}>
                        <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography className={css.txtDesc}>{t('timesheetManagement')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )}
        {value === '2' && type !== 'custom' && (
            <Grid item xs={12} className={css.gridCheck}>
                <Grid container>
                    <Grid item xs={1}>
                        <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography className={css.txtDesc}>{t('automatedBilling')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )}
        {value === '2' && type !== 'custom' && (
            <Grid item xs={12} className={css.gridCheck}>
                <Grid container>
                    <Grid item xs={1}>
                        <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography className={css.txtDesc}>{t('integratedPayment')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )}
        {type !== 'custom' && value === '1' && (
            <Grid item xs={12} className={css.gridCheck}>
                <Grid container>
                    <Grid item xs={1}>
                        <CheckIcon sx={{ color: '#EC008B' }} fontSize="small" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography className={css.txtDesc}>{t('threeMonthsReplacement')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )}
        <Grid item xs={12} className={css.gridTxtFee}>
            <Typography className={css.txtFees}>
                {type !== 'custom' ? t('ourFeesForEachPlacement') : t('priceIsBasedOn')}
            </Typography>
        </Grid>
        <Grid item xs={12} className={css.gridTerms}>
            <Button variant="text" className={css.btnMenu} onClick={() => {}}>
                {t('termsOfService')}
            </Button>
        </Grid>
    </Grid>
);

const TabListPlans = ({
    css,
    value,
    handleChange,
    optA,
    optB,
    // itemA,
    // itemB,
    percentage,
    t,
    type,
    image,
}: {
    css: any;
    value: string;
    handleChange: any;
    optA: string;
    optB: string;
    // itemA: React.ReactNode;
    // itemB: React.ReactNode;
    percentage?: string;
    t: any;
    type: string;
    image: any;
}) => (
    <TabContext value={value}>
        <Grid container>
            <Grid item xs={12}>
                <TabList
                    onChange={handleChange(type)}
                    aria-label="Select your plan"
                    className={css.tabList}
                    classes={{
                        indicator: css.indicator,
                    }}
                    centered>
                    <Tab label={t(optA)} value="1" />
                    <Tab label={t(optB)} value="2" />
                </TabList>
            </Grid>
            <Grid item xs={12} className={css.gridImg}>
                <CardMedia component="img" alt="sme" image={image} className={css.smeImg} />
            </Grid>
            {percentage && (
                <Grid item xs={12} className={css.gridPercentage}>
                    <Typography className={css.percentage}>{percentage}</Typography>
                </Grid>
            )}
            {percentage && (
                <Grid item xs={12} className={css.gridMonthly}>
                    <Typography className={css.monthly}>Monthly</Typography>
                </Grid>
            )}
            <Grid item xs={12} className={css.gridBtn}>
                <Button
                    component="a"
                    disableRipple
                    href={REGISTER_ROUTE}
                    sx={{ minWidth: '134px' }}
                    className={css.btnContained}>
                    {t('getStarted')}
                </Button>
            </Grid>
            <Grid item xs={12} className={css.gridDivider}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <TabPanel value="1" className={css.tabPanel}>
                    <CheckItems css={css} t={t} type={type} value={value} />
                </TabPanel>
                <TabPanel value="2">
                    <CheckItems css={css} t={t} type={type} value={value} />
                </TabPanel>
            </Grid>
        </Grid>
    </TabContext>
);

TabListPlans.defaultProps = {
    percentage: null,
};

const Pricing = () => {
    const css = styles();
    const { t } = useTranslation();
    const [sme, setSme] = useState('1');
    const [startup, setStartup] = useState('1');
    const [custom, setCustom] = useState('1');

    const handleChange = (type: string) => (event: React.SyntheticEvent, newTab: string) => {
        if (type === 'sme') {
            setSme(newTab);
        } else if (type === 'startup') {
            setStartup(newTab);
        } else if (type === 'custom') {
            setCustom(newTab);
        }
    };

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid item xs={12} className={css.content}>
                <Grid container>
                    {!isMobile && (
                        <Grid item xs={12}>
                            <Typography className={css.title}>{t('chooseYourPlan')}</Typography>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6} lg={3} className={css.gridBoard}>
                        <Grid container className={css.box}>
                            <Grid item xs={12} height="29px">
                                <Typography className={css.titleBox}>SME</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridTabs}>
                                <TabListPlans
                                    css={css}
                                    handleChange={handleChange}
                                    optA="permanentPositions"
                                    optB="consultingPositions"
                                    percentage="20%"
                                    value={sme}
                                    type="sme"
                                    t={t}
                                    image={Sme}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} className={css.gridBoard}>
                        <Grid container className={css.box}>
                            <Grid item xs={12} height="29px">
                                <Typography className={css.titleBox}>{t('startups')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridTabs}>
                                <TabListPlans
                                    css={css}
                                    handleChange={handleChange}
                                    optA="permanentPositions"
                                    optB="consultingPositions"
                                    percentage="15%"
                                    value={startup}
                                    type="startup"
                                    t={t}
                                    image={Startups}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} className={clsx(css.gridBoard, css.lastBoxGrid)}>
                        <Grid container className={css.box}>
                            <Grid item xs={12} height="29px">
                                <Typography className={css.titleBox}>{t('custom')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridTabs}>
                                <TabListPlans
                                    css={css}
                                    handleChange={handleChange}
                                    optA="permanentPositions"
                                    optB="consultingPositions"
                                    value={custom}
                                    type="custom"
                                    t={t}
                                    image={Custom}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Pricing;
