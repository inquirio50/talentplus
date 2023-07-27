import React from 'react';
import { Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import globalStyles from '../../../config/globalCss';

import Shapes from '../../../assets/images/landingPage/shapes.png';
import '../styles/content/Recruit.scss';

const styles: any = makeStyles((theme: Theme) => ({
    btnMeeting: {
        color: theme.palette.common.white,
        textTransform: 'none',
        fontSize: 16,
        fontWeight: 700,
        fontFamily: 'Inter',
        lineHeight: '24px',
        marginLeft: '1rem',
    },
    bgImgDarkRed: {
        background: `url(${Shapes}) 241% 44%  no-repeat`,
        backgroundSize: '80%',
        display: 'grid',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            background: `url(${Shapes}) 49% 7%  no-repeat`,
            backgroundSize: '17%',
        },
        minHeight: '628px',
    },
    cta: {
        width: 'auto',
        minWidth: '153px',
        textTransform: 'none',
    },
}));

const Recruit = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();

    return (
        <div className={css.bgImgDarkRed}>
            <div className="recruit__container">
                <span className="recruit__title">{t('Reelcruit for EMPLOYERS.')}</span>

                <h1 className="recruit__heading">
                    <span className="bold colored">{t('The unbias automated')}</span>{' '}
                    {t('employment decision tools for busy hiring managers.')}
                </h1>

                <p className="recruit__paragraph">
                    {t('Reach your')} <span className="bold">{t('ESG')}</span>{' '}
                    {t(
                        // eslint-disable-next-line max-len
                        'goals for EQUALITY, DIVERSITY, INCLUSION & RETENTION with Reelcruits matching tool for busy hiring managers. Book a meeting today to know more about our services or by clicking learn more button.'
                    )}
                </p>

                <div className="recruit__buttons">
                    <Button
                        component="a"
                        href="https://meetings.hubspot.com/frederik-gauthier"
                        disableRipple
                        className={clsx(classes.btnSmallOutlined, css.cta)}>
                        {t('bookingMeetingBtn')}
                    </Button>

                    <Link to="/forEmployer">
                        <Button variant="text" className={clsx(css.btnMeeting, css.cta)}>
                            {`${t('learnMore')} >`}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Recruit;
