import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Avatar, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';
import { UserCircle } from '../../icons/Icons';
import Avatar1 from '../../../assets/images/landingPage/avatars/ralph.png';
import Avatar2 from '../../../assets/images/landingPage/avatars/nancy.png';
import Avatar3 from '../../../assets/images/landingPage/avatars/marco.png';
// import Avatar3 from '../../../assets/images/landingPage/avatars/anne.png';
// import Avatar4 from '../../../assets/images/landingPage/avatars/fred.png';
// import Avatar5 from '../../../assets/images/landingPage/avatars/joao.png';
// import Avatar6 from '../../../assets/images/landingPage/avatars/anselme.png';
// import Avatar7 from '../../../assets/images/landingPage/avatars/olan.png';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        background: theme.palette.common.white,
    },
    content: {
        maxWidth: '1440px',
        padding: '100px 120px 100px 120px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
            padding: '30px 0px 30px 30px',
        },
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 36,
        lineHeight: '53px',
        color: theme.palette.titleDarkRed,
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
            lineHeight: '27px',
            textAlign: 'unset',
        },
    },
    gridTeamAvatars: {
        paddingTop: '60px',
    },
    gridAvatar: {
        maxWidth: '200px',
    },
    gridName: {
        paddingTop: '24px',
    },
    name: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 18,
        lineHeight: '21.78px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('lg')]: {
            fontSize: 16,
            lineHeight: '19.36px',
        },
    },
    function: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '16.94px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('lg')]: {
            fontSize: 12,
            lineHeight: '14.52px',
        },
    },
    gridAvatarLeft: {
        marginLeft: '60px',
        [theme.breakpoints.down('lg')]: {
            marginLeft: '16px',
        },
    },
    containerAvatars: {
        margin: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
    },
}));

const ScrollbarRoot = styled(SimpleBar)``;

const AvatarRender = ({
    css,
    avatar,
    namePerson,
    functionPerson,
}: {
    css: any;
    avatar?: any;
    namePerson: string;
    functionPerson: string;
}) => (
    <Grid container>
        <Grid item xs={12}>
            <Avatar
                sx={{
                    height: 200,
                    width: 200,
                }}
                src={avatar || undefined}>
                <UserCircle fontSize="small" />
            </Avatar>
        </Grid>
        <Grid item xs={12} className={css.gridName}>
            <Typography className={css.name}>{namePerson}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography className={css.function}>{functionPerson}</Typography>
        </Grid>
    </Grid>
);

AvatarRender.defaultProps = {
    avatar: null,
};

const MeetTeam = () => {
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid item xs={12} className={css.content}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={css.title}>{t('meetTheTeam')}</Typography>
                    </Grid>
                    {!isMobile && (
                        <>
                            <Grid item xs={12} className={css.gridTeamAvatars}>
                                <Grid container className={css.containerAvatars}>
                                    <Grid item xs={4} className={css.gridAvatar}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Ralph Francois"
                                            avatar={Avatar1}
                                            functionPerson={t('ceoFunder')}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Marco Lestage"
                                            avatar={Avatar3}
                                            functionPerson={t('CFO')}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Nancy Lamy"
                                            avatar={Avatar2}
                                            functionPerson={t('COO')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} className={css.gridTeamAvatars}>
                                <Grid container className={css.containerAvatars}>
                                    <Grid item xs={4} className={css.gridAvatar}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Anne-Sophie Baribeau"
                                            avatar={Avatar3}
                                            functionPerson={t('platformBusiness')}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Frédérik Gauthier"
                                            avatar={Avatar4}
                                            functionPerson={t('directorBusiness')}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Hugues Biteau"
                                            functionPerson={t('candidateSuccess')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={css.gridTeamAvatars}>
                                <Grid container className={css.containerAvatars}>
                                    <Grid item xs={4} className={css.gridAvatar}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Joao Padilha"
                                            avatar={Avatar5}
                                            functionPerson={t('productOwner')}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                                        <AvatarRender
                                            css={css}
                                            namePerson="Anselme Tchiakpe"
                                            avatar={Avatar6}
                                            functionPerson={t('seniorFullStack')}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                                        <AvatarRender
                                            css={css}
                                            avatar={Avatar7}
                                            namePerson="Oredipe Olanrewaju"
                                            functionPerson={t('productDesigner')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </>
                    )}
                </Grid>
            </Grid>
            {isMobile && (
                <ScrollbarRoot
                    direction="rtl"
                    sx={{
                        width: '100%',
                        height: '320px',
                        '& .simplebar-content': {
                            height: '320px%',
                        },
                    }}>
                    <Grid container wrap="nowrap">
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                namePerson="Ralph Francois"
                                avatar={Avatar1}
                                functionPerson={t('ceoFunder')}
                            />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender css={css} namePerson="Marco Lestage" functionPerson={t('CFO')} />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                namePerson="Nancy Lamy"
                                avatar={Avatar2}
                                functionPerson={t('COO')}
                            />
                        </Grid>
                        {/* <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                namePerson="Anne-Sophie Baribeau"
                                avatar={Avatar3}
                                functionPerson={t('platformBusiness')}
                            />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                namePerson="Frédérik Gauthier"
                                avatar={Avatar4}
                                functionPerson={t('directorBusiness')}
                            />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender css={css} namePerson="Hugues Biteau" functionPerson={t('candidateSuccess')} />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                namePerson="Joao Padilha"
                                avatar={Avatar5}
                                functionPerson={t('productOwner')}
                            />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                namePerson="Anselme Tchiakpe"
                                avatar={Avatar6}
                                functionPerson={t('seniorFullStack')}
                            />
                        </Grid>
                        <Grid item xs="auto" className={clsx(css.gridAvatar, css.gridAvatarLeft)}>
                            <AvatarRender
                                css={css}
                                avatar={Avatar7}
                                namePerson="Oredipe Olanrewaju"
                                functionPerson={t('productDesigner')}
                            />
                        </Grid> */}
                    </Grid>
                </ScrollbarRoot>
            )}
        </Grid>
    );
};

export default MeetTeam;
