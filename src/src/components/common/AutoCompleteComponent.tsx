/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { CommonTypeOptions } from '../helpers/typeOptions';

const useStyles: any = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.baseColor,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.baseColor,
            },
        },
    },
    input: {
        color: theme.palette.baseColorTxt,
        fontSize: '0.9rem',
        padding: '0.45rem 0.9rem',
    },
    errorMsg: {
        color: 'red !important',
        paddingLeft: '15px',
        paddingTop: '5px',
    },
}));

interface AutoCompleteComponentProps {
    id: string;
    label: string;
    defaultValue: CommonTypeOptions[];
    options: CommonTypeOptions[];
    handleChange: any;
    multiple: boolean;
    currValue?: CommonTypeOptions[];
    placeholder?: string;
    errorMsg?: Map<String, String>;
}

const AutoCompleteComponent = ({
    id,
    label,
    defaultValue,
    options,
    handleChange,
    multiple,
    currValue,
    placeholder,
    errorMsg,
}: AutoCompleteComponentProps) => {
    const classes = useStyles();
    const [err, setErr] = useState(errorMsg?.get(id));

    useEffect(() => {
        setErr(errorMsg && errorMsg.get(id));
    }, [errorMsg, errorMsg && errorMsg.get(id), currValue]);
    return (
        <>
            <Autocomplete
                fullWidth
                sx={{
                    display: 'inline-block',
                    '& input': {
                        color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
                    },
                }}
                className={classes.root}
                color="secondary"
                multiple={multiple}
                id={id}
                onChange={handleChange}
                defaultValue={defaultValue}
                options={options}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                filterSelectedOptions
                renderInput={(props) => (
                    <TextField
                        {...props}
                        fullWidth
                        sx={{ input: classes.input }}
                        color="secondary"
                        label={label}
                        placeholder={placeholder}
                    />
                )}
                /* renderOption={(props, option) => (
                <Tooltip title="test" sx={{ marginTop: -4 }}>
                    <Typography sx={{ paddingLeft: 2, paddingBottom: 2 }}>{option.label}</Typography>
                </Tooltip>
            )} */
                value={currValue}
            />
            {err && <Typography className={classes.errorMsg}>{err}</Typography>}
        </>
    );
};

AutoCompleteComponent.defaultProps = {
    currValue: null,
    placeholder: null,
    errorMsg: null,
};

export default AutoCompleteComponent;
