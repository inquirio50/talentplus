/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { TextField } from '@mui/material';
import { createStyles, withStyles } from '@mui/styles';

const StaticDatePickerCustom = withStyles(() =>
    createStyles({
        root: {
            width: '100%',
        },
        '& .MuiCalendarPicker-root': {
            width: '100%',
        },
    })
)(StaticDatePicker);

const CalendarDashBoard = () => {
    const [currentDay, setCurrent] = React.useState<Date | null>();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePickerCustom
                displayStaticWrapperAs="desktop"
                label="Calendar"
                value={currentDay}
                onChange={(newValue: any) => {
                    setCurrent(newValue);
                }}
                renderInput={(params: any) => <TextField {...params} sx={{ width: '100%', root: { width: '100%' } }} />}
                inputFormat="DD/MM/YYYY"
                orientation="portrait"
            />
        </LocalizationProvider>
    );
};

export default CalendarDashBoard;
