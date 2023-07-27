import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import {
    AppBar,
    Button,
    Drawer,
    Grid,
    IconButton,
    Input,
    MenuItem,
    Select,
    styled,
    Toolbar,
    useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';
import globalStyles from '../../config/globalCss';
import Logo from '../../assets/images/header/logo_new.png';
import Globe from '../../assets/images/header/globe.png';
import {
    ABOUT_US_ROUTE,
    FORGET_PASSWORD_ROUTE,
    FOR_EMPLOYER_ROUTE,
    LANDING_PAGE_ROUTE,
    LOGIN_ROUTE,
    PRICING_ROUTE,
    REGISTER_CANDIDATE_ROUTE,
    // REGISTER_EMPLOYER_ROUTE,
    REGISTER_ROUTE,
    RESET_PASSWORD_ROUTE,
} from '../../routes/routes';
import { Languages } from '../common/LanguageTopApp';
import { MenuIcon, XIcon } from '../icons/Icons';
import StyledBtnComponent from '../common/StyledBtnComponent';

const styles: any = makeStyles((theme: Theme) => ({
    appBar: {
        position: 'initial',
        boxShadow: 'none',
        backgroundColor: 'white',
        [theme.breakpoints.down('lg')]: {
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        },
    },
    header: {
        backgroundColor: theme.palette.white,
        // height: 80,
        padding: '1rem 3rem',
        margin: '0 auto',
        maxWidth: 1300,
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            // height: 60,
            padding: '11px 21px 11px 21px',
        },
    },
    logo: {
        height: '50px',
        [theme.breakpoints.down('lg')]: {
            height: '36.73px',
        },
    },
    logoSmall: {
        height: '29.88px',
        width: '102.29px',
    },
    logoGridSmall: {
        padding: '10px 0px 0px 21px',
    },
    toolbar: {
        minHeight: 92,
        left: 0,
        px: 2,
        backgroundColor: theme.palette.white,
    },
    gridLogo: {
        // margin: 'auto',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            maxWidth: 'unset',
            minWidth: 'unset',
        },
    },
    btnMenu: {
        color: '#000000',
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 400,
        fontFamily: 'Inter',
    },
    input: {
        color: theme.palette.baseColorTxt,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        padding: '0.45rem 0.9rem',
        borderRadius: 4,
        border: 0,
        '&:focus': {
            borderColor: theme.palette.baseColor,
        },
        '&:hover': {
            borderColor: theme.palette.baseColor,
        },
    },
    globeIcon: {
        height: 20,
        position: 'absolute',
        display: 'inline-block',
        right: '60px',
        top: -12,
    },
    selectedTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '19px',
        textTransform: 'uppercase',
        color: theme.palette.common.black,
    },
    gridBtnLogin: {
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    gridBtnCreateAccount: {
        minWidth: '170px',
        width: 'auto',
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    gridBtnRegister: {
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    gridLanguage: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    gridSmall: {
        paddingLeft: '21px',
        paddingTop: '24px',
    },
    gridContainerBtn: {
        justifyContent: 'flex-end',
        [theme.breakpoints.down('lg')]: {
            '-webkit-flex-wrap': 'unset',
            flexWrap: 'unset',
        },
    },
    btnRegisterEmployer: {
        maxWidth: '226px !important',
        width: '226px !important',
        fontSize: '15px !important',
    },
}));

const GlobeIcon: React.FunctionComponent = () => {
    const css = styles();
    return (
        <div style={{ position: 'relative' }}>
            <img src={Globe} alt="globe" className={css.globeIcon} />
        </div>
    );
};

const ScrollbarRoot = styled(SimpleBar)``;

const Header = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();
    const history = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { location } = window;

    const getCurrentLanguage = () => {
        const initLang = Languages.find((l) => l.tag === i18next.language);
        return initLang || Languages[0];
    };
    const [currLang, setCurrLang] = useState(getCurrentLanguage());

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        if (newValue) {
            i18next.changeLanguage(newValue);
            const languageSelected: any = Languages.find((l) => l.tag === newValue);
            setCurrLang(languageSelected);
        }
    };

    // const isDownLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'), {
    //     noSsr: true,
    // });

    const isMediumLaptopScreen = useMediaQuery('(max-width: 1163px)');

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    const xsGridLogoDownLg = 2;
    const xsGridLogo = isMobile ? 10 : xsGridLogoDownLg;
    const xsGridMenus = isMediumLaptopScreen ? 5 : 6;

    const goTo = (dir: string) => {
        if (dir === 'aboutUs') {
            history(ABOUT_US_ROUTE);
        } else if (dir === 'reelcruitForEmployer') {
            history(FOR_EMPLOYER_ROUTE);
        } else if (dir === 'pricing') {
            history(PRICING_ROUTE);
        }
    };
    const employerUrl = 'https://meetings.hubspot.com/frederik-gauthier';
    const isShorPricing = location.href.includes(FOR_EMPLOYER_ROUTE) || location.href.includes(PRICING_ROUTE);

    const isCreateAccount =
        location.href.includes(LOGIN_ROUTE) ||
        location.href.includes(FORGET_PASSWORD_ROUTE) ||
        location.href.includes(RESET_PASSWORD_ROUTE);

    const isRegisterCandidate = location.href.includes(REGISTER_CANDIDATE_ROUTE);
    const isRegisterEmployer = location.href === employerUrl;

    const isRegister = location.href.includes(REGISTER_ROUTE) || isRegisterCandidate || isRegisterEmployer;

    const getRegisterRoute = () => {
        if (isRegisterCandidate) {
            window.location.href = employerUrl;
        } else if (isRegisterEmployer) {
            history(REGISTER_CANDIDATE_ROUTE);
        } else {
            history(REGISTER_ROUTE);
        }
    };
    const getRegisterLabel = () => {
        if (isRegisterCandidate) {
            return t('registerAsAnEmployer');
        }
        if (isRegisterEmployer) {
            return t('registerAsAnCandidate');
        }
        return t('getStarted');
    };

    return (
        <>
            <header>
                <AppBar className={css.appBar}>
                    <Toolbar disableGutters className={css.toolBar}>
                        <Grid container className={css.header}>
                            <Grid item xs={xsGridLogo} className={css.gridLogo}>
                                <Link to={LANDING_PAGE_ROUTE}>
                                    <img src={Logo} alt="logo" className={css.logo} />
                                </Link>
                            </Grid>
                            {isMobile && (
                                <Grid item xs={2} sx={{ margin: 'auto', justifyContent: 'center', display: 'flex' }}>
                                    <IconButton
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        sx={{
                                            display: {
                                                xs: 'inline-flex',
                                                lg: 'none',
                                            },
                                        }}>
                                        <MenuIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                            )}
                            {!isMobile && !isRegister && !isCreateAccount && (
                                <Grid item xs={xsGridMenus}>
                                    <Grid container sx={{ paddingTop: '4.39px' }} justifyContent="center">
                                        <Grid item xs="auto" sx={{ maxWidth: isShorPricing ? 'unset' : '' }}>
                                            <Button
                                                variant="text"
                                                className={clsx(
                                                    css.btnMenu,
                                                    location.href.includes(ABOUT_US_ROUTE) ? classes.activeLink : ''
                                                )}
                                                onClick={() => goTo('aboutUs')}>
                                                {t('aboutUs')}
                                            </Button>
                                        </Grid>

                                        <Grid item xs="auto" sx={{ maxWidth: 'fit-content' }}>
                                            {!isShorPricing ? (
                                                <div />
                                            ) : (
                                                <Button
                                                    variant="text"
                                                    className={clsx(
                                                        css.btnMenu,
                                                        location.href.includes(PRICING_ROUTE) ? classes.activeLink : ''
                                                    )}
                                                    onClick={() => goTo('pricing')}>
                                                    {t('pricing')}
                                                </Button>
                                            )}
                                        </Grid>

                                        <Grid item xs="auto" sx={{ paddingLeft: '14px', maxWidth: 'fit-content' }}>
                                            <Button
                                                variant="text"
                                                className={clsx(
                                                    css.btnMenu,
                                                    location.href.includes(FOR_EMPLOYER_ROUTE) ? classes.activeLink : ''
                                                )}
                                                onClick={() => goTo('reelcruitForEmployer')}>
                                                {t('reelcruitForEmployer')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                            {!isMobile && (
                                <Grid item xs={isMediumLaptopScreen ? 5 : 4}>
                                    <Grid spacing={2} container justifyContent="end" className={css.gridContainerBtn}>
                                        {!isCreateAccount && (
                                            <>
                                                <Grid item xs="auto" spacing={0} className={css.gridBtnLogin}>
                                                    <StyledBtnComponent
                                                        title={t('login')}
                                                        handleOnClick={() => {
                                                            history(LOGIN_ROUTE);
                                                        }}
                                                        red={false}
                                                        btWidth="auto"
                                                        btHeight="100px"
                                                        classesName={classes.btnOutlined}
                                                    />
                                                </Grid>
                                                {(!isRegister || isRegisterCandidate || isRegisterEmployer) && (
                                                    <Grid item xs={5} className={css.gridBtnRegister}>
                                                        <StyledBtnComponent
                                                            title={getRegisterLabel()}
                                                            handleOnClick={getRegisterRoute}
                                                            btWidth="auto"
                                                            btHeight="70px"
                                                            classesName={clsx(
                                                                classes.btnContained,
                                                                isRegisterCandidate ? css.btnRegisterEmployer : ''
                                                            )}
                                                        />
                                                    </Grid>
                                                )}
                                            </>
                                        )}
                                        {isCreateAccount && (
                                            <Grid item className={css.gridBtnCreateAccount}>
                                                <StyledBtnComponent
                                                    title={t('createAccount')}
                                                    handleOnClick={() => {
                                                        history(REGISTER_ROUTE);
                                                    }}
                                                    red={false}
                                                />
                                            </Grid>
                                        )}
                                        <Grid item className={css.gridLanguage} sx={{ zIndex: 50000 }}>
                                            <Select
                                                MenuProps={{
                                                    sx: {
                                                        zIndex: 50000,
                                                        '& .MuiMenu-paper': {
                                                            border: '1px solid rgba(189, 189, 189, 0.5)',
                                                            borderRadius: '4px',
                                                        },
                                                        '& .MuiMenuItem-root:hover': {
                                                            backgroundColor: 'dark.secondary',
                                                            color: 'text.white',
                                                        },
                                                        '& .Mui-selected': {
                                                            backgroundColor: '#eb078c4a !important',
                                                        },
                                                    },
                                                }}
                                                label={currLang.name}
                                                disableUnderline
                                                id="select-language"
                                                color="secondary"
                                                value={currLang.tag}
                                                onChange={handleChange}
                                                // IconComponent={GlobeIcon}
                                                sx={{ width: 'unset' }}
                                                input={
                                                    <Input
                                                        id="select-languagebtn"
                                                        color="secondary"
                                                        fullWidth
                                                        classes={{ input: css.input }}
                                                    />
                                                }
                                                renderValue={(selected) => (
                                                    <Grid item className={css.selectedTxt}>
                                                        {selected}
                                                    </Grid>
                                                )}>
                                                {Languages.map((lang: any) => (
                                                    <MenuItem value={lang.tag} key={lang.tag} sx={{ zIndex: 50000 }}>
                                                        {t(lang.name)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Toolbar>
                </AppBar>
            </header>
            {isMobile && (
                <Drawer
                    anchor="left"
                    onClose={() => setIsSidebarOpen(!isSidebarOpen)}
                    open={isSidebarOpen}
                    PaperProps={{
                        sx: {
                            borderRightColor: 'divider',
                            borderRightStyle: 'solid',
                            borderRightWidth: 1,
                            width: '100%',
                            backgroundColor: '#520231',
                        },
                    }}
                    sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                    variant="temporary">
                    <ScrollbarRoot
                        sx={{
                            height: '100%',
                            '& .simplebar-content': {
                                height: '100%',
                            },
                            backgroundColor: 'white',
                        }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container className={css.logoGridSmall}>
                                    <Grid item xs={10}>
                                        <Link to={LANDING_PAGE_ROUTE}>
                                            <img src={Logo} alt="logo" className={css.logo} />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                            sx={{
                                                display: {
                                                    xs: 'inline-flex',
                                                    lg: 'none',
                                                },
                                            }}>
                                            <XIcon fontSize="large" sx={{ color: 'black' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridSmall}>
                                        <Select
                                            MenuProps={{
                                                sx: {
                                                    '& .MuiMenu-paper': {
                                                        border: '1px solid rgba(189, 189, 189, 0.5)',
                                                        borderRadius: '4px',
                                                        zIndex: 10000,
                                                    },
                                                    '& .MuiMenuItem-root:hover': {
                                                        backgroundColor: 'dark.secondary',
                                                        color: 'text.white',
                                                    },
                                                    '& .Mui-selected': {
                                                        backgroundColor: '#eb078c4a !important',
                                                    },
                                                },
                                            }}
                                            label={currLang.name}
                                            disableUnderline
                                            id="select-language"
                                            color="secondary"
                                            value={currLang.tag}
                                            onChange={handleChange}
                                            IconComponent={GlobeIcon}
                                            sx={{ width: 'unset' }}
                                            input={
                                                <Input
                                                    id="select-languagebtn"
                                                    color="secondary"
                                                    fullWidth
                                                    classes={{ input: css.input }}
                                                />
                                            }
                                            renderValue={(selected) => (
                                                <Grid item className={css.selectedTxt}>
                                                    {selected}
                                                </Grid>
                                            )}>
                                            {Languages.map((lang: any) => (
                                                <MenuItem value={lang.tag} key={lang.tag}>
                                                    {t(lang.name)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    {!isCreateAccount && (
                                        <>
                                            {!isRegister && (
                                                <>
                                                    <Grid item xs={12} className={css.gridSmall}>
                                                        <Button
                                                            variant="text"
                                                            className={css.btnMenu}
                                                            onClick={() => {
                                                                setIsSidebarOpen(!isSidebarOpen);
                                                                goTo('aboutUs');
                                                            }}>
                                                            {t('aboutUs')}
                                                        </Button>
                                                    </Grid>
                                                    {isShorPricing && (
                                                        <Grid item xs={12} className={css.gridSmall}>
                                                            <Button
                                                                variant="text"
                                                                className={css.btnMenu}
                                                                onClick={() => {
                                                                    setIsSidebarOpen(!isSidebarOpen);
                                                                    goTo('pricing');
                                                                }}>
                                                                {t('pricing')}
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                    <Grid item xs={12} className={css.gridSmall}>
                                                        <Button
                                                            variant="text"
                                                            className={css.btnMenu}
                                                            onClick={() => {
                                                                setIsSidebarOpen(!isSidebarOpen);
                                                                goTo('reelcruitForEmployer');
                                                            }}>
                                                            {t('reelcruitForEmployer')}
                                                        </Button>
                                                    </Grid>
                                                </>
                                            )}
                                            <Grid item xs={12} sx={{ padding: '106px 21px 0px 21px' }}>
                                                <StyledBtnComponent
                                                    title={t('login')}
                                                    handleOnClick={() => {
                                                        setIsSidebarOpen(!isSidebarOpen);
                                                        history(LOGIN_ROUTE);
                                                    }}
                                                    red={false}
                                                    classesName={classes.btnOutlinedDrawer}
                                                />
                                            </Grid>
                                            {(!isRegister || isRegisterCandidate || isRegisterEmployer) && (
                                                <Grid item xs={12} sx={{ padding: '8px 21px 0px 21px' }}>
                                                    <StyledBtnComponent
                                                        title={getRegisterLabel()}
                                                        handleOnClick={() => {
                                                            setIsSidebarOpen(!isSidebarOpen);
                                                            getRegisterRoute();
                                                        }}
                                                        btWidth="134px"
                                                        btHeight="50px"
                                                        classesName={classes.btnContainedDrawer}
                                                    />
                                                </Grid>
                                            )}
                                        </>
                                    )}
                                    {isCreateAccount && (
                                        <Grid item xs={12} sx={{ padding: '106px 21px 0px 21px' }}>
                                            <Button
                                                component="a"
                                                disableRipple
                                                href={REGISTER_ROUTE}
                                                variant="outlined"
                                                className={classes.btnOutlinedDrawer}>
                                                {t('createAccount')}
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </ScrollbarRoot>
                </Drawer>
            )}
        </>
    );
};

export default Header;
