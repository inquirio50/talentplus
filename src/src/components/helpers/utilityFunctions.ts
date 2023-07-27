import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeFr from 'dayjs/locale/fr-ca';
import utc from 'dayjs/plugin/utc';
import { AsYouType } from 'libphonenumber-js';
import { Location } from 'react-router-dom';
import { Breakpoint, Theme, useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import DOMPurify from 'dompurify';
import { PERMANENT_ROLE, CONFIRM_PASSWORD, PASSWORD, CONSULTANT_ROLE } from '../../config/constants';
import { Address } from '../../models/address';
import i18next from '../../config/i18next';
import {
    CommonTypeOptions,
    EXPERIENCE_OPTIONS,
    getOptionsLabeled,
    TYPE_OF_WORK_OPTIONS,
    TYPE_SKILLS_OPTIONS,
} from './typeOptions';
import { Skills } from '../../models/skills';
import RegisterBg1 from '../../assets/images/register_bg1.png';
import RegisterBg2 from '../../assets/images/register_bg2.png';
import RegisterBg3 from '../../assets/images/register_bg3.png';
import RegisterBg4 from '../../assets/images/register_bg4.png';
import RegisterBg5 from '../../assets/images/register_bg5.png';
import RegisterBg6 from '../../assets/images/register_bg6.png';
import RegisterBg7 from '../../assets/images/register_bg7.png';
import RegisterBg8 from '../../assets/images/register_bg8.png';
import { Profile } from '../../models/profile';
import User from '../../models/user';

// Adding plugin to DayJS
dayjs.extend(relativeTime);
dayjs.extend(utc);

const getDayJsLocale = (date: Date | null): any =>
    dayjs(date)
        .utc(true)
        .locale(i18next.resolvedLanguage === 'fr' ? localeFr : 'en');

export const formatPhoneNumberDisplay = (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber === '') {
        return '';
    }
    const phoneNumberFormated: string = new AsYouType('CA').input(phoneNumber);
    return phoneNumberFormated;
};

export const removeFormatPhone = (phoneNumber: string) => phoneNumber.replace(/\D+/g, '');

export const getAddressDisplay = (address: Address | undefined) => {
    if (!address) return '';
    let displayAddress = address.street;
    if (address.city) {
        displayAddress = `${displayAddress}, ${address.city}`;
    }
    if (address.province) {
        displayAddress = `${displayAddress}, ${address.province}`;
    }
    if (address.country) {
        displayAddress = `${displayAddress}, ${address.country}`;
    }
    return displayAddress;
};

export const geAddressFromPlace = (place: any): Address | null => {
    if (place !== null) {
        let street = '';
        let number = '';
        let city = '';
        let province = '';
        let country = '';
        let postalCode = '';
        const compondAddress: any[] = place.address_components;
        compondAddress.forEach((c: any) => {
            const value = c.long_name;
            if (c.types.includes('street_number')) {
                number = value;
            } else if (c.types.includes('route')) {
                street = value;
            } else if (c.types.includes('administrative_area_level_2')) {
                city = value;
            } else if (c.types.includes('administrative_area_level_1')) {
                province = value;
            } else if (c.types.includes('country')) {
                country = value;
            } else if (c.types.includes('postal_code')) {
                postalCode = value;
            }
        });
        const address: Address = {
            street: `${number} ${street}`,
            province,
            country,
            city,
            postalCode,
        };
        return address;
    }
    return null;
};

export const getAddressString = (address?: Address) => {
    let addressString = address ? `${address?.street || ''}` : '';
    if (addressString && addressString !== '') {
        addressString = `${addressString}${address?.city ? `, ${address?.city}` : ''}`;
    }
    if (addressString && addressString !== '') {
        addressString = `${addressString}${address?.province ? `, ${address?.province}` : ''}`;
    }
    if (addressString && addressString !== '') {
        addressString = `${addressString}${address?.country ? `, ${address?.country}` : ''}`;
    }
    return addressString;
};

export const convertStringToAddress = (value: string): Address => {
    if (!value.includes(',')) {
        return {
            street: value,
            city: '',
            province: '',
            country: '',
            postalCode: '',
        };
    }
    const addressArray = value.split(',');
    const address: Address = {
        street: addressArray.length !== 0 && addressArray[0] !== '' ? addressArray[0]?.trim() : '',
        city: addressArray.length !== 0 && addressArray[1] !== '' ? addressArray[1]?.trim() : '',
        province: addressArray.length !== 0 && addressArray[2] !== '' ? addressArray[2]?.trim() : '',
        country: addressArray.length !== 0 && addressArray[3] !== '' ? addressArray[3]?.trim() : '',
        postalCode: '',
    };
    return address;
};

