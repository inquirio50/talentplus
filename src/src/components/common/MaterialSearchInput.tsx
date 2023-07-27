import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import { TextField } from '@mui/material';
import { Address } from '../../models/address';
import { geAddressFromPlace } from '../helpers/utilityFunctions';

interface LocationSearchInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    form: any;
    error: any;
}

const MaterialSearchInput = ({ id, name, label, value, form, error }: LocationSearchInputProps) => {
    const [address, setAddress] = useState(value);

    const handleChangeAddress = (newAddress: string) => {
        setAddress(newAddress);
    };

    const handleAddress = async (newAddress: string, placeId: string) => {
        const [place] = await geocodeByPlaceId(placeId);
        const addressNew: Address | null = geAddressFromPlace(place);
        form.setFieldValue(id, addressNew || '');
        setAddress(newAddress);
    };

    return (
        <PlacesAutocomplete value={address} onChange={handleChangeAddress} onSelect={handleAddress}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <TextField
                        fullWidth
                        id={id}
                        name={name}
                        label={label}
                        error={error !== null}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}>
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default MaterialSearchInput;
