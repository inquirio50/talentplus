import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer';
import Header from '../Header';

import '../styles/content/Terms.scss';

const NonDiscrimination = () => {
    const { t } = useTranslation();

    return (
        <main className="terms">
            <Header />

            <header className="terms__header">
                <h1 className="terms__heading">Non Discrimination</h1>
            </header>

            <section className="terms__content">
                <h2 className="terms__title">
                    {t('Non Discrimination Statement of ')}
                    <span className="bold">Reelcruit</span>
                </h2>

                <p>{t('nonDiscriminationStatement')}</p>
            </section>

            <Footer />
        </main>
    );
};

export default NonDiscrimination;
