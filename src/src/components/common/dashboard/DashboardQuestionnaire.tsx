import { Grid, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CONSULTANT_ROLE, PERMANENT_ROLE } from '../../../config/constants';
import globalStyles from '../../../config/globalCss';
import { FormDataType } from '../../../config/interfaces';
import { profileUpdateInfo, saveRegisterForm } from '../../../store/reducers/genericActions';
import { RootState } from '../../../store/store';
import AutoCompleteComponent from '../AutoCompleteComponent';
import FileUpLoad from '../FileUpLoad';
import RadioGroupComponent from '../RadioGroupComponent';
import SelectComponent from '../SelectComponent';
import StyledBtnComponent from '../StyledBtnComponent';
import TextFieldComponent from '../TextFieldComponent';
import {
    getOptionsLabeled,
    PREFERED_CONTRACT_DURATION_OPTIONS,
    TYPE_BENEFITS,
    TYPE_CURRENT_STATUS,
    TYPE_NOTIFICATION,
} from '../../helpers/typeOptions';
import Upload from '../../../assets/images/dashboard/upload.png';
import {
    checkErrorMsg,
    convertListToCommonType,
    formatPhoneNumberDisplay,
    getBenefits,
    removeFormatPhone,
} from '../../helpers/utilityFunctions';
import i18n from '../../../config/i18next';
import { Profile } from '../../../models/profile';
import User from '../../../models/user';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        padding: '40px 0px 90px 0px',
        backgroundColor: theme.palette.common.white,
        width: '100%',
        maxWidth: '1010px',
        [theme.breakpoints.down('lg')]: {
            padding: '3rem 0',
        },
    },
    box: {
        padding: '50px',
        border: '1px solid #EDEDED',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '1010px',
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
    gridBtnSpace: {
        paddingTop: '40px',
    },
    gridBtn: {
        maxWidth: '120px',
    },
    gridBtnLeft: {
        paddingLeft: '16px',
    },
    gridField: {},
    gridQuestionnaire: {
        maxWidth: '420px',
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    txt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '17px',
    },
    question: {
        color: 'rgba(0, 0, 0, 0.54);',
    },
    activeAnswer: {
        color: '#EC008B',
    },
    normalAnswer: {
        color: '#202020',
    },
    boxResume: {
        width: '420px',
        height: '145px',
        background: '#FFFFFF',
        border: '1px dashed #DBDBDB',
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        [theme.breakpoints.down('lg')]: {
            height: 'auto',
            width: '100%',
            padding: '1.5rem',
        },
    },
    uploadClick: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#EC008B',
    },
}));

