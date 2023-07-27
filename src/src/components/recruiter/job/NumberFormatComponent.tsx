import React from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatComponent = React.forwardRef((props: any) => {
    const { inputRef, onChange } = props;

    return (
        <NumberFormat
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
        />
    );
});

export default NumberFormatComponent;
