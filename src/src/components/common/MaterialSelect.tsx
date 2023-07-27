import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MaterialSelect = ({ id, options, form, placeholder, isMulti, initValues }: any) => {
    const [value, setValue] = React.useState<string[]>(initValues || []);

    const handleChange = (e: any) => {
        const targetValue = e.target.value;

        setValue(typeof targetValue === 'string' ? targetValue.split(',') : targetValue);
        form.setFieldValue(id, targetValue);
    };

    const handleDelete = (e: React.MouseEvent, currentValue: string) => {
        e.preventDefault();
        const newValue = value.filter((val) => val !== currentValue);
        setValue(newValue);
        form.setFieldValue(id, newValue);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: '100%', margin: 0 }}>
                <InputLabel>{placeholder}</InputLabel>
                <Select
                    multiple={isMulti}
                    label={placeholder}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    input={<OutlinedInput id="select-multiple-chip" label={placeholder} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((val) => {
                                const option = options.find((o: any) => o.value === val);
                                return (
                                    <Chip
                                        key={val}
                                        clickable
                                        label={option?.label}
                                        deleteIcon={
                                            isMulti ? (
                                                <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
                                            ) : (
                                                <div />
                                            )
                                        }
                                        onDelete={(e) => handleDelete(e, val)}
                                    />
                                );
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}>
                    {options.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MaterialSelect;
