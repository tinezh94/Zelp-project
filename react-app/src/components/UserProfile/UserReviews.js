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

const UserReviews = ({ businesses }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state?.session.user);
    const reviews = useSelector(state => state?.reviews);
    const images = useSelector(state => state?.images);
    // const businesses = useSelector(state => state?.businesses);
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

    // const onDeletePic = async (id) => {
    //     await dispatch(deleteImage(id));
    //     // history.push(`/businesses/${businessId}`);
    // }

    const onDelete = async (id) => {
        await dispatch(deleteReview(id));
        // history.push(`/businesses/${Number(businessId)}`);
    }

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
                                                    <NavLink to={`/businesses/${biz.id}`}>
                                                        <h3 className='review-biz-info-name'>{biz.name}</h3>
                                                    </NavLink>
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
                                            <div className='profile-pg-review-edit-delete'>
                                                <NavLink to={`/editareview/biz/${biz.id}`}>
                                                    <button className='profile-pg-review-edit'>
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                </NavLink>
                                                <button className='profile-pg-review-delete' onClick={() => onDelete(review.id)}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
         </div>
    </>
    )
}

export default UserReviews;