export const convertSkillsForProfileDto = (skillOptions: CommonTypeOptions[]) => {
    const skills: Skills[] = [];
    skillOptions.forEach((option: CommonTypeOptions) => {
        const skill: Skills = {
            skill: option.value,
            domain: 'IT',
            id: '00000000-0000-0000-0000-000000000000',
        };
        skills.push(skill);
    });
    return skills;
};

export const convertDurationToDto = (duration: CommonTypeOptions | undefined): Map<number, string> => {
    const durationArray = new Map<number, string>();
    if (duration === undefined) return durationArray;
    if (duration.label.includes('IDontMind')) {
        durationArray.set(0, 'IDontMind');
        return durationArray;
    }
    durationArray.set(Number(duration.value), 'month');
    return durationArray;
};

export const getPaymentRateFormattedField = (startingRatePerHour: number, endingRatePerHour: number) => {
    const payValue =
        startingRatePerHour !== undefined && endingRatePerHour !== undefined
            ? [startingRatePerHour, endingRatePerHour]
            : [20, 30];
    return payValue;
};

export const getRangeDisplayAnnual = (value: number) => `${value} K`;
export const getRangeDisplayHR = (value: number) => `$${value} HR`;

export const getMarkRangeSlider = (payRange: number[], maxRange: number): any[] => {
    const sliderTxt: any[] = [];
    let initial = 0;
    while (initial < maxRange) {
        sliderTxt.push({
            value: initial,
            label: `${initial}`,
        });
        initial += 20;
        if (initial - 20 < payRange[0] && initial > payRange[0]) {
            sliderTxt.push({
                value: payRange[0],
                label: `${payRange[0]}`,
            });
        }
        if (payRange[1] < maxRange && initial - 20 < payRange[1] && initial > payRange[1]) {
            sliderTxt.push({
                value: payRange[1],
                label: `${payRange[1]}`,
            });
        }
    }
    sliderTxt.push({
        value: maxRange,
        label: `${maxRange}+`,
    });
    return sliderTxt;
};

export const getTypeOfWorkDisplay = (typesOfWork: string, t: any) => {
    const optionsTypeOfWork = getOptionsLabeled(TYPE_OF_WORK_OPTIONS, t);
    const splitedTypes = typesOfWork.split(',');
    const types: any[] = [];
    splitedTypes.forEach((type) => {
        const optionFound: any = optionsTypeOfWork.find((o) => o.value === type.trim());
        types.push(optionFound.label);
    });
    return types.join(' ,');
};

export const getSkillsDisplay = (skill: Skills, t: any): any => {
    const optionsSkills = getOptionsLabeled(TYPE_SKILLS_OPTIONS, t);
    const skillFound = optionsSkills.find((s) => s.value === skill.skill);
    return skillFound?.label || '';
};

export const convertSkillsOptions = (skills: Skills[]): CommonTypeOptions[] => {
    if (skills && skills.length > 0) {
        const defaultSkills: Array<CommonTypeOptions> = [];
        skills.forEach((skill) => {
            if (skill.skill.trim() !== '') {
                defaultSkills.push({
                    label: skill.skill,
                    value: skill.skill,
                });
            }
        });
        return defaultSkills;
    }
    return [];
};

export const convertSkillsToString = (skills: Skills[]) => {
    let result = '';
    for (let i = 0; i < skills.length; i += 1) {
        if (i !== skills.length - 1) {
            result += `${skills[i].skill}, `;
        } else {
            result += skills[i].skill;
        }
    }

    return result;
};

export const getExperienceDisplay = (experience: any, t: any) => {
    const optionsExperience = getOptionsLabeled(EXPERIENCE_OPTIONS, t);
    const returnOption = optionsExperience.find((e: any) => e.value === experience);
    return returnOption?.label || t('noExperienceAdded');
};

export const uppercaseRegExp = /(?=.*?[A-Z])/;
export const lowercaseRegExp = /(?=.*?[a-z])/;
export const digitsRegExp = /(?=.*?[0-9])/;
export const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
export const minLengthRegExp = /.{6,}/;

