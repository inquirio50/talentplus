import React from 'react';
import { useTranslation } from 'react-i18next';

import Solution1 from '../../../assets/images/landingPage/solution/solution1.png';
import Solution2 from '../../../assets/images/landingPage/solution/solution2.png';
import Solution3 from '../../../assets/images/landingPage/solution/solution3.png';
import Solution4 from '../../../assets/images/landingPage/solution/solution4.png';
import Solution5 from '../../../assets/images/landingPage/solution/solution5.png';
import Solution6 from '../../../assets/images/landingPage/solution/solution6.png';

import '../styles/content/SolutionGrid.scss';

const solutions = [
    {
        image: Solution1,
        text: 'No intermediate, direct and fast information.',
    },
    {
        image: Solution2,
        text: 'An optimized profile and preparation for interviews.',
    },
    {
        image: Solution3,
        text: 'Opportunities that match your personality.',
    },
    {
        image: Solution4,
        text: 'Be in control of your recruitment process.',
    },
    {
        image: Solution5,
        text: 'Access to an expert recruiter on the platform.',
    },
    {
        image: Solution6,
        text: 'Fast, easy and fun automated process.',
    },
];

const SolutionGrid = () => {
    const { t } = useTranslation();

    return (
        <div className="solution-grid">
            <div className="solution-grid__container">
                <h2 className="solution-grid__title">{t('The Solution')}</h2>

                <div className="solution-grid__grid">
                    {solutions.map((item) => (
                        <div className="solution-grid__col">
                            <figure className="solution-grid__figure">
                                <img src={item.image} alt="" />
                            </figure>

                            <p className="solution-grid__paragraph">{t(item.text)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SolutionGrid;
