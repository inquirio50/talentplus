import React from 'react';

/**
 * Renders the preloader
 */
const Loader = () => (
    <div className="preloader" id="preloader">
        <div className="status" id="status">
            <div className="bouncing-loader">
                <div />
                <div />
                <div />
            </div>
        </div>
    </div>
);

export default Loader;
