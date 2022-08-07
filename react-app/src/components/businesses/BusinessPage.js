import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

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

    const bizReviews = Object.values(reviews)?.filter(review => {
        return review.business_id === Number(businessId)
    });

    
    console.log('bizreviews', bizReviews)
    
    const bizRatings = bizReviews.map(review => review.rating)
    console.log('bizratings', bizRatings)
    
    const getAvrg = bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length
    console.log('getAverg', getAvrg)

    const totalFilled = Math.floor(getAvrg);
    console.log('totalfilled', totalFilled)
    const stars = Array(5).fill(0);

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
                        <div>
                            {stars.map((_, index) => (                                
                                <FaStar
                                    key={index}
                                    isFilled={index + 1 < totalFilled}
                                    color={index < totalFilled ? "#f15c00" :  "#a9a9a9"}
                                    size={35}
                                ></FaStar>
                            ))}
                        </div>
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
