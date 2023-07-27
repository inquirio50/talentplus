import React, { useEffect, useState } from 'react';
import { Box, Chip, FormControl, Typography, InputLabel, MenuItem, OutlinedInput, Select, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CommonTypeOptions } from '../helpers/typeOptions';

const useStyles: any = makeStyles((theme: Theme) => ({
    formControl: {
        width: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5,
    },
    chip: {
        margin: 2,
    },
    rootInputLabel: {
        paddingLeft: 10,
    },
    rootInput: {
        padding: '25px 16px 7px 7px',
    },
    rootInputWithValue: {
        padding: '13px 16px 7px 7px',
    },
    select: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.baseColor,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.baseColor,
        },
    },
    errorMsg: {
        color: 'red',
        paddingLeft: 15,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    MenuListProps: {
        sx: {
            '& .MuiMenuItem-root': {
                whiteSpace: 'normal',
            },
        },
    },
};

interface SelectComponentProps {
    id: string;
    label: string;
    multiple?: boolean;
    handleChange?: any;
    currentValue: string;
    options: CommonTypeOptions[];
    errorMsg?: Map<String, String>;
    placeHolder: string;
}

const SelectComponent = ({
    id,
    label,
    multiple,
    handleChange,
    currentValue,
    options,
    errorMsg,
    placeHolder,
}: SelectComponentProps) => {
    const classes = useStyles();
    const [err, setErr] = useState(errorMsg?.get(id));
    const defaultValue = (value: string) => {
        if (value && value.includes(',')) {
            return value.split(',');
        }
        if (value) {
            return [value.trim()];
        }
        return multiple ? [] : '';
    };
    
    useEffect(() => {
        setErr(errorMsg && errorMsg.get(id));
    }, [errorMsg, errorMsg && errorMsg.get(id), currentValue]);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label" color="secondary" classes={{ root: classes.rootInputLabel }}>
                {label}
            </InputLabel>
            <Select
                className={classes.select}
                autoFocus={false}
                multiple={multiple}
                label={label}
                value={defaultValue(currentValue)}
                onChange={handleChange}
                color="secondary"
                placeholder={placeHolder}
                error={errorMsg && err !== null && err !== undefined}
                input={
                    <OutlinedInput
                        id="select-multiple-chip"
                        label={label}
                        placeholder={placeHolder}
                        classes={{
                            input:
                                defaultValue(currentValue) === '' || defaultValue(currentValue).length === 0
                                    ? classes.rootInput
                                    : classes.rootInputWithValue,
                        }}
                    />
                }
                renderValue={(selected) => (
                    <Box className={classes.chips}>
                        {selected &&
                            (selected as string[]).map((value: string) => {
                                const option = options.find((o) => o.value === value.trim());
                                return <Chip key={value} label={option?.label} className={classes.chip} />;
                            })}
                    </Box>
                )}
                MenuProps={MenuProps}>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            {err && <Typography className={classes.errorMsg}>{err}</Typography>}
        </FormControl>
    );
};

SelectComponent.defaultProps = {
    multiple: false,
    handleChange: null,
    errorMsg: null,
};

export default SelectComponent;
