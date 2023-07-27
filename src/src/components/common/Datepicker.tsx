import React, { forwardRef } from 'react';
// import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import DatePicker from 'react-datepicker';
// import {fr, en} from "date-fns/locale";
import en from 'date-fns/locale/en-US';
import fr from 'date-fns/locale/fr-CA';
import { useTranslation } from 'react-i18next';

// registerLocale("fr", fr);
// registerLocale("en", en);
// registerLocale("en", en);

type DatepickerInputProps = {
    onClick?: any;
    value?: string;
};

/* Datepicker with Input */
const DatepickerInput = forwardRef((props: DatepickerInputProps, ref: any) => {
    const onDateValueChange = () => {
        // console.log('date value changed');
    };
    return (
        <input
            type="text"
            className="form-control date"
            onClick={props.onClick}
            value={props.value}
            onChange={onDateValueChange}
            ref={ref}
        />
    );
});

DatepickerInput.defaultProps = {
    onClick: null,
    value: '',
};

type DatepickerInputWithAddonProps = {
    onClick?: any;
    value?: string;
};
/* Datepicker with Addon Input */
const DatepickerInputWithAddon = forwardRef((props: DatepickerInputWithAddonProps, ref) => (
    <div className="input-group" ref={ref as React.RefObject<HTMLDivElement>}>
        <input
            type="text"
            className="form-control form-control-light"
            onClick={props.onClick}
            value={props.value}
            readOnly
        />
        <div className="input-group-append">
            <span className="input-group-text bg-primary border-primary text-white">
                <i className="mdi mdi-calendar-range font-13" />
            </span>
        </div>
    </div>
));

DatepickerInputWithAddon.defaultProps = {
    onClick: null,
    value: '',
};

type HyperDatepickerProps = {
    value: Date;
    onChange: (date: any) => void;
    hideAddon?: boolean;
    inputClass?: string;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    showTimeSelect?: boolean;
    tI?: number;
    timeCaption?: string;
    showTimeSelectOnly?: boolean;
    monthsShown?: number;
    inline?: boolean;
};

const HyperDatepicker = (props: HyperDatepickerProps) => {
    // handle custom input
    // eslint-disable-next-line react/destructuring-assignment
    const input = (props.hideAddon || false) === true ? <DatepickerInput /> : <DatepickerInputWithAddon />;
    const { i18n } = useTranslation();
    let locale = en;
    if (i18n.language === 'fr') locale = fr;

    return (
        <DatePicker
            customInput={input}
            locale={locale}
            // eslint-disable-next-line react/destructuring-assignment
            timeIntervals={props.tI}
            // eslint-disable-next-line react/destructuring-assignment
            className={classNames('form-control', props.inputClass)}
            // eslint-disable-next-line react/destructuring-assignment
            selected={props.value}
            // eslint-disable-next-line react/destructuring-assignment
            onChange={(date) => props.onChange(date)}
            // eslint-disable-next-line react/destructuring-assignment
            showTimeSelect={props.showTimeSelect}
            timeFormat="hh:mm a"
            // eslint-disable-next-line react/destructuring-assignment
            timeCaption={props.timeCaption}
            // eslint-disable-next-line react/destructuring-assignment
            dateFormat={props.dateFormat || 'MM/dd/yyyy'}
            // eslint-disable-next-line react/destructuring-assignment
            minDate={props.minDate}
            // eslint-disable-next-line react/destructuring-assignment
            maxDate={props.maxDate}
            // eslint-disable-next-line react/destructuring-assignment
            monthsShown={props.monthsShown}
            // eslint-disable-next-line react/destructuring-assignment
            showTimeSelectOnly={props.showTimeSelectOnly}
            // eslint-disable-next-line react/destructuring-assignment
            inline={props.inline}
            autoComplete="off"
        />
    );
};

HyperDatepicker.defaultProps = {
    hideAddon: false,
    inputClass: null,
    dateFormat: null,
    minDate: null,
    maxDate: null,
    showTimeSelect: false,
    tI: null,
    timeCaption: '',
    showTimeSelectOnly: false,
    monthsShown: null,
    inline: false,
};

export default HyperDatepicker;
