import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadOneBusiness } from '../../store/business';

import { createReview } from '../../store/review';

const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const user = useSelector(state => state?.session?.user);
    const businesses = useSelector(state => state?.businesses);
    

    useEffect(() => {
        dispatch(loadOneBusiness(Number(businessId)));
    }, [dispatch]);

    const [ rating, setRating ] = useState('');
    const [ content, setContent ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    
    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            user_id: user.id,
            business_id: Number(businessId),
            rating: rating,
            review_content: content,
            created_at: combined,
            updated_at: combined
        }

        const createdReview = await dispatch(createReview(payload));
        if (createdReview) {
            reset();
            setHasSubmitted(false)
            history.push(`/businesses/${businessId}`)
        }

    }

    const reset = () => {
        setRating('');
        setContent('')
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <h2>Write a review</h2>
                <label>Rating</label>
                <input 
                    type='text'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                />
                <textarea
                    placeholder='Write your review here...'
                    rows={'10'}
                    cols={'50'}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                ></textarea>
                <div>
                    <button type='submit'>Post Review</button>
                </div>
            </form>
        </>
    )
};

export default CreateReviewForm;