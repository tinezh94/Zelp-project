import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import UploadImageModal from '../UploadImageModal';
import ProfileImage from './ProfileImageUpload';
import { loadReviews, deleteReview } from '../../store/review';
import { loadImages, deleteImage } from '../../store/image';
import { FaStar } from 'react-icons/fa';

import './profilepage.css';
import { loadBusinesses } from '../../store/business';

const UserBusinesses = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state?.session.user);
    const reviews = useSelector(state => state?.reviews);
    const images = useSelector(state => state?.images);
    const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;


    const userReviews = Object.values(reviews)?.filter(review => {
        return review.user_id === user.id
    });

    const userImages = Object.values(images)?.filter(image => {
        return image.user_id === user.id
    });

    const stars = Array(5).fill(0);

    useEffect(() => {
        dispatch(loadImages());
        dispatch(loadBusinesses());
    }, [dispatch])

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
                    <div className='user-profile-left-links'>
                        <NavLink to={`/users/${user.id}`}>
                            <i className="fa-solid fa-user"></i>
                            <button className='user-profile-left-btns'>Profile Overview</button>
                        </NavLink>
                    </div>
                    <div className='user-profile-left-links'>
                        <NavLink to={`/user_details_reviews/${user.id}`}> 
                            <i className="fa-solid fa-star-half-stroke"></i>
                            <button className='user-profile-left-btns' id='profile-pic-review-btn'>Reviews</button>
                        </NavLink>
                    </div>
                    <div className='user-profile-left-links'>
                        <NavLink to={`/user_local_photos/${user.id}`}>
                            <i className="fa-solid fa-image"></i>
                            <button className='user-profile-left-btns'>Business Photos</button>
                        </NavLink>
                    </div>
                    <div className='user-profile-left-links'>
                        <NavLink to={`/user_biz/${user.id}`}>
                            <i className="fa-solid fa-utensils"></i>
                            <button className='user-profile-left-btns'>Businesses</button>
                        </NavLink>
                    </div>
                </div>
                <div className='profile-pg-bottom-right'>
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
                </div>
            </div>
        </>
    )
}

export default UserBusinesses;
