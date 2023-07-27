import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Education } from '../../models/education';
import { DeleteIcon, EditIcon } from '../icons/Icons';
import PersonalEducation from './PersonalEducation';

const useStyles: any = makeStyles(() => ({
    title: {
        fontSize: '18px',
        fontWeight: '700',
    },
    subTitle: {
        fontSize: '15px',
        fontWeight: '700',
    },
}));

const styles = {
    container: {
        width: '800px',
        top: '0px',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        p: 4,
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

const EducationDisplay = ({
    educations,
    handleEdit,
    handleDelete,
}: {
    educations: Education[];
    handleEdit: any;
    handleDelete: any;
}) => {
    const classes = useStyles();

    const [isOpenPersonalEducation, setIsOpenPersonalEducation] = useState(false);
    const [currentEducation, setCurrentEducation] = useState<any>(undefined);

    return (
        <Grid container>
            {educations &&
                educations.map((education: Education) => (
                    <Grid key={education.id} item xs={12} className="profile" padding={2}>
                        <Grid container>
                            <Grid item lg={11} md={11} xs={10}>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Typography className={classes.title}>{education.degree}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>
                                            {education.startYear} - {education.endYear}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.subTitle}>
                                            {education.institutionName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={0.5} md={0.5} xs={1} textAlign="right" sx={styles.edit}>
                                <DeleteIcon fontSize="small" onClick={handleDelete(education.id)} />
                            </Grid>
                            <Grid item lg={0.5} md={0.5} xs={1} textAlign="right" sx={styles.edit}>
                                <EditIcon
                                    fontSize="small"
                                    onClick={() => {
                                        setIsOpenPersonalEducation(true);
                                        setCurrentEducation(education);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={styles.gridLine} marginTop={1} />
                    </Grid>
                ))}
            {isOpenPersonalEducation && currentEducation && (
                <PersonalEducation
                    handleUpdateProfile={handleEdit}
                    education={currentEducation}
                    isOpen={isOpenPersonalEducation}
                    onClose={() => setIsOpenPersonalEducation(!isOpenPersonalEducation)}
                />
            )}
        </Grid>
    );
};

export default EducationDisplay;
