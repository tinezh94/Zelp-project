import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import { loadBusinesses, loadOneBusiness } from '../../store/business';
import AllImages from '../images/AllImages';
import BusinessReviews from '../reviews/BusinessReviews';
import EditBusinessForm from './EditBusinessForm';
import MapContainer from '../MapContainer';
import { loadReviews } from '../../store/review';
import './business.css';

const BusinessPage = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const businesses = useSelector(state => state?.businesses);
    const reviews = useSelector(state => state?.reviews);
    const user = useSelector(state => state?.session?.user);
    // const images = useSelector(state => state?.images);
    const businessesArr = businesses ? Object.values(businesses) : null;
    // console.log('***', businessesArr)
    let business = businessesArr?.filter(business => {
        return business?.id === Number(businessId)
    });

    business = business[0];
    // console.log('---', business)


    const reviewsArr = reviews ? Object.values(reviews) : null;
    
    const review = reviewsArr?.filter(review => (review.business_id == businessId && review.user_id === user?.id)).length > 0;
    
    // console.log('businesspage',reviews)
    
    const bizReviews = Object.values(reviews)?.filter(review => {
        return review.business_id === Number(businessId)
    });
    
    // console.log('bizreviews', bizReviews)
    
    const bizRatings = bizReviews.map(review => review.rating)
    // console.log('bizratings', bizRatings)
    
    const getAvrg = bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length
    // console.log('getAverg', getAvrg)

    const totalFilled = Math.floor(getAvrg);
    // console.log('totalfilled', totalFilled)
    const stars = Array(5).fill(0);

    useEffect(() => {
        dispatch(loadBusinesses())
        dispatch(loadReviews());
        // dispatch(loadOneBusiness(businessId))
    }, [dispatch]);

    // console.log('------', business)

    // const bizImages = Object.values(images)?.filter(image => {
    //     return image.business_id === Number(businessId)
    // })

    return (
        <>
            <div className='biz-main-content-container'>
                {business && (
                    <div>
                        <div>
                            <AllImages />
                        </div>
                        <h1 className='biz-name'>{business?.name}</h1>
                        <div className='biz-rating'>
                            {stars.map((_, index) => (                                
                                <FaStar
                                    key={index}
                                    isFilled={index + 1 < totalFilled}
                                    color={index < totalFilled ? "#f15c00" :  "#a9a9a9"}
                                    size={33}
                                ></FaStar>
                            ))}
                        </div>
                        <div className='biz-reviews-count'>
                            <p>{bizReviews?.length} reviews</p>
                        </div>
                        <div className='claimed'>
                            <i className="fa-solid fa-check"></i>
                            <p className='claimed-p'>Claimed</p>
                            <p className='bullet-pt'>•</p>
                            <p id='biz-price'>{business.price_range}</p>
                            <p className='bullet-pt'>•</p>
                            <p id='biz-category'>{business.category}</p>
                        </div>
                        <div>
                            <p className='biz-hour'>{business.business_hours}</p>
                        </div>
                        <div className='biz-page-bottom-container'>
                            <div className='biz-page-bottom-left-div'>
                                <div className='add-review-photo-div'>
                                    {review ? (
                                        <h4>
                                            <NavLink to={`/editareview/biz/${businessId}`}>
                                                <button className='biz-write-review'>
                                                    <i className="fa-solid fa-star"></i>
                                                    Edit a review
                                                    </button>
                                            </NavLink>
                                        </h4>
                                    ) :
                                        <h4>
                                            <NavLink to={`/writeareview/biz/${businessId}`}>
                                                <button className='biz-write-review'>
                                                    <i className="fa-solid fa-star"></i>
                                                    Write a review
                                                </button>
                                            </NavLink>
                                        </h4>
                                    }
                                    <div>
                                        <NavLink to={`/biz/${businessId}/images-upload`}>
                                            <button className='add-photo'>
                                                <i className="fa-solid fa-camera"></i>
                                                Add photo
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='biz-page-h2'>Location & Hours</h2>
                                    <div className='map-hrs-div'>
                                        <div>
                                            <MapContainer latitude={business?.latitude} longitude={business?.longitude} />
                                            <p className='biz-street'>{business.address}</p>
                                            <p className='biz-city-state'>{business.city}, {business.state}</p>
                                            <p className='biz-zip'>{business.zipcode} US</p>
                                        </div>
                                        <div>
                                            <table>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Mon</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Tue</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Wed</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Thu</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Fri</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Sat</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                                <tr className='biz-opt-hrs'>
                                                    <th>Sun</th>
                                                    <td className='biz-opt-hrs-td'>{business.business_hours}</td>
                                                </tr>
                                            </table>
                                            {business.owner_id === user?.id && (
                                                <div className='biz-pg-edit-biz'>
                                                    <i className="fa-solid fa-pencil"></i>
                                                    <NavLink  className='edit-biz' to={`/businesses/${business.id}/edit`}>
                                                        <p>Edit Business Info</p>
                                                    </NavLink>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='biz-page-h2'>About the Business</h2>
                                    <div className='description-div'>
                                        <p className='biz-description'>{business.description}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='biz-page-h2'>Recommended Reviews</h2>
                                </div>
                                <BusinessReviews /> 
                            </div>
                            <div className='biz-info-div'>
                                {business.website && (
                                <div className='info-container'>
                                    <a className='biz-website' href={business.website} target='_blank'>{business.website}</a>
                                    <i className="fa-solid fa-location-arrow fa-lg"></i>
                                </div>
                                )}
                                <div className='info-container'>
                                    <p className='biz-phone'>{business.phone_number}</p>
                                    <i className="fa-solid fa-phone-volume fa-lg"></i>
                                </div>
                            </div>
                        </div>
                        

                        {/* <EditBusinessForm business={business} /> */}
                    </div>
                )}
            </div>
        </>
    )
}

export default BusinessPage;
