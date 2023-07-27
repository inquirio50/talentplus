/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/system';
import { CloseIcon } from '../icons/Icons';
import AddressComponent from './AddressComponent';
import { formatPhoneNumberDisplay, getAddressString } from '../helpers/utilityFunctions';
import TextFieldComponent from './TextFieldComponent';
import StyledBtnComponent from './StyledBtnComponent';
import globalStyles from '../../config/globalCss';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        p: 4,
        gap: '10px',
        width: '90%',
        maxWidth: 560,
        maxHeight: 600,
        height: '90vh',
        overflowY: 'auto',
        background: theme.palette.common.white,
        border: '1px solid #DBDBDB',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '29px',
        color: theme.palette.common.black,
    },
    content: {
        marginTop: '20px',
        overflowY: 'scroll',
        paddingTop: '10px',
    },

    close: {
        cursor: 'pointer',
    },
}));

const CompanyInfo = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
    const { t } = useTranslation();
    const css = styles();
    const classes = globalStyles();
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [taxGST, setTaxGST] = useState('');
    const [taxQST, setTaxQST] = useState('');

    const handleChangeAddress = (address: string) => {
        // checkErrorMsg(address, 'addressProfile', t('address'), msgErr, setMsgErr);
    };

    const handleChange = (type: string) => (event: any) => {};

    const handleSave = () => {};

    return (
        <Modal open={isOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Grid container direction="row" className={css.container}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography id="modal-modal-title" className={css.title}>
                                {t('companyInformation')}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} textAlign="right" className={css.close}>
                            <CloseIcon onClick={onClose} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={css.content}>
                    <Grid container>
                        <Grid item xs={12}>
                            <AddressComponent
                                id="addressProfile"
                                name="addressProfile"
                                label={t('address')}
                                value={address}
                                error={msgErr}
                                handleChange={handleChangeAddress}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '31px' }}>
                            <TextFieldComponent
                                id="email"
                                label={t('email')}
                                name="email"
                                placeholder={t('enterEmailAddress')}
                                handleChange={handleChange('email')}
                                value={email}
                                autoCompleteInput="email"
                                error={msgErr}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '31px' }}>
                            <TextFieldComponent
                                id="phone"
                                label={t('phone')}
                                name="phone"
                                placeholder={t('enterPhone')}
                                handleChange={handleChange('phone')}
                                value={formatPhoneNumberDisplay(phone || '')}
                                autoCompleteInput="phone"
                                error={msgErr}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '31px' }}>
                            <TextFieldComponent
                                id="taxNumberGST"
                                label={t('taxNumber')}
                                name="taxNumberGst"
                                placeholder={t('')}
                                handleChange={handleChange('taxGST')}
                                value={taxGST}
                                error={msgErr}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '31px' }}>
                            <TextFieldComponent
                                id="taxNumberQST"
                                label={t('taxNumberQST')}
                                name="taxNumberGst"
                                placeholder={t('')}
                                handleChange={handleChange('taxQST')}
                                value={taxGST}
                                error={msgErr}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    marginBottom: 1,
                                }}>
                                <Grid container>
                                    <Grid item xs={4} className={classes.gridBtnLogin}>
                                        <StyledBtnComponent
                                            title={t('cancel')}
                                            handleOnClick={onClose}
                                            red={false}
                                            btWidth="auto"
                                            btHeight="50px"
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridBtnRegister}>
                                        <StyledBtnComponent
                                            title={t('save')}
                                            handleOnClick={handleSave}
                                            // disabled={!enableSave}
                                            // loading={isSaving && loading}
                                            btWidth="auto"
                                            btHeight="50px"
                                            red
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default CompanyInfo;
