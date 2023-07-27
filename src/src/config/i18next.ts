/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/en.json';
import es from './locales/es/es.json';
import fr from './locales/fr/fr.json';

const options = {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
};

const i18nOptions: any = {
    fallbackLng: 'en',
    detection: options,
    debug: false,
    resources: {
        en: { translation: en },
        fr: { translation: fr },
        es: { translation: es },
    },
    interpolation: {
        escapeValue: false,
    },
    react: {
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        useSuspense: true,
        omitBoundRerender: false,
    },
};

i18next.use(LanguageDetector).use(initReactI18next).init(i18nOptions);

export default i18next;
