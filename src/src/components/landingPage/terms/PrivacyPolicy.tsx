import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer';
import Header from '../Header';

import '../styles/content/Terms.scss';
import EnPrivacyPolicy from './en/EnPrivacyPolicy';
import FrPrivacyPolicy from './fr/FrPrivacyPolicy';

const PrivacyPolicy = () => {
    const { i18n, t } = useTranslation();

    const renderContent = () => {
        switch (i18n.language) {
            case 'en':
                return <EnPrivacyPolicy />;

            case 'fr':
                return <FrPrivacyPolicy />;

            default:
                return null;
        }
    };

    return (
        <main className="terms">
            <Header />

            <header className="terms__header">
                <h1 className="terms__heading">{t('privacyPolicy')}</h1>
            </header>

            {renderContent()}

            <Footer />
        </main>
    );
};

export default PrivacyPolicy;
