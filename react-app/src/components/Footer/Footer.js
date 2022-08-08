import React from "react";
import { NavLink } from "react-router-dom";
import '../navbar/logo.png';

const Footer = () => {
    return (
        <div>
            <h3>About</h3>
            <h5>Christine Zhang</h5>
            <div>
                <a href="https://github.com/tinezh94">GitHub</a>
                <a href="https://www.linkedin.com/in/christine-zhang-4b263080/">LinkedIn</a>
            </div>
            <p>Copyright 2022 @ Zelp
                <img src={logo} alt='logo image' />
            </p>
        </div>
    )
}