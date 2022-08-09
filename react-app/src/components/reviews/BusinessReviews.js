import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import { loadReviews, deleteReview } from '../../store/review';

const BusinessReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    // const user = useSelector(state => state?.session?.user);
    const businesses = useSelector(state => state?.businesses);
    const sessionUser = useSelector(state => state.session.user);
    console.log('user', sessionUser.id)
    const reviews = useSelector(state => state?.reviews)
    console.log('reviews', reviews)

    const bizReviews = Object.values(reviews)?.filter(review => {
        return review.business_id === Number(businessId)
    });

    console.log('bizreviews', bizReviews)
    
    const [users, setUsers] = useState([]);
    console.log('users', users)

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
      }
    
      useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
      }, [showMenu])

    const stars = Array(5).fill(0);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);

    useEffect(() => {
        dispatch(loadReviews())
    }, [dispatch])

    const onDelete = async (id) => {
        await dispatch(deleteReview(id));
        history.push(`/businesses/${Number(businessId)}`);
    }

    return (
        <>
            <div>
                {bizReviews && bizReviews.map((review) => (
                    <div className='reviews-container'>
                        <div>
                            {users.filter(user => user.id === review.user_id).map(user => (
                                <div className='review-profile-container'>
                                    <div className='review-pic-name'>
                                        <img className='review-profile-pic' src={user.profile_pic} alt='user profile pic' />
                                        <p className='review-name'>{user.first_name} {user.last_name[0].toUpperCase()}</p>
                                    </div>
                                    <div>
                                        {(sessionUser.id === review.user_id) && (
                                            <div>
                                                <button className='review-dot-btn' onClick={() => openMenu()}>
                                                    <i className="fa-solid fa-ellipsis"></i>
                                                </button>
                                                {showMenu && (
                                                    <div className='review-edit-delete'>
                                                        <NavLink  className='dropdown-links' to={`/editareview/biz/${businessId}`}>Edit Review</NavLink>
                                                        <button className='biz-review-delete-btn' type='button' onClick={() => onDelete(review.id)}>Remove Review</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='biz-review-star-rating'>
                            {stars.map((_, index) => (
                                <FaStar
                                    key={index}
                                    isFilled={review.rating}
                                    color={index < review.rating ? "#f15c00" :  "#a9a9a9"}
                                    size={18}
                                >
                                </FaStar>
                            ))}
                            {/* <div>{review.updated_at.toDateString()}</div> */}
                        </div>
                        <p className='biz-page-review-content'>{review.review_content}</p>
                        
                    </div>
                ))}
            </div>
        </>
    )
}

export default BusinessReviews;