export const passwordValidation = (password: string, confirmPassword: string, t: any): Map<string, string> => {
    const errMsg = new Map([
        [PASSWORD, ''],
        [CONFIRM_PASSWORD, ''],
    ]);
    if (password !== confirmPassword) {
        errMsg.set(CONFIRM_PASSWORD, t('passwordMatch'));
    }

    const passwordLength = password.length;
    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);
    if (passwordLength === 0) {
        errMsg.set(PASSWORD, t('passwordEmpty'));
    } else if (!uppercasePassword) {
        errMsg.set(PASSWORD, t('passwordUppercase'));
    } else if (!lowercasePassword) {
        errMsg.set(PASSWORD, t('passwordLowercase'));
    } else if (!digitsPassword) {
        errMsg.set(PASSWORD, t('passwordDigit'));
    } else if (!specialCharPassword) {
        errMsg.set(PASSWORD, t('passwordSpecialCharacter'));
    } else if (!minLengthPassword) {
        errMsg.set(PASSWORD, t('passwordShort'));
    }
    return errMsg;
};
export const emptyGuid = () => '00000000-0000-0000-0000-000000000000';

export const getWelcomeDayTime = () => {
    const currentHour: number = parseInt(getDayJsLocale(null).format('H'), 10);
    const isMorning: boolean = currentHour >= 4 && currentHour <= 12;
    const afterNoon = currentHour > 12 && currentHour <= 17 ? 'goodAfternoon' : 'goodEvening';
    const dayTime = isMorning ? 'goodMorning' : afterNoon;
    return dayTime;
};

export const getSizeCompanySelectValue = (cmpySize: string): string => {
    if (!cmpySize) return '';
    const sizeSlipt = cmpySize.split(' ');
    return sizeSlipt[1];
};

export const getUrlParams = (searchLocation: string): URLSearchParams => new URLSearchParams(searchLocation);

export const getHourFromStringToDisplay = (date: Date) => {
    const newDate = getDayJsLocale(date);
    newDate.locale(i18next.resolvedLanguage === 'fr' ? localeFr : 'en');
    return newDate.fromNow();
};

export const getDateHourDisplay = (date: Date) => {
    const newDate = getDayJsLocale(date);
    newDate.locale(i18next.resolvedLanguage === 'fr' ? localeFr : 'en');
    return newDate.format('YYYY-MM-DD HH:mm');
};

export const convertPlainToHtml = (description: string) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = description;
    return newDiv.textContent || newDiv.innerText || '';
};

export const calculateMatch = (
    enterprisePoints: number,
    experiencePoints: number,
    locationPoints: number,
    salaryPoints: number,
    skillPoints: number,
    total: number
): number => {
    // Total 100
    let totalPercentage = enterprisePoints + experiencePoints + locationPoints + salaryPoints + skillPoints;
    // totalPercentage = (totalPercentage * 100) / 174;
    // totalPercentage = Math.ceil(total);
    totalPercentage = total;
    return totalPercentage;
};

export const backgroundImg = (activeStep: number) => {
    let bg = RegisterBg1;
    switch (activeStep) {
        case 1:
        case 2:
            bg = RegisterBg2;
            break;
        case 3:
        case 4:
            bg = RegisterBg3;
            break;
        case 5:
        case 6:
            bg = RegisterBg4;
            break;
        case 7:
        case 8:
        case 9:
            bg = RegisterBg5;
            break;
        case 10:
        case 11:
        case 12:
            bg = RegisterBg6;
            break;
        case 13:
        case 14:
        case 15:
            bg = RegisterBg7;
            break;
        case 16:
        case 17:
        case 18:
            bg = RegisterBg8;
            break;
        default:
            break;
    }
    return bg;
};

export const getUserCoordinates = (location: Location, handleActiveLocation: any, handleSetError: any) => {
    const isBack = location.state as { isBack: boolean };
    if (!isBack) {
        const geolocationAPI = navigator.geolocation;
        if (!geolocationAPI) {
            handleSetError('localizationErr');
        } else {
            geolocationAPI.getCurrentPosition(
                () => {
                    handleActiveLocation();
                },
                () => handleSetError('localizationPerm')
            );
        }
    }
};

export const getResumeUrl = (resume: any) => {
    const fileType = resume.name.split('.')[1];
    const data = new Blob([resume], { type: `application/${fileType}` });
    return window.URL.createObjectURL(data);
};

