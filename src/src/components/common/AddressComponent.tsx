/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { CircularProgress, MenuItem, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import TextFieldComponent from './TextFieldComponent';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        overflowY: 'scroll',
        maxHeight: 400,
        maxWidth: 554,
        left: 0,
        right: 0,
        marginLeft: 8,
        backgroundColor: '#f2f2f2',
        boxShadow: 'none',
    },
    suggestions: {
        backgroundColor: '#d3d3d3',
        cursor: 'pointer',
    },
    suggestionsActive: {
        backgroundColor: theme.palette.common.white,
        cursor: 'pointer',
    },
}));

interface SuggestionRenderProps {
    suggestion: any;
    index: number;
    getSuggestionItemProps: any;
}

const SuggestionRender = ({ suggestion, index, getSuggestionItemProps }: SuggestionRenderProps) => {
    const classes = useStyles();
    const newKey = `sugggestion_ind${index}`;
    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
    const style = suggestion.active ? classes.suggestions : classes.suggestionsActive;

    return (
        <MenuItem
            {...getSuggestionItemProps(suggestion, {
                className,
                style,
            })}
            key={newKey}
            selected={suggestion.active}
            component="div"
            style={{
                fontWeight: suggestion.active ? 500 : 400,
            }}>
            {suggestion.description}
        </MenuItem>
    );
};

interface LocationSearchInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    error: Map<String, String>;
    classes?: any;
    handleChange: any;
}

const LocationSearchInput = ({ id, name, label, value, handleChange, error }: LocationSearchInputProps) => {
    const classes = useStyles();
    return (
        <PlacesAutocomplete value={value} onChange={handleChange} onSelect={handleChange}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <TextFieldComponent
                        id={id}
                        name={name}
                        label={label}
                        error={error}
                        required
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <CircularProgress />}
                        {suggestions.length > 0 ? (
                            <Paper className={classes.paper}>
                                {suggestions.map((suggestion, index) => {
                                    const newKey = `${index}_key_${suggestion}`;
                                    return (
                                        <SuggestionRender
                                            key={newKey}
                                            suggestion={suggestion}
                                            index={index}
                                            getSuggestionItemProps={getSuggestionItemProps}
                                        />
                                    );
                                })}
                            </Paper>
                        ) : null}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

LocationSearchInput.defaultProps = {
    classes: null,
};

export default LocationSearchInput;
