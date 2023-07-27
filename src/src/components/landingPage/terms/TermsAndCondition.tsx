import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer';
import Header from '../Header';

import '../styles/content/Terms.scss';
import EnTermsAndConditions from './en/EnTermsAndConditions';
import FrTermsAndConditions from './fr/FrTermsAndConditions';

const TermsAndCondition = () => {
    const { i18n, t } = useTranslation();

    const renderContent = () => {
        switch (i18n.language) {
            case 'en':
                return <EnTermsAndConditions />;

            case 'fr':
                return <FrTermsAndConditions />;

            default:
                return null;
        }
    };

    return (
        <main className="terms">
            <Header />

            <header className="terms__header">
                <h1 className="terms__heading">{t('termsAndConditions')}</h1>
            </header>

            {renderContent()}

            <Footer />
        </main>
    );
};

export default TermsAndCondition;