const DashboardQuestionnaire = ({
    handleLetsGo,
    checkCandidateInfo,
}: {
    handleLetsGo: any;
    checkCandidateInfo: any;
}) => {
    const { t } = useTranslation();
    const css = styles();
    const classes = globalStyles();
    const dispatch = useDispatch();

    const getOptions = (type: string) => getOptionsLabeled(type, t);

    const { loading, user, profile }: { loading: boolean; user: User; profile: Profile } = useSelector(
        (state: RootState) => ({
            loading: state.authentication.loading,
            formRegister: state.generic.formRegister,
            profilParameters: state.generic.profilParameters,
            user: state.authentication.user,
            profile: state.candidate.profile,
        })
    );

    const [formData, setFormData] = useState<FormDataType>({
        agreementRead: true,
        finished: false,
        agreementLocalization: false,
        yourself: profile?.questionaire?.yourself || '',
        legallyWork: profile?.legallyWork || false,
        searchOpportunity: profile?.searchOpportunity || '',
        needSponsor: profile?.needSponsor || false,
        notified: profile?.notified || '',
        relocate: profile?.relocate || false,
        phone: profile?.phoneNumber || '',
        duration: profile.duration ? (profile.duration as Array<any>) : [],
        incorporated: profile?.incorporated || false,
        benefits: convertListToCommonType(getOptions(TYPE_BENEFITS), profile?.questionaire?.benefits),
    });
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());
    const [isFileUpLoadOpen, setIsFileUpLoadOpen] = useState(false);

    const manageForm = (type: string, newValue?: any) => {
        const newForm: FormDataType = {
            ...formData,
        };
        switch (type) {
            case 'yourself': {
                newForm.yourself = newValue;
                checkErrorMsg(newForm.yourself, 'yourself', t('enterSummary'), msgErr, setMsgErr);
                break;
            }
            case 'legallyWork': {
                newForm.legallyWork = newValue === 'true';
                break;
            }
            case 'searchOpportunity': {
                newForm.searchOpportunity = newValue;
                checkErrorMsg(newForm.searchOpportunity, 'searchOpportunity', t('selectTitle'), msgErr, setMsgErr);
                break;
            }
            case 'needSponsor': {
                newForm.needSponsor = newValue === 'true';
                break;
            }
            case 'notified': {
                newForm.notified = newValue;
                break;
            }
            case 'relocate': {
                newForm.relocate = newValue;
                break;
            }
            case 'phone': {
                const valueCleanned = removeFormatPhone(newValue);
                if (valueCleanned.length <= 11) {
                    newForm.phone = valueCleanned;
                }
                checkErrorMsg(newForm.phone, 'phone', t('enterPhone'), msgErr, setMsgErr);
                break;
            }
            case 'contractDuration': {
                newForm.duration = newValue;
                checkErrorMsg(newForm.phone, 'duration', t('contractDuration'), msgErr, setMsgErr);
                break;
            }
            case 'incorporated': {
                newForm.incorporated = newValue === 'true';
                break;
            }
            case 'selectBenefits': {
                newForm.benefits = newValue;
                checkErrorMsg(newForm.benefits, 'selectBenefits', t('selectBenefits'), msgErr, setMsgErr);
                break;
            }
            default:
                break;
        }
        setFormData(newForm);
    };

    const handleChange = (type: string, valueSelected?: any) => (event: any, valueChange?: any) => {
        let value = null;
        if (event) {
            event.stopPropagation();
            value = event.target.value;
        }
        if (value && value !== '0') {
            manageForm(type, value);
        } else if (valueSelected) {
            manageForm(type, valueSelected as string);
        } else {
            manageForm(type, valueChange);
        }
    };

    const handleSave = () => {
        dispatch(saveRegisterForm(formData));
        const updateProfile: Profile = {
            ...profile,
            summary: formData.yourself,
            legallyWork: formData.legallyWork || false,
            searchOpportunity: formData.searchOpportunity,
            needSponsor: formData.needSponsor || false,
            notified: formData.notified,
            relocate: formData.relocate || false,
            phoneNumber: formData.phone || '',
            duration: formData.duration?.map((x: any) => x.value).join(',') || '',
            incorporated: formData.incorporated || false,
            questionaire: JSON.stringify({
                ...profile.questionaire,
                benefits: formData.benefits ? getBenefits(formData.benefits) : '',
                yourself: formData.yourself,
                password: null,
                confirmPassword: null,
            }),
        };
        dispatch(profileUpdateInfo({ ...updateProfile, codeLangue: i18n.resolvedLanguage.toLocaleUpperCase() }));
        checkCandidateInfo();
        handleLetsGo();
    };

    return (
        <Grid item xs={12}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item className={css.container}>
                    <Grid container className={css.box}>
                        <Grid container spacing={10}>
                            <Grid item lg={6} md={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item lg={12} md={6} sm={12} xs={12} className={css.gridQuestionnaire}>
                                        <TextFieldComponent
                                            id="yourself"
                                            label={t('tellAboutYourself')}
                                            name="yourself"
                                            placeholder={t('Iam')}
                                            handleChange={handleChange('yourself')}
                                            value={formData?.yourself || ''}
                                            error={msgErr}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={12}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        className={clsx(css.gridQuestionnaire, css.gridField)}>
                                        <SelectComponent
                                            id="searchOpportunity"
                                            label={t('describeCurrentStatus')}
                                            placeHolder={t('selectTitle')}
                                            currentValue={formData.searchOpportunity || ''}
                                            options={getOptions(TYPE_CURRENT_STATUS)}
                                            handleChange={handleChange('searchOpportunity')}
                                            errorMsg={msgErr}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={12}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        className={clsx(css.gridQuestionnaire, css.gridField)}>
                                        <SelectComponent
                                            id="notified"
                                            label={t('howWouldLikeNotified')}
                                            placeHolder={t('email')}
                                            currentValue={formData.notified || ''}
                                            options={getOptions(TYPE_NOTIFICATION)}
                                            handleChange={handleChange('notified')}
                                            errorMsg={msgErr}
                                        />
                                    </Grid>
                                    {formData.notified === 'text' && (
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                            className={clsx(css.gridQuestionnaire, css.gridField)}>
                                            <TextFieldComponent
                                                id="phone"
                                                label={t('phone')}
                                                name="phone"
                                                placeholder={t('enterPhone')}
                                                handleChange={handleChange('phone')}
                                                value={formatPhoneNumberDisplay(formData.phone || '')}
                                                autoCompleteInput="phone"
                                                error={msgErr}
                                            />
                                        </Grid>
                                    )}
                                    {user.role === PERMANENT_ROLE && (
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                            className={clsx(css.gridQuestionnaire, css.gridField)}>
                                            <AutoCompleteComponent
                                                id="selectBenefits"
                                                label={t('selectBenefits')}
                                                multiple
                                                handleChange={handleChange('selectBenefits')}
                                                defaultValue={[]}
                                                options={getOptions(TYPE_BENEFITS)}
                                                currValue={formData.benefits || []}
                                                errorMsg={msgErr}
                                            />
                                        </Grid>
                                    )}
                                    {user.role === CONSULTANT_ROLE && (
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                            className={clsx(css.gridQuestionnaire, css.gridField)}>
                                            <AutoCompleteComponent
                                                id="contractDuration"
                                                label={t('contractDuration')}
                                                multiple
                                                handleChange={handleChange('contractDuration')}
                                                defaultValue={[]}
                                                options={getOptions(PREFERED_CONTRACT_DURATION_OPTIONS)}
                                                currValue={formData.duration || []}
                                                errorMsg={msgErr}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12} className={clsx(css.gridQuestionnaire, css.gridField)}>
                                        <Grid container>
                                            <Grid item xs={12} className={css.boxResume}>
                                                <Grid container padding="16px">
                                                    {!formData.resume && (
                                                        <Grid item xs={12} justifyContent="center" textAlign="center">
                                                            <Grid container>
                                                                <Grid item xs={12}>
                                                                    <IconButton
                                                                        color="primary"
                                                                        onClick={() => setIsFileUpLoadOpen(true)}>
                                                                        <img
                                                                            src={Upload}
                                                                            alt="Upload"
                                                                            width="40px"
                                                                            height="40px"
                                                                        />
                                                                    </IconButton>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Grid container>
                                                                        <Grid
                                                                            item
                                                                            md={6}
                                                                            xs={12}
                                                                            sx={{
                                                                                textAlign: {
                                                                                    md: 'right',
                                                                                    sm: 'center',
                                                                                },
                                                                            }}>
                                                                            <StyledBtnComponent
                                                                                title={t('clickToUpload')}
                                                                                handleOnClick={() =>
                                                                                    setIsFileUpLoadOpen(true)
                                                                                }
                                                                                classesName={classes.btnLinks}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            md={6}
                                                                            xs={12}
                                                                            paddingTop="3px"
                                                                            sx={{
                                                                                textAlign: {
                                                                                    md: 'left',
                                                                                    sm: 'center',
                                                                                },
                                                                            }}>
                                                                            <Typography
                                                                                component="span"
                                                                                className={classes.txtDrag}>{` ${t(
                                                                                'clickDrag'
                                                                            )}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography className={classes.txtDrag}>
                                                                        {t('maxUpload')}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                    {!formData.resume && (
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            margin="auto"
                                                            textAlign="center"
                                                            minHeight="45px">
                                                            <FileUpLoad
                                                                isOpen={isFileUpLoadOpen}
                                                                onClose={() => setIsFileUpLoadOpen(false)}
                                                                title={t('resume')}
                                                                text={t('dropCVDescription')}
                                                                maxSize={1048576}
                                                                maxSizeText="1MB"
                                                                extensions=".pdf,.doc,.docx"
                                                                resume={formData.resume}
                                                                handleChange={handleChange}
                                                            />
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={6} md={12} xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={clsx(css.txt, css.question)}>
                                            {t('questionLeggaly')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RadioGroupComponent
                                            defaultValue
                                            currValue={formData.legallyWork || false}
                                            classes={classes}
                                            css={css}
                                            handleChange={handleChange}
                                            id="legallyWork"
                                            t={t}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={css.gridField}>
                                        <Typography className={clsx(css.txt, css.question)}>
                                            {t('questionSponsor')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RadioGroupComponent
                                            defaultValue={formData.needSponsor}
                                            currValue={formData.needSponsor || false}
                                            classes={classes}
                                            css={css}
                                            handleChange={handleChange}
                                            id="needSponsor"
                                            t={t}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={css.gridField}>
                                        <Typography className={clsx(css.txt, css.question)}>
                                            {t('questionRelocate')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RadioGroupComponent
                                            defaultValue={formData.relocate}
                                            currValue={formData.relocate || false}
                                            classes={classes}
                                            css={css}
                                            handleChange={handleChange}
                                            id="relocate"
                                            t={t}
                                        />
                                    </Grid>
                                    {user.role === CONSULTANT_ROLE && (
                                        <>
                                            <Grid item xs={12} className={css.gridField}>
                                                <Typography className={clsx(css.txt, css.question)}>
                                                    {t('questionIncorporated')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <RadioGroupComponent
                                                    defaultValue={formData.incorporated}
                                                    currValue={formData.incorporated || false}
                                                    classes={classes}
                                                    css={css}
                                                    handleChange={handleChange}
                                                    id="incorporated"
                                                    t={t}
                                                />
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className={css.gridBtnSpace}>
                            <Grid item lg={1} md={6} xs={6} className={css.gridBtn}>
                                <StyledBtnComponent
                                    title={t('back')}
                                    handleOnClick={handleLetsGo}
                                    red={false}
                                    btWidth="100px"
                                />
                            </Grid>
                            <Grid item lg={9} md={6} xs={6} alignContent="flex-start" className={css.gridBtnLeft}>
                                <StyledBtnComponent
                                    title={t('finish')}
                                    handleOnClick={handleSave}
                                    red
                                    btWidth="100px"
                                    loading={loading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardQuestionnaire;
