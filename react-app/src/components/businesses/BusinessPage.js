import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadBusinesses, loadOneBusiness } from '../../store/business';
import AllImages from '../images/AllImages';
import BusinessReviews from '../reviews/BusinessReviews';
import EditBusinessForm from './EditBusinessForm';
import MapContainer from '../MapContainer';

const BusinessPage = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const businesses = useSelector(state => state?.businesses);
    const reviews = useSelector(state => state?.reviews);
    const user = useSelector(state => state.session.user);
    // const images = useSelector(state => state?.images);
    const businessesArr = businesses ? Object.values(businesses) : null;
    // console.log('***', businessesArr)
    let business = businessesArr?.filter(business => {
        return business?.id === Number(businessId)
    });

    business = business[0];
    console.log('---', business)

    const reviewsArr = reviews ? Object.values(reviews) : null;

    const review = reviewsArr.filter(review => (review.business_id == businessId && review.user_id === user.id)).length > 0;

    console.log('businesspage',review)

    useEffect(() => {
        dispatch(loadBusinesses())
        // dispatch(loadOneBusiness(businessId))
    }, [dispatch]);

    // console.log('------', business)

    // const bizImages = Object.values(images)?.filter(image => {
    //     return image.business_id === Number(businessId)
    // })

    return (
        <>
            <div>
                {business && (
                    <div>
                        <h1>{business?.name}</h1>
                        <MapContainer latitude={business?.latitude} longitude={business?.longitude} />
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
                        <AllImages />

                        {review ? (
                            <h4>
                                <NavLink to={`/editareview/biz/${businessId}`}>Edit Review</NavLink>
                            </h4>
                        ) :
                            <h4>
                                <NavLink to={`/writeareview/biz/${businessId}`}>Write a Review</NavLink>
                            </h4>
                        }
                        <EditBusinessForm business={business} />
                        <BusinessReviews />
                    </div>
                )}
            </div>
        </>
    )
}

export default BusinessPage;
