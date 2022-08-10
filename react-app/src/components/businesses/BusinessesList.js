import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import businessesReducer, { loadBusinesses } from '../../store/business';
import { loadImages } from '../../store/image';
import { loadReviews } from '../../store/review';

const BusinessesPage = () => {
    const dispatch = useDispatch();

    const businesses = useSelector(state => state?.businesses);
    // console.log('businesses', businesses)
    const businessesArr = businesses ? Object.values(businesses) : null;
    // console.log('businesspage', businessesArr)

    const images = useSelector(state => state?.images)
    const imagesArr = images? Object.values(images) : null;
    const categories = useSelector(state => state.categories)
    let cateArr = Object.values(categories);
    cateArr = cateArr.splice(0, 8)

    const bizPhoto = (id) => {
        return imagesArr.filter(image => image.business_id === id)[1];
    }

    const reviews = useSelector(state => state?.reviews);
    const reviewsArr = reviews ? Object.values(reviews) : null;
    console.log('reviews', reviewsArr)


    useEffect(() => {
        dispatch(loadBusinesses());
        dispatch(loadImages());
        dispatch(loadReviews());
    }, [dispatch]);

    const getAvrg = (businessId) => {
        const reviewsList = reviewsArr.filter(review => review.business_id === businessId)
        const bizRatings = reviewsList.map(review => review.rating)
        const avrgRating = (bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length)
        const totalFilled = Math.floor(Number(avrgRating))
        return totalFilled;
    }


    // const bizRatings = bizReviews.map(review => review.rating)
    // const getAvrg = bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length

    // const totalFilled = Math.floor(getAvrg);

    const stars = Array(5).fill(0);

    return (
        <>
            <div className='main-pg-background-image' style={{ backgroundImage: 'linear-gradient(90deg,#0006,#0000001a 30%), url(https://restaurants.yelp.com/wp-content/uploads/sites/3/2022/05/different-kinds-of-food-on-a-table-1944x1094.jpeg)'}}></div>
            <h1 className='bizes-h1'>Ready to Eat?</h1>
            <div className='main-page-top-container'>
                <h2 className='main-pg-h2'>Your Next Visit Awaits</h2>
                <div className='biz-cards-container'>
                    {businessesArr && businessesArr.slice(0, 8).map(business => (
                        <div key={business} className='biz-info-card'>
                            <div>
                                <NavLink to={`/businesses/${business?.id}`}>
                                    <img className='biz-card-photo' src={bizPhoto(business?.id)?.image_url} />
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className='biz-card-link' to={`/businesses/${business.id}`}>
                                    <h3 className='biz-card-name'>{business?.name}</h3>
                                </NavLink>
                                <div className='biz-card-rating'>
                                    {stars.map((_, index) => (                                
                                        <FaStar
                                            key={index}
                                            isFilled={index + 1 < getAvrg(business.id)}
                                            color={index < getAvrg(business.id) ? "#f15c00" :  "#a9a9a9"}
                                            size={24}
                                        ></FaStar>
                                    ))}
                                </div>
                                <p className='biz-card-category'>{business.category}</p>
                                <p className='biz-card-description'>{business.description}</p>
                            </div>
                        </div>
                ))}
                </div>
            </div>
            <div className='main-page-bottom-container'>
                <h2 className='main-pg-h2'>Categories</h2>
                <div className='biz-categories'>
                    <NavLink to={`/search/${cateArr[0]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🍔</p>
                            <p className='category-name'>{cateArr[0].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[1]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🥟</p>
                                <p className='category-name'>{cateArr[1].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[2]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🥪</p>
                                <p className='category-name'>{cateArr[2].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[3]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🍙</p>
                            <p className='category-name'>{cateArr[3].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[4]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🍰</p>
                            <p className='category-name'>{cateArr[4].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[5]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🍣</p>
                            <p className='category-name'>{cateArr[5].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[6]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🍝</p>
                            <p className='category-name'>{cateArr[6].category_name}</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/search/${cateArr[7]?.id}`}>
                        <div className='category-container'>
                            <p className='emoji-icon'>🍜</p>
                            <p className='category-name'>{cateArr[7].category_name}</p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    )
};

export default BusinessesPage;
