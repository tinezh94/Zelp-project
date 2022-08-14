import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadOneBusiness } from '../../store/business';
import { FaStar } from 'react-icons/fa';

import { createReview } from '../../store/review';
import { loadImages, deleteImage } from '../../store/image';
import UploadImageModal from '../UploadImageModal';
import './reviews.css'
import ReviewPhotosModal from './ReviewPhotosModal';

const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const user = useSelector(state => state?.session?.user);
    const business = useSelector(state => state?.businesses);
    const images = useSelector(state => state?.images);

    const bizImages = Object.values(images)?.filter(image => {
        return (image.business_id === Number(businessId) && image.user_id === user.id);
    });

    useEffect(() => {
        dispatch(loadImages());
    },[dispatch, businessId]);

    console.log('bizImages', bizImages)

    const onDeletePic = async (id) => {
        await dispatch(deleteImage(id));
    }
    
    let currBiz = business ? Object.values(business) : null;


    useEffect(() => {
        dispatch(loadOneBusiness(Number(businessId)));
    }, [dispatch]);

    // let business = Object.values(businesses)?.filter(biz => {
    //     return business.id === Number(businessId);
    // })

    currBiz = currBiz[0]
    console.log('biz', currBiz)

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

    // const handleClick = value => {
    //     setRating(value)
    // };

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

    const handleClick = (ratingValue) => {
        const ele = document.getElementById('write-review-rate-label');
        console.log(ele.innerText)
        if (ratingValue === 1) {
            ele.innerText = 'Not good'
        }
        if (ratingValue === 2) {
            ele.innerText = 'Could\'ve been better'
        }
        if (ratingValue === 3) {
            ele.innerText = 'OK'
        }
        if (ratingValue === 4) {
            ele.innerText = 'Good'
        }
        if (ratingValue === 5) {
            ele.innerText = 'Great'
        }
    }

    return (
        <div className='write-review-content-container'>
            <h1 className='write-review-biz-name'>{currBiz?.name}</h1>
            <form onSubmit={onSubmit} className='write-review-form'>
                <div className='create-review-errors-div'>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* <label>Rating</label>
                <input 
                    type='text'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                /> */}
                <div style={styles.container} className='write-review-rating-container'>
                    <div style={styles.stars} className='star-p'>
                        {stars.map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label>
                                    <input
                                        className='star-radio-type'
                                        type='radio' 
                                        display='none'
                                        name='rating' 
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)} />
                                    <FaStar 
                                        key={index}
                                        size={30}
                                        style={{
                                            marginRight: 10,
                                            cursor: 'pointer'
                                        }}
                                        color={ratingValue <= (rating || hoverValue) ? colors.orange : colors.grey}
                                        onClick={() => handleClick(ratingValue)}
                                        onMouseEnter={() => handleMouseOver(ratingValue)}
                                        onMouseLeave={handleMouseLeave}
                                        ></FaStar>
                                </label>
                            )
                        })}
                        <p className='write-review-rate-label' id='write-review-rate-label'>Select your rating</p>
                    </div>
                </div>
                <textarea
                    className='review-content'
                    placeholder='Write your review here...'
                    rows={'10'}
                    cols={'50'}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                >
                </textarea>
                <h3 className='write-review-h3'>Attach Photos</h3>
                <ReviewPhotosModal />
                <div className='create-review-imgs-div'>
                    {bizImages && bizImages.map(image => (
                        <div className='create-review-imgs-container'>
                            <img className='upload-pg-img' src={image.image_url} />
                            <button className='create-review-delete-pic-btn' type='button' onClick={() => onDeletePic(image.id)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='post-review-btn-div'>
                    <button className='post-review-btn' type='submit'>Post Review</button>
                </div>
            </form>
        </div>
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