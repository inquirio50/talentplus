import { Checkbox, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pink } from '@mui/material/colors';
import { JOB_HYBRID, JOB_OFFICE } from '../../../config/constants';
import { FormDataType } from '../../../config/interfaces';
import AutoCompleteComponent from '../../common/AutoCompleteComponent';
import FileUpLoad from '../../common/FileUpLoad';
import SelectComponent from '../../common/SelectComponent';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import TextFieldComponent from '../../common/TextFieldComponent';
import {
    CommonTypeOptions,
    getOptionsLabeled,
    LEVEL_LANGUAGE_OPTIONS,
    PREFERED_CONTRACT_DURATION_OPTIONS,
    TYPE_OF_WORK_OPTIONS,
    TYPE_SKILLS_OPTIONS,
} from '../../helpers/typeOptions';
import { formatPhoneNumberDisplay, getResumeUrl } from '../../helpers/utilityFunctions';
import { Check } from '../../icons/Icons';

const useStyles: any = makeStyles((theme: Theme) => ({
    text: {
        fontSize: 14,
        color: theme.palette.baseColorTxt,
    },
    textBold: {
        fontSize: 14,
        color: theme.palette.baseColorTxt,
        fontWeight: 'bold',
    },
    textColor: {
        fontSize: 14,
        color: theme.palette.baseColor,
    },
    btnRed: {
        color: theme.palette.baseColor,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        borderColor: theme.palette.baseColor,
        fontWeight: 400,
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
            height: 40,
        },
    },
    btnRedSelected: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.baseColor,
        border: '1px solid transparent',
        borderColor: theme.palette.baseColor,
        fontWeight: 400,
    },
    btnBlue: {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
            height: 40,
        },
    },
    btnBlueSelected: {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.baseColor,
        border: '1px solid transparent',
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.primary.light,
            height: 40,
        },
    },
    btnBlueBig: {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
    },
}));

