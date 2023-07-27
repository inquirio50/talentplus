/* eslint-disable react/no-danger */
/* eslint-disable yoda */
import React, { useState } from 'react';
import { green, red } from '@mui/material/colors';
import { Grid, InputBase, Paper, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Theme } from '@mui/system';
import MailchimpSubscribe, { EmailFormFields } from 'react-mailchimp-subscribe';
import globalStyles from '../../config/globalCss';
import StyledBtnComponent from '../common/StyledBtnComponent';

import { sanitize } from '../helpers/utilityFunctions';

const styles: any = makeStyles((theme: Theme) => ({
    inputText: {
        width: '100%',
        maxWidth: '573px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        padding: '10px 10px',
        boxShadow: 'none',
        background: 'transparent',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '70px',
            marginLeft: 0,
        },
    },
    inputCss: {
        flex: 1,
        minWidth: '200px',
        fontSize: '1rem',
    },
    inputErrorCss: {
        color: red[500],
        fontWeight: 'bold',
    },
    inputSuccessCss: {
        color: green[500],
        fontWeight: 'bold',
    },

    inputError: {
        marginRight: '0px',
    },

    subscribeButton: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },

    btnOutlinedFooter: {
        background: theme.palette.baseColor,
        borderRadius: '10px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '18px',
        textTransform: 'none',
        color: theme.palette.common.white,
        border: '1px solid #EB078C',
        borderColor: theme.palette.baseColor,
        width: 'auto',
        minWidth: '119px',
        height: '50px',
        '&:hover': {
            border: 0,
            fontSize: 19,
            lineHeight: '23px',
            color: theme.palette.common.white,
            background:
                'linear-gradient(110.16deg, rgba(82, 2, 49, 0.8) -3.22%, rgba(249, 178, 219, 0.8) 104.03%), #EB078C',
        },
    },
}));

const Newsletter = ({ status, message, onValidated }: { status: any; message: any; onValidated: any }) => {
    const [email, setEmail] = useState('');
    const [mailChipError, setMailChipError] = useState<string>('');
    const { t } = useTranslation();

    const classes = globalStyles();
    const css = styles();

    const handleSubscribe = () => {
        // Here Subscribe

        setMailChipError('');

        if (!email) {
            setMailChipError('Please enter a valid email address');
        }

        const isFormValidated = onValidated({ EMAIL: email });

        // On success return true
        return email && email.indexOf('@') > -1 && isFormValidated;
    };

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setEmail(newValue);
    };

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    const handleInputKeyEvent = (event: any) => {
        setMailChipError('');
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.stopPropagation();
            // Trigger the button element with a click
            handleSubscribe();
        }
    };

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const getMessage = (message: string) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if (result?.[0]?.trim() !== '0') {
            return sanitize(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? sanitize(formattedMessage) : null;
    };

    return (
        <>
            <Grid item xs={isMobile ? 12 : 6} sx={{ paddingTop: '25px' }} spacing={isMobile ? 0 : 5}>
                <Paper component="form" className={css.inputText}>
                    <InputBase
                        className={css.inputCss}
                        placeholder={t('yourEmailAddress')}
                        inputProps={{ 'aria-label': t('yourEmailAddress') }}
                        onChange={handleChange}
                        onKeyUp={handleInputKeyEvent}
                    />
                    {!isMobile && (
                        <Grid item>
                            <StyledBtnComponent
                                title={t('Subscribe')}
                                classesName={clsx(classes.btnContained, css.subscribeButton)}
                                handleOnClick={handleSubscribe}
                            />
                        </Grid>
                    )}
                </Paper>

                {'error' === status || mailChipError ? (
                    <div
                        className={css.inputErrorCss}
                        dangerouslySetInnerHTML={{ __html: String(mailChipError || getMessage(message)) }}
                    />
                ) : null}
                {'success' === status && 'error' !== status && !mailChipError && (
                    <div
                        className={css.inputSuccessCss}
                        dangerouslySetInnerHTML={{ __html: String(mailChipError || sanitize(message)) }}
                    />
                )}
            </Grid>
            {isMobile && (
                <Grid item xs={12} sx={{ paddingTop: '25px' }}>
                    <StyledBtnComponent
                        title={t('Subscribe')}
                        classesName={css.btnOutlinedFooter}
                        handleOnClick={handleSubscribe}
                    />
                </Grid>
            )}
        </>
    );
};

const NewsletterForm = () => (
    <MailchimpSubscribe
        url="https://reelcruit.us18.list-manage.com/subscribe/post?u=bb50349806a17f506f534e250&amp;id=83248d4909&amp;f_id=000528e7f0"
        render={(props) => {
            const { subscribe, status, message } = props || {};
            return (
                <Newsletter
                    status={status}
                    message={message}
                    onValidated={(formData: EmailFormFields) => subscribe(formData)}
                />
            );
        }}
    />
);

export default NewsletterForm;
