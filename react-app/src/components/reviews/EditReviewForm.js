import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { deleteReview, editReview } from '../../store/review';

const EditReviewForm = ({ business }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams();

    const user = useSelector(state => state?.session?.user);
    const reviews = useSelector(state => state?.reviews)

    let review = Object.values(reviews)?.filter(review => {
        return review?.id === Number(reviewId)
    })
    
    review = review[0];

    const [ editRating, setEditRating ] = useState(review?.rating);
    const [ editContent, setEditContent ] = useState(review?.review_content);
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
            id: review?.id,
            user_id: user.id,
            business_id: review?.business_id,
            rating: editRating,
            review_content: editContent,
            created_at: combined,
            updated_at: combined
        }

        const editedReview = await dispatch(editReview(payload))
        if (editedReview) {
            reset();
            setHasSubmitted(false);
            history.push(`/businesses/${review?.business_id}`);
        }
    }

    const onDelete = async (id) => {
        await dispatch(deleteReview(id));
        history.push(`/businesses/${review?.business_id}`);
    }

    const reset = () => {
        setEditRating('');
        setEditContent('')
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <h2>{business?.name}</h2>
                <label>Rating</label>
                <input 
                    type='text'
                    value={editRating}
                    onChange={e => setEditRating(e.target.value)}
                />
                <textarea
                    rows={'10'}
                    cols={'50'}
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                ></textarea>
                <div>
                    <button type='submit'>Edit Review</button>
                </div>
                <div>
                    <button type='button' onClick={() => onDelete(review.id)}>Delete Review</button>
                </div>
            </form>
        </>
    )
}

export default EditReviewForm;
