import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { loadBusinesses } from '../../store/business';
import { loadCategories } from '../../store/category';
import { loadReviews } from '../../store/review';
import { FaStar } from 'react-icons/fa';
import './categorypage.css';
import { loadImages } from '../../store/image';
import MultiMapContainer from '../FilteredMap';

const CategoryPage = ({ businesses }) => {
    const dispatch = useDispatch();
    const { searchTerm } = useParams();
    console.log(searchTerm)

    // const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;
    const images = useSelector(state => state?.images)
    const imagesArr = images? Object.values(images) : null;
    const reviews = useSelector(state => state?.reviews);
    const reviewsArr = reviews ? Object.values(reviews) : null;
    const categories = useSelector(state => state?.categories);
    const category = Object.values(categories)?.filter(category => {
        return category.id === Number(searchTerm)
    });

    const categoryName = Object.values(categories)?.filter(category => {
        return category.category_name === searchTerm
    })

    console.log('category name', categoryName)

    const filteredCateBiz = businessesArr.filter(biz => {
        return biz.category === category[0]?.category_name || biz.category === categoryName[0]?.category_name
    });

    const filteredBiz = businessesArr?.filter(biz => {
        return biz.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log('filteredbiz', filteredBiz)
    console.log('filteredCatebiz', filteredCateBiz)

    const bizPhoto = (id) => {
        return imagesArr?.filter(image => image.business_id === id)[3];
    }

    const allBizReviews = (businessId) => {
        const bizReviews = reviewsArr.filter(review => review.business_id === businessId);
        return bizReviews.length;
    }
    // console.log('biz', filteredBiz)
    useEffect(() => {
        dispatch(loadBusinesses());
        dispatch(loadCategories());
        dispatch(loadReviews());
        dispatch(loadImages());
    }, [dispatch]);

    const getAvrg = (businessId) => {
        const reviewsList = reviewsArr.filter(review => review.business_id === businessId)
        // console.log(reviews)
        const bizRatings = reviewsList.map(review => review.rating)
        // console.log('bizratings', bizRatings)
        const avrgRating = (bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length)
        // console.log('avrgrating', avrgRating)
        const totalFilled = Math.floor(Number(avrgRating))
        // console.log('total',totalFilled )
        return totalFilled;
    }

    const stars = Array(5).fill(0);

    return (
        <>
            <div className='cate-page-container'>
                <div className='cate-pg-biz-container'>
                    <h1 className='cate-page-h1'>Top Recommended Restaurants</h1>
                    <h4 className='cate-page-sub'>All Results</h4>
                    <div>

                        {filteredCateBiz && filteredCateBiz?.map(biz => (
                            <NavLink to={`/businesses/${biz?.id}`}>
                                <div key={biz} className='cate-pg-biz-card'>
                                    <div className='cate-pg-biz-pic-div'>
                                        <img className='biz-card-photo' id='cate-pg-biz-pic' src={bizPhoto(biz?.id)?.image_url}/>
                                    </div>
                                    <div className='cate-pg-biz-info'>
                                        <h4 className='cate-pg-biz-name'>{biz.name}</h4>
                                        <p className='cate-pg-biz-cate'>{biz.category}</p>
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
                                        <p className='cate-pg-biz-hrs'>{biz.business_hours}</p>
                                        <p className='cate-pg-biz-descrip'>{biz.description}</p>
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
                    <div>
                        {filteredCateBiz.length === 0 && filteredBiz.length === 0 && (
                            <h3 className='no-results'>Sorry. There are currently 0 results matching your search!</h3>
                        )}
                    </div>
                </div>
                <MultiMapContainer filteredBiz={filteredBiz} filteredCateBiz={filteredCateBiz} businessesArr={businessesArr} />
            </div>
        </>
    )

};

export default CategoryPage;