const ContentStepsContract = ({
    step,
    handleChange,
    formData,
    loading,
    profilParameters,
    msgErr,
}: {
    step: number;
    handleChange: any;
    formData: FormDataType;
    loading: boolean;
    profilParameters: any;
    msgErr: Map<string, string>;
}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isFileUpLoadOpen, setIsFileUpLoadOpen] = useState(false);

    const typeSelected = () => {
        if (step === 4) return TYPE_SKILLS_OPTIONS;
        if (step === 9) return PREFERED_CONTRACT_DURATION_OPTIONS;
        if (step === 10) return LEVEL_LANGUAGE_OPTIONS;
        if (step === 13) return TYPE_OF_WORK_OPTIONS;
        return null;
    };

    const type = typeSelected();
    const [options, setOptions] = useState<CommonTypeOptions[]>(type ? getOptionsLabeled(type, t) : []);

    useEffect(() => {
        const currType = typeSelected();
        if (currType) {
            const labels = getOptionsLabeled(currType, t);
            setOptions(labels);
        }
    }, [t, step]);

    switch (step) {
        case 0:
            return (formData.incorporated || formData.incorporated === undefined) &&
                formData.incorporatedHelp === undefined ? (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question2')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('no')}
                            handleOnClick={handleChange('incorporated', false)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('yes')}
                            handleOnClick={handleChange('incorporated', true)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnBlue}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question2-1')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('no')}
                            handleOnClick={handleChange('incorporated_help', false)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('yes')}
                            handleOnClick={handleChange('incorporated_help', true)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnBlue}
                        />
                    </Grid>
                </Grid>
            );
        case 1:
            return (
                <Grid container sx={{ minHeight: '100px' }} spacing={2}>
                    <Grid item xs={12} margin="auto" marginBottom="20px" textAlign="center">
                        <Typography className={classes.textBold}>{t('question3')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('ImLooking')}
                            handleOnClick={handleChange('searchOpportunity', 'looking')}
                            loading={loading}
                            classesName={classes.btnBlueBig}
                        />
                    </Grid>
                    <Grid item xs={12} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('ImSearching')}
                            handleOnClick={handleChange('searchOpportunity', 'searching')}
                            loading={loading}
                            classesName={classes.btnBlueBig}
                        />
                    </Grid>
                    <Grid item xs={12} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('ImSearchingFlex')}
                            handleOnClick={handleChange('searchOpportunity', 'flex')}
                            loading={loading}
                            classesName={classes.btnBlueBig}
                        />
                    </Grid>
                    <Grid item xs={12} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('IneedOportunity')}
                            handleOnClick={handleChange('searchOpportunity', 'opportunity')}
                            loading={loading}
                            classesName={classes.btnBlueBig}
                        />
                    </Grid>
                </Grid>
            );
        case 2:
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question4')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="selectTitle"
                            label={t('selectTitle')}
                            multiple
                            handleChange={handleChange('selectTitle')}
                            defaultValue={[]}
                            options={profilParameters.titles}
                            currValue={formData.title || []}
                        />
                    </Grid>
                </Grid>
            );
        case 3:
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question5')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="selectJobFunction"
                            label={t('selectJobFunction')}
                            multiple
                            handleChange={handleChange('selectJobFunction')}
                            defaultValue={[]}
                            options={profilParameters.functions}
                            currValue={formData.jobFunction || []}
                        />
                    </Grid>
                </Grid>
            );
        case 4: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question6')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="skillsArray"
                            label={t('selectSkill')}
                            multiple
                            handleChange={handleChange('skills')}
                            defaultValue={[]}
                            options={options}
                            currValue={formData.skills || []}
                        />
                    </Grid>
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question61')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="additionalsSkillsArray"
                            label={t('selectAdditionalsSkill')}
                            multiple
                            handleChange={handleChange('additionalsSkills')}
                            defaultValue={[]}
                            options={options}
                            currValue={formData.additionalsSkills || []}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 5: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question7')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <SelectComponent
                            id="selectedExperience"
                            label={t('selectExperience')}
                            placeHolder={t('selectExperience')}
                            currentValue={formData.experienceLevel || ''}
                            options={profilParameters.experienceLevels}
                            handleChange={handleChange('selectExperience')}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 6: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question8')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="selectIndustry"
                            label={t('selectIndustry')}
                            multiple
                            handleChange={handleChange('selectIndustry')}
                            defaultValue={[]}
                            options={profilParameters.industries}
                            currValue={formData.industry || []}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 7: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question9')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <SelectComponent
                            id="selectedSizeWork"
                            label={t('selectSizeWork')}
                            placeHolder={t('selectSizeWork')}
                            currentValue={formData.sizeOfWork || ''}
                            options={profilParameters.sizeOfWorks}
                            handleChange={handleChange('selectedSizeWork')}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 8:
            return (formData.legallyWork || formData.legallyWork === undefined) &&
                formData.needSponsor === undefined ? (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question10')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('no')}
                            handleOnClick={handleChange('legallyWork', false)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('yes')}
                            handleOnClick={handleChange('legallyWork', true)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnBlue}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question10-1')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" textAlign="end" minHeight="45px">
                        <StyledBtnComponent
                            title={t('no')}
                            handleOnClick={handleChange('needSponsor', false)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('yes')}
                            handleOnClick={handleChange('needSponsor', true)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnBlue}
                        />
                    </Grid>
                </Grid>
            );
        case 9: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question11')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="contractDuration"
                            label={t('contractDuration')}
                            multiple
                            handleChange={handleChange('contractDuration')}
                            defaultValue={[]}
                            options={options}
                            currValue={formData.duration || []}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 10: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question12')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <SelectComponent
                            id="selectLanguageEng"
                            label={t('selectLanguageEng')}
                            placeHolder={t('selectLanguageEng')}
                            currentValue={formData.selectLanguageEng || ''}
                            options={options}
                            handleChange={handleChange('selectLanguageEng')}
                        />
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px" marginTop={3}>
                        <SelectComponent
                            id="selectLanguageFr"
                            label={t('selectLanguageFr')}
                            placeHolder={t('selectLanguageFr')}
                            currentValue={formData.selectLanguageFr || ''}
                            options={options}
                            handleChange={handleChange('selectLanguageFr')}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 11:
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question13')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('no')}
                            handleOnClick={handleChange('processWithCompany', false)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('yes')}
                            handleOnClick={handleChange('processWithCompany', true)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={
                                !(formData.processWithCompany === undefined && formData.companyProcess === undefined)
                                    ? classes.btnBlueSelected
                                    : classes.btnBlue
                            }
                        />
                    </Grid>
                    {!(formData.processWithCompany === undefined && formData.companyProcess === undefined) && (
                        <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px" marginTop={3}>
                            <TextFieldComponent
                                id="companyProcess"
                                label={t('companyProcess')}
                                name="companyProcess"
                                placeholder={t('companyProcess')}
                                handleChange={handleChange('companyProcess')}
                                value={formData.companyProcess || ''}
                                autoCompleteInput="given-name"
                            />
                        </Grid>
                    )}
                </Grid>
            );
        case 12: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question14')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px" marginTop={3}>
                        <SelectComponent
                            id="selectedPayment"
                            label={t('selectRate')}
                            placeHolder={t('selectRate')}
                            currentValue={formData.salaryId || ''}
                            options={
                                profilParameters
                                    ? profilParameters.salaries.filter((x: any) => x.periode === 'Hour')
                                    : []
                            }
                            handleChange={handleChange('selectRate')}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 13: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question15')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <SelectComponent
                            id="selectedTypeWork"
                            label={t('selectedTypeWork')}
                            placeHolder={t('selectedTypeWork')}
                            currentValue={formData.typeOfWork || ''}
                            options={options}
                            multiple
                            handleChange={handleChange('selectedTypeWork')}
                        />
                    </Grid>
                    {(formData.typeOfWork?.includes(JOB_HYBRID) || formData.typeOfWork?.includes(JOB_OFFICE)) && (
                        <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px" marginTop={3}>
                            <SelectComponent
                                id="selectWorkDistance"
                                label={t('selectWorkDistance')}
                                placeHolder={t('selectWorkDistance')}
                                currentValue={formData.localisation || ''}
                                options={profilParameters.localisations}
                                handleChange={handleChange('workDistance')}
                            />
                        </Grid>
                    )}
                </Grid>
            );
        }
        case 14: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question16')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('no')}
                            handleOnClick={handleChange('noCompany', false)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('yes')}
                            handleOnClick={handleChange('noCompany', true)}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={
                                formData.noCompany !== undefined && formData.noCompany
                                    ? classes.btnBlueSelected
                                    : classes.btnBlue
                            }
                        />
                    </Grid>
                    {formData.noCompany !== undefined && formData.noCompany && (
                        <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px" marginTop={3}>
                            <AutoCompleteComponent
                                id="selectUnWantedIndustry"
                                label={t('selectUnwantedIndustry')}
                                multiple
                                handleChange={handleChange('selectUnWantedIndustry')}
                                defaultValue={[]}
                                options={profilParameters.industries}
                                currValue={formData.unWantedIndustry || []}
                            />
                        </Grid>
                    )}
                </Grid>
            );
        }
        case 15:
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question17')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="selectCulture"
                            label={t('selectCulture')}
                            multiple
                            handleChange={handleChange('selectCulture')}
                            defaultValue={[]}
                            options={profilParameters.cultures}
                            currValue={formData.culture || []}
                        />
                    </Grid>
                </Grid>
            );
        case 16:
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question18')}</Typography>
                    </Grid>
                    <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px">
                        <AutoCompleteComponent
                            id="selectPersonality"
                            label={t('selectPersonality')}
                            multiple
                            handleChange={handleChange('selectPersonality')}
                            defaultValue={[]}
                            options={profilParameters.personalities}
                            currValue={formData.personality || []}
                        />
                    </Grid>
                </Grid>
            );
        case 17:
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question19')}</Typography>
                    </Grid>
                    <Grid item xs={4} margin="auto" textAlign="end" minHeight="45px">
                        <StyledBtnComponent
                            title={t('text')}
                            handleOnClick={handleChange('notified', 'text')}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={
                                formData.notified !== undefined && formData.notified === 'text'
                                    ? classes.btnRedSelected
                                    : classes.btnRed
                            }
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} margin="auto" minHeight="45px">
                        <StyledBtnComponent
                            title={t('email')}
                            handleOnClick={handleChange('notified', 'email')}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnBlue}
                        />
                    </Grid>
                    {formData.notified !== undefined && formData.notified === 'text' && (
                        <Grid item xs={12} margin="auto" textAlign="end" minHeight="45px" marginTop={3}>
                            <TextFieldComponent
                                id="phone"
                                label={t('phone')}
                                name="phone"
                                placeholder={t('enterPhone')}
                                handleChange={handleChange('phone')}
                                value={formatPhoneNumberDisplay(formData.phone || '')}
                                autoCompleteInput="phone"
                            />
                        </Grid>
                    )}
                </Grid>
            );
        case 18: {
            return (
                <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                    <Grid item xs={12} margin="auto" marginBottom="20px">
                        <Typography className={classes.textBold}>{t('question20')}</Typography>
                    </Grid>
                    {!formData.resume && (
                        <Grid item xs={12} margin="auto" textAlign="center" minHeight="45px">
                            <StyledBtnComponent
                                title={t('resume')}
                                handleOnClick={() => setIsFileUpLoadOpen(true)}
                                classesName={classes.btnBlue}
                            />
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
                    {formData.resume && (
                        <Grid item xs={12} margin="auto" textAlign="center" minHeight="45px" marginTop="10px">
                            <Grid container textAlign="center" margin="auto">
                                <Grid item xs={6} paddingLeft="50px">
                                    {formData.resume && formData.resume.name && (
                                        <Link
                                            href={getResumeUrl(formData.resume)}
                                            underline="none"
                                            color="inherit"
                                            download={formData.resume.name}>
                                            {formData.resume.name}
                                        </Link>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledBtnComponent
                                        title={t('delete')}
                                        handleOnClick={handleChange('deleteResume')}
                                        classesName={classes.btnRed}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12} margin="auto" textAlign="center" minHeight="45px" marginTop="10px">
                        <Grid container>
                            <Grid item xs={12} paddingLeft="25px">
                                <Typography className={classes.text}>{t('localizationMsg')}</Typography>
                            </Grid>
                            <Grid item xs={2} margin="auto">
                                <Checkbox
                                    id="agreementLocalization"
                                    checked={formData?.agreementLocalization}
                                    aria-label="agreementLocalization"
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                    onClick={handleChange('localizationAgreement')}
                                />
                            </Grid>
                            <Grid item xs={10} margin="auto" textAlign="left">
                                <Typography component="span" className={classes.text}>
                                    {t('localizationAgreement')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {msgErr?.get('localization') && (
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: 'red',
                                    textAlign: 'start',
                                    paddingLeft: '24px',
                                    paddingTop: '4px',
                                }}>
                                {msgErr?.get('localization')}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            );
        }
        default:
            return (
                <Grid container>
                    <Grid item xs={12} />
                </Grid>
            );
    }
};

export default ContentStepsContract;
