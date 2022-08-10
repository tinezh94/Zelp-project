import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import UploadImageModal from '../UploadImageModal';
import ProfileImage from './ProfileImageUpload';
import { loadReviews } from '../../store/review';
import { loadImages } from '../../store/image';
import { FaStar } from 'react-icons/fa';

import './profilepage.css';
import { loadBusinesses } from '../../store/business';
import { AddProfilePic } from '../../store/session';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state?.session.user);
    const reviews = useSelector(state => state?.reviews);
    const images = useSelector(state => state?.images);
    const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;

    console.log('biz', businessesArr)
    const userReviews = Object.values(reviews)?.filter(review => {
        return review.user_id === user.id
    });

    const userImages = Object.values(images)?.filter(image => {
        return image.user_id === user.id
    });

    console.log(userReviews);
    console.log(userImages)

    const [ showReviews, setShowReviews ] = useState(false);
    const [ showBiz, setShowBiz ] = useState(false);
    const [ showPics, setShowPics ] = useState(false);

    const [ showProfile, setShowProfile ] = useState(true);
    const colors = {
        'orange': "#f15c00",
        'grey': "#a9a9a9"
    }

    const stars = Array(5).fill(0);


    const showReview = () => {
        setShowReviews(true)
        setShowBiz(false);
        setShowProfile(false);
        setShowPics(false);
    }

    const showPic = () => {
        setShowPics(true)
        setShowBiz(false)
        setShowReviews(false)
        setShowProfile(false)
    }

    const showBizes = () => {
        setShowBiz(true)
        setShowPics(false)
        setShowProfile(false)
        setShowReviews(false)
    }

    const showAbout = () => {
        setShowProfile(true)
        setShowBiz(false)
        setShowPics(false)
        setShowReviews(false)
    }

    useEffect(() => {
        dispatch(loadReviews());
        dispatch(loadImages());
        dispatch(loadBusinesses());
        dispatch(AddProfilePic(user));
    }, [dispatch, user?.profile_pic]);

    const month = user.created_at.split(' ')[2]
    const year = user.created_at.split(' ')[3]

    const bizPhoto = (id) => {
        return Object.values(images)?.filter(image => image.business_id === id)[1];
    }
    
    return (
        <>
            <div className='profile-info-container'>
                <div className='profile-pic-div'>
                    <img className='profile-pic' src={user.profile_pic} alt='profile pic' style={{width: 215, height: 225 }} />
                </div>
                <div>
                    <h1 className='profile-name'>{user.first_name} {user.last_name[0].toUpperCase()}.</h1>
                    <div className='user-review-photo-ct'>
                        <p className='user-review-ct'>
                            <i class="fa-solid fa-comment-dots fa-xl"></i>
                            <p className='photo-lengths'>{userReviews.length} Review</p>
                        </p>
                        <p className='user-photo-ct'>
                            <i className="fa-solid fa-camera-retro fa-xl"></i>
                            <p className='photo-lengths'>{userImages.length} Photo</p>
                        </p>
                    </div>
                </div>
                <div>
                <ProfileImage />
                </div>
            </div>
            <div className='profile-pg-bottom-container'>
                <div className='profile-pg-bottom-left'>
                    <h3 className='user-profile-h3'>{user.first_name}'s Profile</h3>
                    <span className='user-profile-left-links'>
                        <i className="fa-solid fa-user"></i>
                        <button className='user-profile-left-btns' onClick={showAbout}>Profile Overview</button>
                    </span>
                    <span className='user-profile-left-links'>
                        <i className="fa-solid fa-star-half-stroke"></i>
                        <button className='user-profile-left-btns' id='profile-pic-review-btn' onClick={showReview}>Reviews</button>
                    </span>
                    <span className='user-profile-left-links'>
                        <i className="fa-solid fa-image"></i>
                        <button className='user-profile-left-btns' onClick={showPic}>Photos</button>
                    </span>
                    <span className='user-profile-left-links'>
                        <i className="fa-solid fa-utensils"></i>
                        <button className='user-profile-left-btns' onClick={showBizes}>Businesses</button>
                    </span>
                </div>
                <div className='profile-pg-bottom-right'>
                {showReviews && (
                        <div>
                            <h2 className='profile-pg-h2'>Reviews</h2>
                            {userReviews && userReviews.map(review => (
                                <div className='profile-page-reviews-container'>
                                        {businessesArr?.filter(biz => (
                                            biz.id === review.business_id
                                        )).map(biz => (
                                            <div className='profile-single-review-container'>
                                                <div className='profile-pg-review-biz-info'>
                                                    <div>
                                                        <img className='profile-pg-biz-pic' src={bizPhoto(biz?.id)?.image_url}/>
                                                    </div>
                                                    <div className='review-biz-info'>
                                                        <h3 className='review-biz-info-name'>{biz.name}</h3>
                                                        <div className='review-biz-info-price-cat'>
                                                            <p className='review-biz-info-price'>{biz.price_range}</p>
                                                            <p className='review-biz-info-cate'>• {biz.category}</p>
                                                        </div>
                                                        <p className='review-biz-info-add'>{biz.address}</p>
                                                        <p className='review-biz-info-add'>{biz.city} {biz.state} {biz.zipcode}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='profile-pg-rating-star'>
                                                        {stars.map((_, index) => {
                                                            const ratingValue = index + 1;
                                                            return (
                                                                <FaStar 
                                                                    key={index}
                                                                    isFilled={review.rating}
                                                                    color={index < review.rating ? "#f15c00" :  "#a9a9a9"}
                                                                    size={18}
                                                                ></FaStar>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <p className='profile-pg-review-content'>{review.review_content}</p>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    )}
                    {showBiz && ( 
                        <div>
                            <h2 className='profile-pg-h2-2'>Businesses</h2>
                            <div className='profile-pg-bizes-container'>
                                {businessesArr && businessesArr.filter(biz => (
                                    biz.owner_id === user.id
                                    )).map(biz => (
                                        <div className='profile-pg-biz-info'>
                                        <div>
                                            <img className='profile-pg-biz-img' src={bizPhoto(biz?.id)?.image_url}/>
                                        </div>
                                        <div className='profile-pg-owner-biz-info'>
                                            <NavLink to={`/businesses/${biz.id}`}>
                                                <h3 className='profile-pg-owner-biz-name'>{biz.name}</h3>
                                            </NavLink>
                                            <p className='profile-pg-owner-biz-add'>{biz.address}</p>
                                            <p className='profile-pg-owner-biz-city'>{biz.city} {biz.state} {biz.zipcode}</p>
                                            <p className='profile-pg-owner-biz-des'>{biz.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showPics && (
                        <div>
                            <h2 className='profile-pg-h2-3'>Photos</h2>
                            <div className='profile-pg-imgs-div'>
                                {userImages && userImages.map(image => (
                                    <div className='profile-pg-imgs-div'>
                                        <img  className='profile-pg-img' src={image.image_url} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {showProfile && (
                    <div className='user-about-div'>
                        <h4 className='about-user'>About {user.first_name} {user.last_name[0].toUpperCase()}</h4>
                        <h4 className='zelp-since'>Zelping since </h4>
                        <p className='month-yr'>{month} {year}</p>
                    </div> 
                )}
            </div>
        </>
    )
};

export default UserProfilePage;

