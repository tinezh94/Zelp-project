import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { loadBusinesses } from '../../store/business';
import { FaStar } from 'react-icons/fa';
import AllBizMapView from '../FilteredMap/AllBizMap';
import { loadImages } from '../../store/image';
import { loadReviews } from '../../store/review';

const AllBusinesses = ({ businesses }) => {
    const { searchTerm } = useParams();
    const dispatch = useDispatch();

    const images = useSelector(state => state?.images)
    const imagesArr = images? Object.values(images) : null;
    const reviews = useSelector(state => state?.reviews);
    const reviewsArr = reviews ? Object.values(reviews) : null;
    const businessesArr = businesses ? Object.values(businesses) : null;

    useEffect(() => {
        dispatch(loadBusinesses());
        dispatch(loadImages());
        dispatch(loadReviews());
    }, [dispatch]);


    const bizPhoto = (id) => {
        return imagesArr?.filter(image => image.business_id === id)[3];
    }
    
    // console.log('reviews', reviews)
    const bizReview = (businessId) => {
        const bizReviews = reviewsArr.filter(review => review.business_id === businessId);
        const review = bizReviews[0];
        console.log(review)
        return review;
    }

    const allBizReviews = (businessId) => {
        const bizReviews = reviewsArr.filter(review => review.business_id === businessId);
        return bizReviews.length;
    }

    const getAvrg = (businessId) => {
        const reviewsList = reviewsArr.filter(review => review.business_id === businessId)
        const bizRatings = reviewsList.map(review => review.rating)
        const avrgRating = (bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length)
        const totalFilled = Math.floor(Number(avrgRating))
        return totalFilled;
    }

    const stars = Array(5).fill(0);

    return (
        <>
            <div className='cate-page-container'>
                <div className='cate-pg-biz-container'>
                    <h1 className='cate-page-h1'>The Best 10 Restaurants in the Area</h1>
                    <h4 className='cate-page-sub'>All Results</h4>
                    <div>
                        {businessesArr && businessesArr.slice(0, 10).map((biz, idx) => (
                            <NavLink to={`/businesses/${biz.id}`}>
                                <div key={biz} className='cate-pg-biz-card'>
                                    <div className='cate-pg-biz-pic-div'>
                                        <img className='biz-card-photo' id='cate-pg-biz-pic' src={bizPhoto(biz?.id)?.image_url} />
                                    </div>
                                    <div className='cate-pg-biz-info'>
                                        <h4 className='cate-pg-biz-name'>{idx + 1}. {biz.name}</h4>
                                        <div className='bizreviews-ct-div'>
                                            <div className='cate-pg-biz-rating'>
                                                {stars.map((_, index) => (                                
                                                    <FaStar
                                                    key={index}
                                                    isFilled={index + 1 < getAvrg(biz.id)}
                                                    color={index < getAvrg(biz.id) ? "#f15c00" :  "#a9a9a9"}
                                                    size={22}
                                                    ></FaStar>
                                                    ))}
                                            </div>
                                            <div className='bizreviews-ct'>{allBizReviews(biz?.id)}</div>
                                        </div>
                                        <div className='cate-pg-cate-price-div'>
                                            <p className='cate-pg-biz-cate'>{biz.category}</p>
                                            <p className='cate-pg-biz-price'>{biz.price_range}</p>
                                        </div>
                                        <p className='cate-pg-biz-hrs'>{biz.business_hours}</p>
                                        <div className='cate-pg-biz-review-div'>
                                            <i className="fa-solid fa-comment"></i>
                                            <p className='cate-pg-biz-review'>{bizReview(biz.id)?.review_content}</p>
                                        </div>
                                        <div className='biz-dining-options-div'>
                                            <div className='biz-dining-options'>
                                                <i className="fa-solid fa-x"></i>
                                                <p className='biz-dining-p'>Outdoor Dining</p>
                                            </div>
                                            <div className='biz-dining-options'>
                                                <i className="fa-solid fa-check"></i>
                                                <p className='biz-dining-p'>Dine In</p>
                                            </div>
                                            <div className='biz-dining-options'>
                                                <i className="fa-solid fa-check"></i>
                                                <p className='biz-dining-p'>Delivery</p>
                                            </div>
                                            <div className='biz-dining-options'>
                                                <i className="fa-solid fa-check"></i>
                                                <p className='biz-dining-p'>Take Out</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <AllBizMapView businessesArr={businessesArr} />
            </div>
        </>
    )

}

export default AllBusinesses;