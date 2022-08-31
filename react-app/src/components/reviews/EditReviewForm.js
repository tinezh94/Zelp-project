import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
// import { loadOneBusiness } from '../../store/business';
import { deleteImage, loadImages } from '../../store/image';

import { deleteReview, editReview } from '../../store/review';
// import EditImage from '../images/EditImage';
import UploadImageModal from '../UploadImageModal';
import ReviewPhotosModal from './ReviewPhotosModal';
import './reviews.css'

const EditReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const user = useSelector(state => state?.session?.user);
    const reviews = useSelector(state => state?.reviews)
    const images = useSelector(state => state?.images);
    const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;
    let business = businessesArr?.filter(business => {
        return business?.id === Number(businessId)
    });

    business = business[0];
    const bizImagesArr = images ? Object.values(images) : null;

    const bizImages = bizImagesArr?.filter(image => {
        return image.business_id === Number(businessId);
    });

    // console.log('Edit review form', bizImages)

    let review = Object.values(reviews)?.filter(review => {
        return (review?.business_id === Number(businessId) && review?.user_id === user.id);
    })
    
    review = review[0];

    const colors = {
        'orange': "#f15c00",
        'grey': "#a9a9a9"
    }

    const stars = Array(5).fill(0);

    const [ editRating, setEditRating ] = useState(review?.rating);
    const [ hoverValue, setHoverValue ] = useState(undefined);

    const [ editContent, setEditContent ] = useState(review?.review_content);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(() => {
        dispatch(loadImages());
    }, [dispatch]);

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    useEffect(() => {
        const errors = [];
        if (!editRating) errors.push('Please leave a rating');
        if (editContent?.length < 30) errors.push('Woah, did you mean to post so soon? We thought your review was just getting started! Please add more details so we can post this review.');
        if (editContent?.length > 3000) errors.push('Please shorten your review content');
        setValidationErrors(errors);
    }, [editRating, editContent]);


    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validationErrors.length) {
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
                history.push(`/businesses/${businessId}`);
            }
        }
    }

    const onDeletePic = async (id) => {
        await dispatch(deleteImage(id));
        // history.push(`/businesses/${businessId}`);
    }

    const reset = () => {
        setEditRating('');
        setEditContent('')
    }

    const handleClick = (ratingValue) => {
        const ele = document.getElementById('write-review-rate-label');
        // console.log(ele.innerText)
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
            <h1 className='write-review-biz-name'>{business?.name}</h1>
            <form onSubmit={onSubmit}>
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
                    value={editRating}
                    onChange={e => setEditRating(e.target.value)}
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
                                        onClick={() => setEditRating(ratingValue )} />
                                    <FaStar 
                                        key={index}
                                        size={30}
                                        style={{
                                            marginRight: 10,
                                            cursor: 'pointer'
                                        }}
                                        color={ratingValue <= (editRating || hoverValue) ? colors.orange : colors.grey}
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
                    rows={'10'}
                    cols={'50'}
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                >
                </textarea>
                <h3 className='write-review-h3'>Attach Photos</h3>
                <ReviewPhotosModal />
                <div className='review-images-div'>
                    {bizImages && bizImages.filter(image => (
                        image.user_id === user.id
                    )).map (image => (
                        <div className='review-img'>
                            <img src={image['image_url']} alt='biz review photos' style={{width: 142.5, height: 120 }} className='edit-review' />
                            <button className='delete-pic-btn' type='button' onClick={() => onDeletePic(image.id)}>
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
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default EditReviewForm;
