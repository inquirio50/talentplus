import React, { useEffect, useState } from 'react';
import { Modal, Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import globalStyles from '../../config/globalCss';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { RootState } from '../../store/store';
import TextFieldComponent from '../common/TextFieldComponent';
import { Education } from '../../models/education';
import SelectComponent from '../common/SelectComponent';
import { getOptionsLabeled, TYPE_YEAR_OPTIONS } from '../helpers/typeOptions';
import { CloseIcon } from '../icons/Icons';

const styles: any = {
    item20: { height: '10' },
    item80: { height: '90%', borderRadius: '5px', marginTop: 4 },

    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 500,
        maxHeight: 600,
        height: '90vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: '5px',
        padding: '30px',
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '29px',
        color: '#000000',
    },
    subTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '12px',

        display: 'flex',
        alignItems: 'center',
        letterSpacing: '0.15px',

        color: 'rgba(0, 0, 0, 0.54)',
    },
    dropDown: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
    },
    upload: { textTransform: 'none', height: '30px' },
    cancel: {
        textTransform: 'none',
        color: 'gray',
        height: '30px',
        borderColor: 'gray',
        '&:hover': {
            borderColor: 'gray',
        },
    },
    selectFile: { textTransform: 'none', margin: '5px' },

    close: {
        cursor: 'pointer',
    },
    gridLine: {
        marginTop: 10,
        marginBottom: 10,

        borderBottom: '0.5px solid #E8E8E8',
    },
};

