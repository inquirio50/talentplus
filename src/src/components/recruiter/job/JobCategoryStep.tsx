import React, { useState } from 'react';
import { Box, Button, Card, Radio, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from '../../icons/Icons';
import { CONTRACTOR, EMPLOYEE } from '../../../config/constants';

interface JobCategoryStepProps {
    onBack: any;
    onNext: any;
}

const JobCategoryStep = ({ onBack, onNext, ...other }: JobCategoryStepProps) => {
    const { t } = useTranslation();
    const typeOptions = [
        {
            description: t('Limited-time projects with highly experienced individuals'),
            title: t('Contractor'),
            value: CONTRACTOR,
        },
        {
            description: t('Unlimited term contracts'),
            title: t('Employee'),
            value: EMPLOYEE,
        },
    ];
    const [type, setType] = useState(typeOptions[1].value);

    const handleChange = (newType: any) => {
        setType(newType);
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div {...other}>
            <Typography variant="h6">{t('I’m looking for...')}</Typography>
            <Box sx={{ mt: 3 }}>
                {typeOptions.map((typeOption) => (
                    <Box key={typeOption.value} sx={{ mb: 2 }}>
                        <Card
                            key={typeOption.value}
                            sx={{
                                alignItems: 'center',
                                cursor: 'pointer',
                                display: 'flex',
                                p: 2,
                                ...(type === typeOption.value && {
                                    borderColor: 'primary.main',
                                    borderWidth: 2,
                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                    m: '-1px',
                                }),
                            }}
                            onClick={() => handleChange(typeOption.value)}
                            variant="outlined">
                            <Radio checked={type === typeOption.value} color="primary" />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle1">{typeOption.title}</Typography>
                                <Typography color="textSecondary" variant="body2">
                                    {typeOption.description}
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Box>
            <Button endIcon={<ArrowRight fontSize="small" />} onClick={() => onNext(type)} variant="contained">
                {t('Continue')}
            </Button>
        </div>
    );
};

export default JobCategoryStep;
