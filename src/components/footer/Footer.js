import React from 'react';
import './footer.css';
import logo from '../../assets/images/logo.svg';
import {AppConst} from "../../constants";

const Footer = () => {
    return (
        <footer className="footer align-self-baseline">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img className="img-fluid" src={logo} width={100} alt={AppConst.APP_NAME}/>
                    </div>
                    <div className="col-md-2">
                        <h5 className="title">About</h5>
                        <ul>
                            <li><a href="/about">About {AppConst.APP_NAME}</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="title">Contact</h5>
                        <ul>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="title">Legal</h5>
                        <ul>
                            <li><a href="/terms">Terms and conditions</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;