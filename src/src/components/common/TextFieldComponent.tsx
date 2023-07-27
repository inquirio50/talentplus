import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormHelperText, IconButton, InputAdornment, TextField, Theme } from '@mui/material';
import { createStyles, makeStyles, withStyles } from '@mui/styles';
import React, { useState } from 'react';

interface TextFieldComponentProps {
    id: string;
    name: string;
    label?: string;
    value?: string;
    handleChange?: any;
    error?: any;
    required?: boolean;
    multiline?: boolean;
    placeholder?: string;
    type?: string;
    autoCompleteInput?: string;
    disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        color: theme.palette.baseColorTxt,
        fontSize: '0.9rem',
        padding: '0.65rem 0.9rem',
    },
    errorMsg: {
        color: 'red',
        paddingLeft: 15,
    },
}));

const CssTextField = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiInputLabel-root': {
                top: -5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '80%',
                height: '100%',
            },
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: theme.palette.baseColor,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.baseColor,
                },
            },
        },
    })
)(TextField);
const TextFieldComponent = ({
    id,
    name,
    label,
    value,
    handleChange,
    error,
    required,
    multiline,
    placeholder,
    type,
    autoCompleteInput,
    disabled,
    ...propsInput
}: TextFieldComponentProps) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <CssTextField
                id={id}
                name={name}
                label={label}
                value={value || ''}
                onChange={handleChange}
                variant="outlined"
                error={error && error.get(id) !== undefined}
                fullWidth
                className={classes.textField}
                InputProps={{
                    ...propsInput,
                    classes: {
                        input: classes.input,
                    },
                    endAdornment:
                        type === 'password' ? (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClick} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                }}
                color="secondary"
                required={required}
                multiline={multiline}
                minRows={4}
                maxRows={6}
                placeholder={placeholder}
                type={showPassword ? 'text' : type}
                autoComplete={autoCompleteInput}
                disabled={disabled}
            />
            {error && error.get(id) && (
                <FormHelperText classes={{ root: classes.errorMsg }}>{error.get(id)}</FormHelperText>
            )}
        </>
    );
};

TextFieldComponent.defaultProps = {
    label: null,
    error: null,
    required: false,
    multiline: false,
    handleChange: null,
    value: '',
    placeholder: null,
    type: 'text',
    autoCompleteInput: null,
    disabled: false,
};

export default TextFieldComponent;