const PersonalEducation = ({
    isOpen,
    onClose,
    education,
    handleUpdateProfile,
}: {
    isOpen: any;
    onClose: any;
    education?: Education;
    handleUpdateProfile: any;
}) => {
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    // const dispatch = useDispatch();
    // const [, updateState] = useState<any | undefined>();
    // const forceUpdate: any = useCallback(() => updateState({}), []);
    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));
    const [enableSave, setEnableSave] = useState(false);
    const [errorMsgForm, setErrorMsgForm] = useState<Map<String, String>>(new Map<String, String>());
    const yearOptions = getOptionsLabeled(TYPE_YEAR_OPTIONS, t);

    const [isEditing, setIsEditing] = useState(false);

    const [country, setCountry] = useState(education ? education.country : '');
    const [institutionName, setInstitutionName] = useState(education ? education.institutionName : '');
    const [degree, setDegree] = useState(education ? education.degree : '');
    const [startYear, setStartYear] = useState(education ? education.startYear : '');
    const [endYear, setEndYear] = useState(education ? education.endYear : '');
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;

        switch (type) {
            case 'country': {
                if (value === '') {
                    errorMsgForm.set('country', t('errorInputCountry'));
                    setErrorMsgForm(errorMsgForm);
                } else {
                    errorMsgForm.delete('country');
                }
                setCountry(value);

                break;
            }
            case 'degree': {
                if (value === '') {
                    errorMsgForm.set('degree', t('errorInputDegree'));
                    setErrorMsgForm(errorMsgForm);
                } else {
                    errorMsgForm.delete('degree');
                }
                setDegree(value);

                break;
            }
            case 'institutionName': {
                if (value === '') {
                    errorMsgForm.set('institutionName', t('errorInputInstitution'));
                    setErrorMsgForm(errorMsgForm);
                } else {
                    errorMsgForm.delete('institutionName');
                }
                setInstitutionName(value);

                break;
            }
            case 'startYear': {
                setStartYear(value);

                break;
            }
            case 'endYear': {
                setEndYear(value);

                break;
            }
            default: {
                break;
            }
        }
    };

    const checkFormValid = (): boolean => {
        if (country === '') {
            errorMsgForm.set('country', t('errorInputCountry'));
            setErrorMsgForm(errorMsgForm);
        }
        if (degree === '') {
            errorMsgForm.set('degree', t('errorInputDegree'));
            setErrorMsgForm(errorMsgForm);
        }
        if (institutionName === '') {
            errorMsgForm.set('institutionName', t('errorInputInstitution'));
            setErrorMsgForm(errorMsgForm);
        }
        if (
            country === '' ||
            errorMsgForm.get('country') === '' ||
            errorMsgForm.get('country') === null ||
            degree === '' ||
            errorMsgForm.get('degree') === '' ||
            errorMsgForm.get('degree') === null ||
            institutionName === '' ||
            errorMsgForm.get('institutionName') === '' ||
            errorMsgForm.get('institutionName') === null
        ) {
            return false;
        }
        return true;
    };

    const handleSaveEducation = () => {
        if (checkFormValid()) {
            const educationPayload: Education = {
                country,
                degree,
                institutionName,
                startYear,
                endYear,
            };
            setIsSaving(true);
            if (education) {
                educationPayload.id = education.id;
                educationPayload.appUserId = education.appUserId;
            }

            onClose();
            setIsSaving(true);
            handleUpdateProfile(educationPayload);
        }
    };

    const isProfileUpdated = () => {
        let isUpdated = false;

        if (education)
            isUpdated =
                country !== '' &&
                institutionName !== '' &&
                degree !== '' &&
                startYear !== '' &&
                endYear !== '' &&
                (education?.country !== country ||
                    education?.institutionName !== institutionName ||
                    education?.degree !== degree ||
                    education?.startYear !== startYear ||
                    education?.endYear !== endYear);
        else {
            isUpdated = country !== '' && degree !== '' && startYear !== '' && endYear !== '';
        }

        return isUpdated;
    };

    useEffect(() => {
        if (isSaving && !loading) {
            setIsEditing(!isEditing);
        }
    }, [isSaving, loading]);

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [country, institutionName, degree, startYear, endYear]);

    return (
        <Modal open={isOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Grid container direction="row" sx={styles.container}>
                <Grid container sx={styles.item20}>
                    <Grid item xs={11}>
                        <Typography id="modal-modal-title" sx={styles.title}>
                            {t('education')}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} textAlign="right" sx={styles.close}>
                        <CloseIcon onClick={onClose} />
                    </Grid>
                </Grid>

                <Grid container sx={styles.item80}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                id="country"
                                label={t('country')}
                                name="country"
                                placeholder={t('inputCountry')}
                                handleChange={handleChange('country')}
                                value={country}
                                autoCompleteInput="country"
                                error={errorMsgForm || null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                id="degree"
                                label={t('degree')}
                                name="degree"
                                placeholder={t('inputDegree')}
                                handleChange={handleChange('degree')}
                                value={degree}
                                error={errorMsgForm || null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                id="institutionName"
                                label={t('institutionName')}
                                name="institutionName"
                                placeholder={t('inputInstitutionName')}
                                handleChange={handleChange('institutionName')}
                                value={institutionName}
                                error={errorMsgForm || null}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 1.3 }}>
                            <SelectComponent
                                label={t('startYear')}
                                id="startYear"
                                currentValue={startYear}
                                options={yearOptions}
                                errorMsg={errorMsgForm}
                                placeHolder={t('inputYear')}
                                multiple={false}
                                handleChange={handleChange('startYear')}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 2.4 }}>
                            <SelectComponent
                                label={t('endYear')}
                                id="endYear"
                                currentValue={endYear}
                                options={yearOptions}
                                errorMsg={errorMsgForm}
                                placeHolder={t('inputYear')}
                                multiple={false}
                                handleChange={handleChange('endYear')}
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
                                    mt: 3,
                                    marginBottom: 1,
                                }}>
                                <Grid container>
                                    <Grid item xs={4} className={globalClasses.gridBtnLogin}>
                                        <StyledBtnComponent
                                            title={t('cancel')}
                                            handleOnClick={onClose}
                                            red={false}
                                            btWidth="87px"
                                            btHeight="30px"
                                            classesName={globalClasses.btnOutlined}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={globalClasses.gridBtnRegister}>
                                        <StyledBtnComponent
                                            title={t('save')}
                                            handleOnClick={handleSaveEducation}
                                            disabled={!enableSave}
                                            loading={isSaving && loading}
                                            btWidth="134px"
                                            btHeight="50px"
                                            classesName={globalClasses.btnContained}
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

PersonalEducation.defaultProps = {
    education: null,
};

export default PersonalEducation;
