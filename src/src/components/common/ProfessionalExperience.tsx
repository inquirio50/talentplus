import React, { useEffect, useState } from 'react';
import { Box, Modal, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import globalStyles from '../../config/globalCss';
import StyledBtnComponent from '../common/StyledBtnComponent';
import TextFieldComponent from '../common/TextFieldComponent';
import SelectComponent from '../common/SelectComponent';
import { getOptionsLabeled, TYPE_MONTH_OPTIONS, TYPE_YEAR_OPTIONS } from '../helpers/typeOptions';
import { Experience } from '../../models/experience';
import { CloseIcon } from '../icons/Icons';

const styles: any = {
    item20: { height: '20%' },
    item80: { height: '80%', borderRadius: '5px', marginTop: 4 },

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

const ProfessionalExperience = ({
    isOpen,
    onClose,
    experience,
    handleUpdateProfile,
}: {
    isOpen: any;
    onClose: any;
    experience?: Experience;
    handleUpdateProfile: any;
}) => {
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));
    const [enableSave, setEnableSave] = useState(false);
    const errorMsgForm = new Map<String, String>();

    const monthOptions = getOptionsLabeled(TYPE_MONTH_OPTIONS, t);
    const yearOptions = getOptionsLabeled(TYPE_YEAR_OPTIONS, t);

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [title, setTitle] = useState(experience ? experience.title : '');
    const [companyName, setCompanyName] = useState(experience ? experience.companyName : '');
    const [sizeCompany, setSizeCompany] = useState(experience ? experience.sizeCompany : '');
    const extractDate = (date: string) => date.toString().split('T')[0].split('-');

    const [startingDate] = useState(experience && experience.startingDate && extractDate(experience.startingDate));
    const [endingDate] = useState(experience && experience.endingDate && extractDate(experience.endingDate));

    const [startMonth, setStartMonth] = useState(
        startingDate
            ? new Date(Number(startingDate[0]), Number(startingDate[1]), Number(startingDate[2])).getMonth().toString()
            : ''
    );
    const [endMonth, setEndMonth] = useState(
        endingDate
            ? new Date(Number(endingDate[0]), Number(endingDate[1]), Number(endingDate[2])).getMonth().toString()
            : ''
    );
    const [startYear, setStartYear] = useState(startingDate ? Number(startingDate[0]).toString() : '');
    const [endYear, setEndYear] = useState(endingDate ? Number(endingDate[0]).toString() : '');
    const [isCurrent, setIsCurrent] = useState(experience ? experience.isCurrent : false);

    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));

    const checkFormValid = (): boolean => {
        if (
            errorMsgForm.get('title') === '' ||
            errorMsgForm.get('title') === null ||
            errorMsgForm.get('companyName') === '' ||
            errorMsgForm.get('companyName') === null ||
            errorMsgForm.get('startMonth') === '' ||
            errorMsgForm.get('startMonth') === null ||
            errorMsgForm.get('startYear') === '' ||
            errorMsgForm.get('startYear') === null
        ) {
            return false;
        }
        return true;
    };

    const handleSaveExperience = () => {
        if (checkFormValid()) {
            const endDateSubmit = isCurrent
                ? null
                : new Date(parseInt(endYear, 10), parseInt(endMonth, 10) - 1, 1).toISOString();
            const experiencePayload: Experience = {
                title,
                companyName,
                sizeCompany,
                startingDate: new Date(parseInt(startYear, 10), parseInt(startMonth, 10) - 1, 1).toISOString(),
                endingDate: isCurrent ? null : endDateSubmit,
                isCurrent,
                startMonth,
                startYear,
                endMonth,
                endYear,
            };

            if (experience) {
                experiencePayload.id = experience.id;
                experiencePayload.appUserId = experience.appUserId;
                experiencePayload.description = experience.description;
            }

            setIsSaving(true);
            onClose();
            handleUpdateProfile(experiencePayload);
        }
    };

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;

        switch (type) {
            case 'title': {
                setTitle(value);

                break;
            }
            case 'companyName': {
                setCompanyName(value);

                break;
            }
            case 'sizeCompany': {
                setSizeCompany(value);

                break;
            }
            case 'startMonth': {
                setStartMonth(value);

                break;
            }
            case 'endMonth': {
                setEndMonth(value);

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

    const handleIsCurrent = () => {
        if (!isCurrent) {
            setEndYear('');
            setEndMonth('');
        }

        setIsCurrent(!isCurrent);
    };

    const isProfileUpdated = () => {
        let isUpdated = false;
        if (experience)
            isUpdated =
                title !== '' &&
                companyName !== '' &&
                sizeCompany !== '' &&
                startMonth !== '' &&
                (experience.title !== title ||
                    experience.companyName !== companyName ||
                    experience.isCurrent !== isCurrent ||
                    experience.sizeCompany !== sizeCompany ||
                    experience.isCurrent !== isCurrent ||
                    (startingDate
                        ? new Date(Number(startingDate[0]), Number(startingDate[1]), Number(startingDate[2]))
                              .getMonth()
                              .toString()
                        : '') !== startMonth ||
                    (startingDate ? startingDate[0].toString() : '') !== startYear ||
                    (endingDate
                        ? new Date(Number(endingDate[0]), Number(endingDate[1]), Number(endingDate[2]))
                              .getMonth()
                              .toString()
                        : '') !== endMonth ||
                    (endingDate ? endingDate[0].toString() : '') !== endYear);
        else {
            isUpdated =
                title !== '' &&
                companyName !== '' &&
                sizeCompany !== '' &&
                startMonth !== '' &&
                startYear !== '' &&
                startMonth !== '';
        }
        if (!isCurrent) isUpdated = endMonth !== '' && endYear !== '';
        return isUpdated;
    };

    useEffect(() => {
        if (isSaving && !loading) {
            setIsEditing(!isEditing);
        }
    }, [isSaving, loading]);

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [title, companyName, isCurrent, sizeCompany, startMonth, startYear, endMonth, endYear]);

    return (
        <Modal open={isOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Grid container direction="row" sx={styles.container}>
                <Grid container sx={styles.item20}>
                    <Grid item xs={11}>
                        <Typography id="modal-modal-title" sx={styles.title}>
                            {t('experience')}
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
                                id="title"
                                label={t('title')}
                                name="title"
                                placeholder={t('inputTitle')}
                                handleChange={handleChange('title')}
                                value={title}
                                autoCompleteInput="given-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                id="companyName"
                                label={t('companyName')}
                                name="companyName"
                                placeholder={t('inputCompany')}
                                handleChange={handleChange('companyName')}
                                value={companyName}
                                autoCompleteInput="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 1 }}>
                            <SelectComponent
                                label={t('sizeCompany')}
                                id="sizeCompany"
                                currentValue={sizeCompany}
                                options={profileParameters ? profileParameters.sizeOfWorks : []}
                                errorMsg={errorMsgForm}
                                placeHolder={t('inputSize')}
                                multiple={false}
                                handleChange={handleChange('sizeCompany')}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                            <SelectComponent
                                label={t('startMonth')}
                                id="startMonth"
                                currentValue={startMonth}
                                options={monthOptions}
                                errorMsg={errorMsgForm}
                                placeHolder={t('inputMonth')}
                                multiple={false}
                                handleChange={handleChange('startMonth')}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 2 }}>
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

                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                            <SelectComponent
                                label={t('endMonth')}
                                id="endMonth"
                                currentValue={endMonth}
                                options={monthOptions}
                                errorMsg={errorMsgForm}
                                placeHolder={t('inputMonth')}
                                multiple={false}
                                handleChange={handleChange('endMonth')}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ marginTop: 2 }}>
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

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isCurrent}
                                        sx={{
                                            color: '#c2185b',
                                            '&.Mui-checked': {
                                                color: '#d81b60',
                                            },
                                        }}
                                        onChange={handleIsCurrent}
                                    />
                                }
                                label={t('currentJob')}
                            />
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
                                                handleOnClick={handleSaveExperience}
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
            </Grid>
        </Modal>
    );
};

ProfessionalExperience.defaultProps = {
    experience: null,
};

export default ProfessionalExperience;
