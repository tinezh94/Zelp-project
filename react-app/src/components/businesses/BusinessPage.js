import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadBusinesses, loadOneBusiness } from '../../store/business';
import EditBusinessForm from './EditBusinessForm';

const BusinessPage = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;
    console.log('***', businessesArr)
    let business = businessesArr?.filter(business => {
        return business?.id === Number(businessId)
    });

    business = business[0];
    console.log('---', business)

    useEffect(() => {
        dispatch(loadBusinesses())
        // dispatch(loadOneBusiness(businessId))
    }, [dispatch]);

    // console.log('------', business)

    return (
        <>
            <div>
                {business && (
                    <div>
                        <h1>{business?.name}</h1>
                        <p>{business.category}</p>
                        <p>Mon {business.business_hours}</p>
                        <p>Tue {business.business_hours}</p>
                        <p>Wed {business.business_hours}</p>
                        <p>Thu {business.business_hours}</p>
                        <p>Fri {business.business_hours}</p>
                        <p>Sat {business.business_hours}</p>
                        <p>Sun {business.business_hours}</p>
                        <p>{business.website}</p>
                        <p>{business.phone_number}</p>
                        <p>{business.price_range}</p>
                        <EditBusinessForm />
                    </div>
                )}
            </div>
        </>
    )
}

export default BusinessPage;