export const convertCommonTypeToJson = (options: CommonTypeOptions[]): any[] | null => {
    if (options) {
        const jsonMsp: any[] = [];
        options.forEach((o: CommonTypeOptions) => {
            jsonMsp.push({
                value: o.value,
            });
        });
        return jsonMsp;
    }
    return null;
};

export const checkErrorMsg = (
    fieldToTest: string | CommonTypeOptions[] | undefined,
    fieldName: string,
    error: string,
    msgErr: Map<string, string>,
    setMsgErr: any
) => {
    if (
        fieldToTest === undefined ||
        fieldToTest === null ||
        (typeof fieldToTest === 'object' && (fieldToTest as CommonTypeOptions[]).length === 0) ||
        fieldToTest === ''
    ) {
        msgErr?.set(fieldName, error);
    } else {
        msgErr?.delete(fieldName);
    }
    setMsgErr(msgErr);
};

type BreakpointOrNull = Breakpoint | null;

export const useWidth = () => {
    const theme: Theme = useTheme();
    const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
};

export const formatSalary = (salary: string, type: string) => {
    if (!salary || salary === '') {
        return '';
    }
    const stripSalary = salary.split(' - ');
    if (type === PERMANENT_ROLE) {
        if (stripSalary[1]) {
            return `${stripSalary[0]}k - ${stripSalary[1]}k`;
        }
        return `${stripSalary[0]}k`;
    }
    return `${stripSalary[0]}/h - ${stripSalary[1]}/h`;
};

export const handleChangeQuestionnaire =
    (manageForm: any, type: string, valueSelected?: any) => (event: any, valueChange?: any) => {
        let value = null;
        if (event) {
            event.stopPropagation();
            value = event.target.value;
        }
        if (value && (value !== '0' || valueChange?.props?.value)) {
            manageForm(type, value);
        } else if (valueSelected) {
            manageForm(type, valueSelected as string);
        } else {
            manageForm(type, valueChange);
        }
    };

export const convertListToCommonType = (list: any[], value: string | Array<any>): CommonTypeOptions[] | undefined => {
    let newList: Array<CommonTypeOptions> = [];
    if (value && value !== '') {
        if (Array.isArray(value)) {
            return value.map((v) => ({ label: v.label, value: v.value } as CommonTypeOptions));
        }
        if (value.includes(',')) {
            const splitedValue = (value as string).split(',');
            splitedValue.forEach((v: string) => {
                const nV: CommonTypeOptions[] = list.filter((l: CommonTypeOptions) => l.value === v);
                if (nV) {
                    newList = newList.concat(nV);
                }
            });
        } else {
            const foundValue: any[] = list.filter((l: any) => l.value === value);
            if (foundValue && foundValue.length === 1) {
                newList.push({
                    label: foundValue[0].label,
                    value: foundValue[0].value,
                });
            }
        }
    }
    return newList;
};

// export const convertArrayCommonTypeOptionsToStringValue = (value: Array<any>) => value.map((v) => v.value).join(',');
export const convertArrayCommonTypeOptionsToStringValue = (value: Array<any>) => value.join(',');

export const getPercentageTotal = (profile: Profile, user: User): number => {
    let percentage = '0';
    if (profile && profile.percentage) {
        if (user.role === CONSULTANT_ROLE) {
            percentage = (
                (profile.percentage.personalInformation +
                    profile.percentage.professionalInformation +
                    profile.percentage.myPreferences +
                    (profile.percentage.paymentInformation || 0)) /
                4
            ).toFixed(1);
        }
        percentage = (
            (profile.percentage.personalInformation +
                profile.percentage.professionalInformation +
                profile.percentage.myPreferences) /
            3
        ).toFixed(1);
    }
    return Number(percentage);
};

export const getBenefits = (benefits: any): string => {
    if (benefits instanceof Array) {
        return benefits.map((b: CommonTypeOptions) => b.value).join(',');
    }
    return benefits;
};

export const isEmail = (string: string) => {
    const regex =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (string.match(regex)) {
        return true;
    }

    return false;
};

export const isEmpty = (value?: string | number) => typeof value === 'undefined' || String(value).trim() === '';

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */

export const sanitize = (content: string | Node) => {
    if (typeof window !== 'undefined') {
        // Running in the client-side browser
        return DOMPurify.sanitize(content);
    }
    // Running in the server-side environment
    return content;
};
