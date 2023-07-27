import { Button } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Check } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import pricings from './data';

import '../styles/content/NewPricing.scss';

type SubPrice = {
    price: string;
    services: string[];
    description: string;
};

interface PricingCardProps {
    title: string;
    permanent: SubPrice;
    consulting: SubPrice;
}
// component for pricing card
const PricingCard = ({ title, permanent, consulting }: PricingCardProps) => {
    const [tab, setTab] = useState('permanent');
    const { t } = useTranslation();

    const subPrice = useMemo(() => (tab === 'permanent' ? permanent : consulting), [tab]);

    const renderList = useCallback(
        () =>
            subPrice.services.map((item) => (
                <li key={item} className="new-pricing__list-item">
                    <Check color="primary" sx={{ fontSize: 16 }} />
                    <span>{t(item)}</span>
                </li>
            )),
        [subPrice]
    );

    return (
        <div key={title} className="new-pricing__card">
            <h2 className="new-pricing__title">{t(title)}</h2>

            <div className="new-pricing__tabs">
                {['permanent', 'consulting'].map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={`new-pricing__tab ${tab === item ? 'new-pricing__tab--selected' : ''}`}
                        onClick={() => setTab(item)}>
                        {t(item)}
                    </button>
                ))}
            </div>

            <h3 className={`new-pricing__price ${subPrice.price.trim() === '' ? 'new-pricing__price--small' : ''}`}>
                {subPrice.price.trim() === '' ? 'Get more' : subPrice.price}
            </h3>

            <Button
                sx={{ textTransform: 'capitalize', py: 2 }}
                disableElevation
                variant="contained"
                target="blank"
                href="https://calendly.com/reelcruitralph">
                {t('Get Started')}
            </Button>

            <hr />

            <span>{t('Reelcruit services include the following:')}</span>

            <ul className="new-pricing__list">{renderList()}</ul>

            <p className="new-pricing__description">{t(subPrice.description)}</p>

            <a href="/terms-and-condition" className="new-pricing__terms">
                {t('Terms of service')}
            </a>
        </div>
    );
};

const NewPricing = () => {
    const { t } = useTranslation();

    return (
        <div className="new-pricing">
            <div className="new-pricing__container">
                <h1 className="new-pricing__heading">{t('Choose your plan')}</h1>

                <div className="new-pricing__cards">
                    {pricings.map((item) => (
                        <PricingCard
                            key={item.title}
                            title={item.title}
                            permanent={item.permanent}
                            consulting={item.consulting}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewPricing;
