import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadOneBusiness } from '../../store/business';
import { FaStar } from 'react-icons/fa';

import { createReview } from '../../store/review';
import UploadPicture from '../images/UploadImage';
import RateStar from '../Rate';
import UploadImageModal from '../UploadImageModal';
import './reviews.css'

const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const user = useSelector(state => state?.session?.user);
    const businesses = useSelector(state => state?.businesses);
    

    useEffect(() => {
        dispatch(loadOneBusiness(Number(businessId)));
    }, [dispatch]);

    const colors = {
        'orange': "#f15c00",
        'grey': "#a9a9a9"
    }

    const stars = Array(5).fill(0);
    const [ rating, setRating ] = useState(0);
    // const [ currValue, setCurrValue ] = useState(0);
    const [ hoverValue, setHoverValue ] = useState(null);

    const [ content, setContent ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    
    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    useEffect(() => {
        const errors = [];
        if (rating === 0) errors.push('Please leave a rating');
        if (content.length < 30) errors.push('Woah, did you mean to post so soon? We thought your review was just getting started! Please add more details so we can post this review.');
        setValidationErrors(errors);
    }, [rating, content]);

    const handleClick = value => {
        setRating(value)
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(null)
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        
        if (!validationErrors.length) {
            const payload = {
                user_id: user.id,
                business_id: Number(businessId),
                rating: rating,
                review_content: content,
                created_at: combined,
                updated_at: combined
            }
    
            const createdReview = await dispatch(createReview(payload));
            console.log('new review', createReview)
            if (createdReview) {
                reset();
                setHasSubmitted(false)
                history.push(`/businesses/${businessId}`)
            }
        }

    }

    const reset = () => {
        setRating('');
        setContent('')
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <h2>Write a review</h2>
                {/* <label>Rating</label>
                <input 
                    type='text'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                /> */}
                <div style={styles.container}>
                    <div style={styles.stars}>
                        {stars.map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label>
                                    <input 
                                        type='radio' 
                                        display='none'
                                        name='rating' 
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue )} />
                                    <FaStar 
                                        key={index}
                                        size={50}
                                        style={{
                                            marginRight: 10,
                                            cursor: 'pointer'
                                        }}
                                        color={ratingValue <= (rating || hoverValue) ? colors.orange : colors.grey}
                                        // onClick={() => handleClick(index + 1)}
                                        onMouseEnter={() => handleMouseOver(ratingValue)}
                                        onMouseLeave={handleMouseLeave}
                                        ></FaStar>
                                </label>
                            )
                        })}
                    </div>
                </div>
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
            <UploadImageModal />
        </>
    )
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default CreateReviewForm;