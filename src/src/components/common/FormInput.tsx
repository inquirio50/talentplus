/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

type PasswordInputProps = {
    name: string | undefined;
    placeholder: string | undefined;
    refCallback: any;
    errors: any;
    register: any;
    className: any;
};

/* Password Input */
const PasswordInput = ({ name, placeholder, refCallback, errors, register, className }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup className="mb-0">
            <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                name={name}
                id={name}
                as="input"
                ref={(r: any) => {
                    if (refCallback) refCallback(r);
                }}
                className={className}
                isInvalid={!!(errors && name && errors[name])}
                {...(register ? register(name) : {})}
                autoComplete={name}
            />
            <div
                className={classNames('input-group-text', 'input-group-password', {
                    'show-password': showPassword,
                })}
                data-password={showPassword ? 'true' : 'false'}>
                <div
                    aria-label="Mute volume"
                    className="password-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    role="button"
                />
            </div>
        </InputGroup>
    );
};

type FormInputProps = {
    label?: any;
    type?: string;
    name?: string;
    placeholder?: string;
    register?: any;
    errors?: any;
    className?: string;
    labelClassName?: string;
    containerClass?: string;
    refCallback?: any;
    children?: any;
    control?: any;
    onClick?: any;
    checked?: boolean;
};

const FormInputPropsDefault = {
    label: '',
    type: '',
    name: '',
    placeholder: '',
    register: null,
    errors: null,
    className: '',
    labelClassName: '',
    containerClass: '',
    refCallback: null,
    children: null,
    control: null,
    onClick: null,
    checked: false,
};

const FormInput = ({
    label,
    type,
    name,
    placeholder,
    register,
    errors,
    className,
    labelClassName,
    containerClass,
    refCallback,
    children,
    onClick,
    checked,
    ...otherProps
}: FormInputProps) => {
    // handle input type
    const selectOrInput = type === 'select' ? 'select' : 'input';
    const comp = type === 'textarea' ? 'textarea' : selectOrInput;
    const commonType = type !== 'hidden' && type !== 'password' && type !== 'checkbox' && type !== 'radio';
    return (
        <div>
            {type === 'hidden' && (
                <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
            )}
            {type === 'password' && (
                <Form.Group className={containerClass}>
                    {label ? (
                        <>
                            {' '}
                            <Form.Label className={labelClassName}>{label}</Form.Label> {children}{' '}
                        </>
                    ) : null}
                    <PasswordInput
                        name={name}
                        placeholder={placeholder}
                        refCallback={refCallback}
                        errors={errors}
                        register={register}
                        className={className}
                    />

                    {errors && name && errors[name] ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {name && errors[name].message}
                        </Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            )}
            {(type === 'checkbox' || type === 'radio') && (
                <Form.Group className={containerClass}>
                    <Form.Check
                        type={type}
                        label={label}
                        name={name}
                        id={name}
                        ref={(r: any) => {
                            if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={!!(errors && name && errors[name])}
                        {...(register ? register(name) : {})}
                        {...otherProps}
                    />

                    {errors && name && errors[name] ? (
                        <Form.Control.Feedback type="invalid">{name && errors[name].message}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            )}
            {(!type || commonType) && (
                <Form.Group className={containerClass}>
                    {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        id={name}
                        as={comp}
                        ref={(r: any) => {
                            if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={!!(errors && name && errors[name])}
                        {...(register ? register(name) : {})}
                        {...otherProps}
                        autoComplete={name}>
                        {children || null}
                    </Form.Control>

                    {errors && name && errors[name] ? (
                        <Form.Control.Feedback type="invalid">{name && errors[name].message}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            )}
        </div>
    );
};

FormInput.defaultProps = FormInputPropsDefault;

export default FormInput;
