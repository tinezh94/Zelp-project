import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { loadBusinesses } from '../../store/business';

const BusinessesPage = () => {
    const dispatch = useDispatch();

    const businesses = useSelector(state => state?.businesses);
    // console.log('businesses', businesses)
    const businessesArr = businesses ? Object.values(businesses) : null;
    // console.log('businesspage', businessesArr)

    useEffect(() => {
        dispatch(loadBusinesses());
    }, [dispatch]);

    return (
        <>
            <h2>Businesses List</h2>
            {businessesArr && businessesArr.map(business => (
                    <div key={business}>
                        <NavLink to={`/businesses/${business?.id}`}>
                            <h1>{business?.name}</h1>
                        </NavLink>
                    </div>
            ))}
        </>
    )
};

export default BusinessesPage;