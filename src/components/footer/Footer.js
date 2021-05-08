import React from 'react';
import {AppConst} from "../../constants";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mb-4 text-center font-size-14">
            <div className="container">
                {AppConst.APP_NAME} © {AppConst.APP_YEAR}.
                {` `}<Link to={'#'} className={`text-dark color-accent-hover`}>Privacy Policy</Link> |
                {` `}<Link to={'#'} className={`text-dark color-accent-hover`}>Terms and Conditions</Link>
            </div>
        </footer>
    );
};

export default Footer;