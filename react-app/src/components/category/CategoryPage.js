import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { loadBusinesses } from '../../store/business';
import { loadCategories } from '../../store/category';
import { loadReviews } from '../../store/review';
import { FaStar } from 'react-icons/fa';
import './categorypage.css';
import { loadImages } from '../../store/image';
import MultiMapView from '../FilteredMap/FilteredMap';
import MultiMapContainer from '../FilteredMap';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();

    const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;
    const images = useSelector(state => state?.images)
    const imagesArr = images? Object.values(images) : null;
    const reviews = useSelector(state => state?.reviews);
    const reviewsArr = reviews ? Object.values(reviews) : null;
    const categories = useSelector(state => state?.categories);
    const category = Object.values(categories)?.filter(category => {
        return category.id === Number(categoryId)
    });

    const filteredBiz = businessesArr.filter(biz => {
        return biz.category === category[0]?.category_name
    });

    const bizPhoto = (id) => {
        return imagesArr?.filter(image => image.business_id === id)[3];
    }

    console.log('biz', filteredBiz)
    useEffect(() => {
        dispatch(loadBusinesses());
        dispatch(loadCategories());
        dispatch(loadReviews());
        dispatch(loadImages());
    }, [dispatch]);

    const getAvrg = (businessId) => {
        const reviewsList = reviewsArr.filter(review => review.business_id === businessId)
        console.log(reviews)
        const bizRatings = reviewsList.map(review => review.rating)
        console.log('bizratings', bizRatings)
        const avrgRating = (bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length)
        console.log('avrgrating', avrgRating)
        const totalFilled = Math.floor(Number(avrgRating))
        console.log('total',totalFilled )
        return totalFilled;
    }

    const stars = Array(5).fill(0);

    return (
        <>
            <div className='cate-page-container'>
                <div className='cate-pg-biz-container'>
                    <h1 className='cate-page-h1'>Top Recommended Restaurants</h1>
                    <h4 className='cate-page-sub'>All Results</h4>
                    {filteredBiz && filteredBiz.map(biz => (
                        <NavLink to={`/businesses/${biz?.id}`}>
                            <div key={biz} className='cate-pg-biz-card'>
                                <div className='cate-pg-biz-pic-div'>
                                    <img className='biz-card-photo' id='cate-pg-biz-pic' src={bizPhoto(biz?.id)?.image_url}/>
                                </div>
                                <div className='cate-pg-biz-info'>
                                    <h4 className='cate-pg-biz-name'>{biz.name}</h4>
                                    <p className='cate-pg-biz-cate'>{biz.category}</p>
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
                                    <p className='cate-pg-biz-hrs'>{biz.business_hours}</p>
                                    <p className='cate-pg-biz-descrip'>{biz.description}</p>
                                    <div className='biz-dining-options-div'>
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
                    <div>
                        {filteredBiz.length === 0 && (
                            <h3 className='no-results'>Sorry. There are currently 0 results matching your search!</h3>
                        )}
                    </div>
                </div>
                <MultiMapContainer filteredBiz={filteredBiz} businessesArr={businessesArr} />
            </div>
        </>
    )

};

export default CategoryPage;