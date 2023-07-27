import React from 'react';
// import { Link } from 'react-router-dom';

import Logo from '../../../assets/images/header/logo_new.png';
import './Navbar.scss';

const Navbar = () => (
    <nav className="navbar">
        <div className="max-w-container">
            <div className="navbar__content">
                <figure className="navbar__logo">
                    <img src={Logo} alt="Logo" />
                </figure>

                <div className="links">
                    {/* <Link to={'#'}>About Us</Link>
                    <Link to={'#'}>Recruit for Employeers</Link> */}
                </div>

                <div className="ctas">
                    {/* <button>Hello</button>
                    <button>Hello</button> */}
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;
