import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import { loadReviews } from '../../store/review';

const BusinessReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    // const user = useSelector(state => state?.session?.user);
    const businesses = useSelector(state => state?.businesses);

    const reviews = useSelector(state => state?.reviews)
    console.log('reviews', reviews)

    const bizReviews = Object.values(reviews)?.filter(review => {
        return review.business_id === Number(businessId)
    });

    console.log('bizreviews', bizReviews)

    const [users, setUsers] = useState([]);
    // console.log('users', users)

    // users.filter(user => {
    //     return user.id === 
    // })

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

    return (
        <>
            <div>
                {bizReviews && bizReviews.map(review => (
                    <div>
                        {users.filter(user => user.id === review.user_id).map(user => (
                            <p>{user.username}</p>
                        ))}
                        <p>{review.rating}</p>
                        <p>{review.review_content}</p>
                        <NavLink to={`/reviews/${review.id}`}>Edit Review</NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BusinessReviews;
