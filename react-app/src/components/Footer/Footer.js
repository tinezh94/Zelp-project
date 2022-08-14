import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../navbar/logo.png';
import './footer.css';

const Footer = () => {
    return (
        <div className="footer-div">
            <h3 className="footer-about">About</h3>
            <div className="author-container">
                <h5>Christine Zhang</h5>
                <div>
                    <div>
                        <i className="fa-brands fa-github"></i>
                        <a className="author-links" href="https://github.com/tinezh94" target="_blank">GitHub</a>
                    </div>
                    <div>
                        <i className="fa-brands fa-linkedin-in"></i>
                        <a className="author-links" href="https://www.linkedin.com/in/christine-zhang-4b263080/" target="_blank">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className="copyright-div">
                <p>Copyright 2022 @ Zelp
                    <img className="copyright-logo" src={logo} alt='logo image' />
                     , Christine Zhang
                </p>
            </div>
        </div>
    )
}

export default Footer;
