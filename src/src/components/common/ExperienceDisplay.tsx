import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getOptionsLabeled, TYPE_MONTH_OPTIONS } from '../helpers/typeOptions';
import { DeleteIcon, EditIcon } from '../icons/Icons';
import { Experience } from '../../models/experience';
import ProfessionalExperience from './ProfessionalExperience';

const useStyles: any = makeStyles(() => ({
    title: {
        fontSize: '18px',
        fontWeight: '700',
    },
    subTitle: {
        fontSize: '15px',
        fontWeight: '700',
    },
    gridValue: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '18px',

        color: 'rgba(0, 0, 0, 0.8)',
    },
    gridTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',

        color: '#000000',
    },
}));

const styles = {
    item20: { height: '10%' },
    item80: { height: '90%', borderRadius: '5px', marginTop: 2 },

    subItem20: { height: '30%' },
    subItem80: { height: '70%', marginTop: 2 },

    container: {
        width: '800px',
        top: '0px',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        P: 4,
        background: '#FFFFFF',
        boxShadow: '4px 5px 8px rgba(0, 0, 0, 0.08), -5px -5px 8px rgba(0, 0, 0, 0.04)',
    },

    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '29px',
        color: '#000000',
    },

    edit: {
        cursor: 'pointer',
    },

    gridLine: {
        borderBottom: '0.5px solid #E8E8E8',
    },
};

const ExperienceDisplay = ({
    experiences,
    handleEdit,
    handleDelete,
}: {
    experiences: Experience[];
    handleEdit: any;
    handleDelete: any;
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [isOpenProfessionalExperience, setIsOpenProfessionalExperience] = useState(false);
    const [currentExperience, setCurrentExperience] = useState<any>(undefined);

    const displayExperienceDate = (date: any) => {
        const monthOptions = getOptionsLabeled(TYPE_MONTH_OPTIONS, t);

        const dateConverted = date ? new Date(date) : null;
        if (!dateConverted || (date && date.toString().includes('1900-01-01'))) return 'actual';
        const monthFound: any = monthOptions[dateConverted.getMonth()];

        const monthString = t(monthFound.label);
        const yearString = dateConverted.getFullYear();
        return `${monthString}/${yearString}`;
    };

    return (
        <Grid container>
            {experiences &&
                experiences.map((experience: Experience) => (
                    <Grid key={experience.id} item xs={12} className="profile" padding={2}>
                        <Grid container>
                            <Grid item lg={11} md={11} xs={10}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={classes.gridTitle}>{experience.title}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.gridValue}>{experience.companyName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} marginTop={1}>
                                        <Typography className={classes.gridTitle}>{t('Date')}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {`${displayExperienceDate(
                                                experience.startingDate
                                            )} - ${displayExperienceDate(experience.endingDate)}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>{experience.description}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={0.5} md={0.5} xs={1} textAlign="right" sx={styles.edit}>
                                <DeleteIcon fontSize="small" onClick={handleDelete(experience.id)} />
                            </Grid>
                            <Grid item lg={0.5} md={0.5} xs={1} textAlign="right" sx={styles.edit}>
                                <EditIcon
                                    fontSize="small"
                                    onClick={() => {
                                        setIsOpenProfessionalExperience(true);
                                        setCurrentExperience(experience);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={styles.gridLine} marginTop={1} />
                    </Grid>
                ))}
            {isOpenProfessionalExperience && currentExperience && (
                <ProfessionalExperience
                    handleUpdateProfile={(newProfile: any) => handleEdit(newProfile)}
                    experience={currentExperience}
                    isOpen={isOpenProfessionalExperience}
                    onClose={() => setIsOpenProfessionalExperience(!isOpenProfessionalExperience)}
                />
            )}
        </Grid>
    );
};

export default ExperienceDisplay;
