import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="pagenotfound-div">
            <div className="nofound-h1-h4">
                <h1 className="nofound-h1">We're sorry. We can't find the page you're looking for.</h1>
                <h4 className="nofound-h4">Please try a new
                    <NavLink className='nofound-h4-link' to='/'>search</NavLink>    
                </h4>
            </div>
            <div>
                <img src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/71c11abb895c/assets/img/svg_illustrations/cant_find_650x520_v2.svg" />
            </div>
        </div>
    )
};

export default PageNotFound;